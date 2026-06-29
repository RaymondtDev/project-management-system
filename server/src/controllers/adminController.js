import Admin from "../models/AdimSchema.js";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const isSecure = process.env.NODE_ENV === "production";

export const createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin with this email already exists" });

    // create new admin
    const newAdmin = new Admin({ username, email });
    await newAdmin.setPassword(password);
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
    
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Error creating admin", error });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Invalid username or password" });

    const isValidPassword = await admin.validatePassword(password);
    if (!isValidPassword) return res.status(401).json({ message: "Invalid username or password" });

    const accessToken = jwt.sign({ id: admin._id, username: admin.username }, ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign({ id: admin._id, username: admin.username }, REFRESH_TOKEN_SECRET, {
      expiresIn: "13d"
    });

    // save access and refresh tokens in httpOnly cookies
    res.cookie("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ admin: { id: admin._id, username: admin.username }, message: "Login successful" });

    } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Error during admin login", error });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during admin logout:", error);
    res.status(500).json({
      message: "Error during admin logout", error
    });
  }
};
