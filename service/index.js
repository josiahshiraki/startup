const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const authCookieName = 'token';

// Temporary in-memory storage
let users = [];
let habitsByUser = {};
let resolutionsByUser = {};

habitsByUser["test@email.com"] = [
  {
    id: 1,
    name: "Lift Weights",
    checks: [true, false, false, true, false, false, false]
  },
  {
    id: 2,
    name: "Run",
    checks: [false, true, false, false, false, false, false]
  }
];

// Server port
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve frontend later when deployed
app.use(express.static('public'));

// Router for API endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// ================LOGIN VERIFICATION MIDDLEWARE=====================

apiRouter.post('/auth/create', async (req, res) => {//create user
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    console.log(JSON.stringify(users));
    console.log(JSON.stringify(habitsByUser["test@email.com"]));

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

apiRouter.post('/auth/login', async (req, res) => {// GetAuth login an existing user
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {// DeleteAuth logout a user
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Incorrect username or password' });
  }
};

//====================================================================



// ================HABITS MIDDLEWARE==================================

apiRouter.get('/habits', verifyAuth, (req,res) => {
    const userHabits = habitsByUser[req.user.email] || []; //responds with the array of habits respecitive to the current user
    res.send(userHabits);
    
});

apiRouter.post('/habits', verifyAuth, (req,res) => {
    habitsByUser[req.user.email] = req.body;//body contains updated habits
    res.send(habitsByUser[req.user.email]);
    console.log(JSON.stringify(habitsByUser[req.user.email]));
});


//====================================================================




// ================RESOLUTIONS MIDDLEWARE=============================
//similar functions for habits

apiRouter.get('/resolutions', verifyAuth, (req, res) => {
  const userResolutions = resolutionsByUser[req.user.email] || [];
  res.send(userResolutions);
});

apiRouter.post('/resolutions', verifyAuth, (req, res) => {
  resolutionsByUser[req.user.email] = req.body;
  res.send(resolutionsByUser[req.user.email]);
  console.log(JSON.stringify(resolutionsByUser));
});

//====================================================================



// =====================================
// PLACEHOLDER ENDPOINT (for testing)
// =====================================

apiRouter.get('/test', verifyAuth, (req, res) => {
  res.send({ msg: 'API is working', email: req.user.email });
});


// =====================================
// HELPER FUNCTIONS
// =====================================

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };

  users.push(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.use((err, req, res, next) => {
  res.status(500).send({ type: err.name, message: err.message });
});


// =====================================
// START SERVER
// =====================================

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});