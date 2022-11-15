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
