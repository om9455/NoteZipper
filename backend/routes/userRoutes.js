const express = require("express");
const { registerUser,loginUser } = require("../controllers/userControllers");
const User = require("../models/userModel");
const router = express.Router();

// router.get("/", async (req, res) => {
//   res.send("hello");
// });

router.post("/",registerUser)
router.post("/login",loginUser)

router.get("/", async (req, res) => {
  res.status(200);
  const user=await User.find({})
  res.json(user);
})
module.exports=router