'use strict';
const express = require('express');
const CustomerRoute = express.Router();
const {register, confirm, login, getCustomerInfo,updateCustomerInfo,updateCustomerPass} = require('../Controllers/CustomerController')
const {authMiddleware} = require("../Middleware/authMiddleware");
// const JWTcustomer = require("../Middleware/customerJWT")
// const auth = JWTcustomer.verifyToken;

// Customer Registred
// CustomerRoute.post('/register',register)

// Customer Login
// CustomerRoute.post('/login',login)

// Veryfied Customer with mail
CustomerRoute.get("/confirm", confirm);

// Customer info
CustomerRoute.get('/getCustomerInfo',authMiddleware, getCustomerInfo);

// Customer update info
CustomerRoute.put('/updateCustomerInfo', authMiddleware, updateCustomerInfo);

// Customer update password
CustomerRoute.put('/updateCustomerPass', authMiddleware, updateCustomerPass);


module.exports = CustomerRoute; 