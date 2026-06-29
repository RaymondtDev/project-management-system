import "dotenv/config";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET } = process.env;

// middleware to authenticate admin using JWT
export const authenticateAdmin = (req, res, next) => {
  // get access token from cookies
  const token = req.cookies.accessToken;
  if (!token)
    return res.status(401).json({ message: "Access token not found" });

  try {
    // verify access token
    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
    // attach admin info to request object for use in controllers
    req.admin = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid access token" });
  }
};
