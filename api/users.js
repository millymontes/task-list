import express from "express";
let router = express.Router();
export default router;

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    let { username, password } = req.body;
    let user = await createUser(username, password);

    let token = await createToken({ id: user.id });
    res.status(201).send(token);
  }
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    let { username, password } = req.body;
    let user = await getUserByUsernameAndPassword(username, password);
    // sending a status of 400 wasnt accepted for the test - - gave me an error so changed to 401
    if (!user) return res.status(401).send("Invalid username or password.");

    let token = await createToken({ id: user.id });
    res.send(token);
  }
);
