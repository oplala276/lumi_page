import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from "axios";
import mongoose from 'mongoose';
import express from 'express';
import admins from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
   const admin = await admins.findOne({ username });
    if (!admin) return res.status(400).json({ message: "Invalid Credentials" });
    //  const isMatch = await bcrypt.compare(password, admin.password);
  //  const isMatch = password === admin.password;
   const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
  //  if (!isMatch)
    //  return res.status(400).json({ message: "Invalid Credentials" });
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

export const changePassword = async (req, res) => {
try {
    const { username, oldPassword, newPassword } = req.body;

    // Find user
    const user = await admins.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid old password" });
    // const match = oldPassword===newPassword;
    // console.log(match);
    // if(!match) return res.status(400).json({ msg: "Invalid old password" });
    // Hash new password
    // console.log(user);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}