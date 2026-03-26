const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const config = require('../dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('accountable');

const userCollection = db.collection('user');
const habitsCollection = db.collection('habits');
const resolutionsCollection = db.collection('resolutions');

async function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };

  await userCollection.insertOne(user);
  return user;
}

async function updateUserToken(email, token) {
  await userCollection.updateOne(
    { email: email },
    { $set: { token: token } }
  );
}

async function removeUserToken(token) {
  await userCollection.updateOne(
    { token: token },
    { $unset: { token: "" } }
  );
}

async function getHabits(email) {
  const result = await habitsCollection.findOne({ email: email });
  return result ? result.habits : [];
}

async function saveHabits(email, habits) {
  await habitsCollection.updateOne(
    { email: email },
    { $set: { email: email, habits: habits } },
    { upsert: true }
  );
}

async function getResolutions(email) {
  const result = await resolutionsCollection.findOne({ email: email });
  return result ? result.resolutions : [];
}

async function saveResolutions(email, resolutions) {
  await resolutionsCollection.updateOne(
    { email: email },
    { $set: { email: email, resolutions: resolutions } },
    { upsert: true }
  );
}

async function main() {
  try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);

    await userCollection.createIndex({ email: 1 }, { unique: true });
    await userCollection.createIndex({ token: 1 }, { unique: true, sparse: true });
    await habitsCollection.createIndex({ email: 1 }, { unique: true });
    await resolutionsCollection.createIndex({ email: 1 }, { unique: true });
  } catch (ex) {
    console.log(`Connection failed to ${url} because ${ex.message}`);
    process.exit(1);
  }

// //-------------------------------------------------------------------------------------------
//   // test values
//   const testEmail = `test_${uuid.v4()}@email.com`;
//   const testToken = uuid.v4();

//   try {
//     // =========================
//     // Insert test user
//     // =========================
//     const passwordHash = await bcrypt.hash('test123', 10);

//     const user = {
//       email: testEmail,
//       password: passwordHash,
//       token: testToken,
//     };

//     await userCollection.insertOne(user);
//     console.log('Inserted test user:');
//     console.log(user);

//     // =========================
//     // Query test user
//     // =========================
//     const foundUser = await userCollection.findOne({ email: testEmail });
//     console.log('Queried user:');
//     console.log(foundUser);

//     // =========================
//     // Insert test habits
//     // =========================
//     const habits = {
//       email: testEmail,
//       habits: [
//         {
//           id: 1,
//           name: 'Lift',
//           checks: [true, false, true, false, false, false, false],
//         },
//         {
//           id: 2,
//           name: 'Run',
//           checks: [false, true, false, true, false, false, false],
//         },
//       ],
//     };

//     await habitsCollection.insertOne(habits);
//     console.log('Inserted test habits:');
//     console.log(habits);

//     // Query test habits
//     const foundHabits = await habitsCollection.findOne({ email: testEmail });
//     console.log('Queried habits:');
//     console.log(foundHabits);

//     // =========================
//     // Insert test resolutions
//     // =========================
//     const resolutions = {
//       email: testEmail,
//       resolutions: [
//         {
//           id: 1,
//           resolution: 'Go to the gym 5 times a week',
//           createdAt: Date.now(),
//         },
//         {
//           id: 2,
//           resolution: 'Read scriptures daily',
//           createdAt: Date.now(),
//         },
//       ],
//     };

//     await resolutionsCollection.insertOne(resolutions);
//     console.log('Inserted test resolutions:');
//     console.log(resolutions);

//     // Query test resolutions
//     const foundResolutions = await resolutionsCollection.findOne({ email: testEmail });
//     console.log('Queried resolutions:');
//     console.log(foundResolutions);

//     // =========================
//     // Delete test data
//     // =========================
//     await userCollection.deleteMany({ email: testEmail });
//     await habitsCollection.deleteMany({ email: testEmail });
//     await resolutionsCollection.deleteMany({ email: testEmail });

//     console.log('Deleted test data successfully');
//   } catch (ex) {
//     console.log(`Database (${url}) error: ${ex.message}`);
//   } finally {
//     await client.close();
//   }
//   //--------------------------------------------------------------------------
}

main();

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updateUserToken,
  removeUserToken,
  getHabits,
  saveHabits,
  getResolutions,
  saveResolutions,
};