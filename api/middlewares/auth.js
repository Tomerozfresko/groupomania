import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};

export default auth;

// from groupomania MERN project

//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

// from piiquante

// const jwt = require("jsonwebtoken");
// require("dotenv").config({ path: __dirname + "../.env" });

// module.exports = (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1]; //Without Bearer
//     if (token == null) return res.sendStatus(401); //No Token
//     jwt.verify(token, `${process.env.saltString}`, (err, decodedToken) => {
//       if (err) return res.sendStatus(403); //Not Authorized
//       if (req.query.id !== decodedToken.userId) {
//         res.status(401).json({
//           error: new Error("Unauthorized Access"),
//         });
//       } else {
//         next();
//       }
//     });
//     //bad request
//   } catch {
//     res.status(400).json({
//       error: new Error("Invalid request!"),
//     });
//   }
// };
