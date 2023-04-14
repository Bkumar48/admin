"use strict";
const express = require("express");
const ticketRoute = express.Router();
const {
  ticketCreate,
  ticketGet,
  userTicketGetById,
  AdminticketCreate,
  getAllAdminTickets,
  ticketsGetAll,
  ticketGetById,
  threadReply,
} = require("../Controllers/UserTicketController");
const { authMiddleware } = require("../Middleware/authMiddleware");
// const JWTcustomer = require("../Middleware/customerJWT")
// const auth = JWTcustomer.verifyToken;

// Create Ticket
ticketRoute.post("/customer/ticketCreate", authMiddleware, ticketCreate);

// Get All Tickets Created by Logged in Customer
ticketRoute.get("/customer/ticketGet", authMiddleware, ticketGet);

// Get User Ticket By Id
ticketRoute.get("/customer/ticketGetById", authMiddleware, userTicketGetById);


// ********************************************************************************************
// ************************************* ADMIN ROUTES  ****************************************
// ********************************************************************************************

// Raise a ticket to user
ticketRoute.post("/admin/adminticketCreate", authMiddleware, AdminticketCreate);

// Get all admin generated tickets
// ticketRoute.get("/admin/adminTicketGetAll", authMiddleware, getAllAdminTickets);

// Get Ticket By Id
ticketRoute.get("/admin/ticketGetById", authMiddleware, ticketGetById);

// Get all Tickets for admin
ticketRoute.get("/admin/ticketGetAll", authMiddleware, ticketsGetAll);

// ********************************************************************************************
// ****************************** THREAD ROUTES  **********************************************
// ********************************************************************************************

// Create a thread
ticketRoute.put("/thread", authMiddleware, threadReply);

module.exports = ticketRoute;
