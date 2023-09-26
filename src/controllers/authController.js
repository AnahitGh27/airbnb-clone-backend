import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "alksdjliakdqkdlqwji34n4r8f";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            throw err;
          } else {
            res.cookie("token", token).json(userDoc);
          }
        }
      );
    } else {
      res.status(422).json("pass is incorrect");
    }
  } else {
    res.json("not found");
  }
};

export const getUserProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        throw err;
      } else {
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      }
    });
  } else {
    res.json(null);
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "").json(true);
}
