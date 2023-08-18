import express from "express";

import { addUser, findOtherUsers, findUser, findUserExists } from "../models/users.js";

const router = express.Router();

// Get from the database of users
// The req object body will contain information
router.get("/check/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  const user = await findUser(username, password);

  res.send(JSON.stringify(user));
});


// Add the new user to the database
// Information in req body
router.post("/check/:username/:password", async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  const user = await addUser(username, password);

  res.send(JSON.stringify(user));
});

router.get("/list/:username", async (req, res) => {
  const username = req.params.username;

  const users = await findOtherUsers(username);

  res.send(JSON.stringify(users));
})

router.get("/find/:username", async (req, res) => {
  const username = req.params.username;

  const user = await findUserExists(username);

  res.send(JSON.stringify(user));
})

export default router;
