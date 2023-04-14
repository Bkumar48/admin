'use strict';
const express = require('express');
const adminRoute = express.Router();
const admin = require('../Controllers/AdminController');
const jwtAdmin = require("../Middleware/adminJWT")
const auth = jwtAdmin.verifyToken;
// Admin Registred
adminRoute.post('/adminRegister',admin.adminRegister)

// Admin login
adminRoute.post('/adminLogin',admin.adminLogin)

// Admin Change password
adminRoute.post('/changepassword',auth, admin.changepassword)

// add users roles 

adminRoute.post('/userRoles', admin.userRoles)
module.exports = adminRoute;