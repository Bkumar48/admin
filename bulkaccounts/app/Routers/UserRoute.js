const express = require("express");
const {
  createUser,
  loginUserCtrl,
   getallUser, 
   getoneUser,
   pushRoleToUser,
   deleteaUser,
   updateaUser,
   logout
} = require("../Controllers/UserController");
const { authMiddleware} = require("../Middleware/authMiddleware");
const router = express.Router();

router.post("/register",  createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", authMiddleware,getallUser); 
router.get("/getUser", authMiddleware, getoneUser); 
router.post("/pushRoleToUser", authMiddleware,pushRoleToUser);
router.put("/updateUser", authMiddleware, updateaUser); 
router.delete("/delUser", authMiddleware, deleteaUser);
router.get("/logout", authMiddleware, logout);


  

module.exports = router;
  