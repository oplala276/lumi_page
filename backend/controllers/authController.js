import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from "axios";
import mongoose from 'mongoose';
import admins from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
   const admin = await admins.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid Credentials" });
    //  const isMatch = await bcrypt.compare(password, admin.password);
   const isMatch = password === admin.password;
   if (!isMatch)
     return res.status(400).json({ message: "Invalid Credentials" });
  //  const token = sign(
  //    { id: admin._id },
  //    process.env.JWT_SECRET,
  //    { expiresIn: "1d" }
  //  );
   res.json({ message: "Login Success" });
 } catch (err) {
   res.status(500).send("Server Error");
 }
}
