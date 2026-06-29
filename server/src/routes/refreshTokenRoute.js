import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

router.post("/refresh", (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token not found" });

  if (!accessToken) {
    // verify refresh token and issue new access token
    try {
      const verified = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign(
        { id: verified.id, username: verified.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ admin: verified, message: "Access token refreshed" });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  } else {
    const verified = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    res.status(200).json({ admin: verified, message: "Access token found" });
  }
});

export default router;
