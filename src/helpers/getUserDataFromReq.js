import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.jwtSecret;

const getUserDataFromReq = (req) => {
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) 
          throw err;
        resolve(userData);
      });
  })
}

export default getUserDataFromReq;