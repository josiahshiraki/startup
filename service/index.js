const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const authCookieName = 'token';
const DB = require('./database.js');
const { WeSocketServer } = require('ws');


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
  // if (await DB.getUser(req.body.email)) {
  //   res.status(409).send({ msg: 'Existing user' });
  // } else {
  //   const user = await DB.createUser(req.body.email, req.body.password);

  //   setAuthCookie(res, user.token);
  //   res.send({ email: user.email });
  // }
  try {
    console.log('CREATE BODY:', req.body);

    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
    }
  } catch (err) {
    console.error('CREATE ERROR:', err);
    res.status(500).send({ msg: err.message });
  }
});

apiRouter.post('/auth/login', async (req, res) => {// GetAuth login an existing user
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = uuid.v4();
      await DB.updateUserToken(user.email, token);
      setAuthCookie(res, token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {// DeleteAuth logout a user
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    await DB.removeUserToken(req.cookies[authCookieName]);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

//====================================================================



// ================HABITS MIDDLEWARE==================================

apiRouter.get('/habits', verifyAuth, async (req,res) => {
    const userHabits = await DB.getHabits(req.user.email); //responds with the array of habits respecitive to the current user
    res.send(userHabits);
    
});

apiRouter.post('/habits', verifyAuth, async (req,res) => {
    await DB.saveHabits(req.user.email, req.body);
    res.send(req.body);
    //console.log(JSON.stringify(req.body));
});


//====================================================================




// ================RESOLUTIONS MIDDLEWARE=============================
//similar functions for habits

apiRouter.get('/resolutions', verifyAuth, async (req, res) => {
  const resolutions = await DB.getResolutions(req.user.email);
  res.send(resolutions);
});

apiRouter.post('/resolutions', verifyAuth, async (req, res) => {
  await DB.saveResolutions(req.user.email, req.body);
  res.send(req.body);
});

//====================================================================



// =====================================
// PLACEHOLDER ENDPOINT (for testing)
// =====================================

apiRouter.get('/test', verifyAuth, (req, res) => {
  res.send({ msg: 'API is working', email: req.user.email });
});


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

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

const wss = new WebSocketServer({server});
