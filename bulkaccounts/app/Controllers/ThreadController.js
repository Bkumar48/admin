const tickets = require("../Models/TicketsModel");
const thread = require("../Models/Thread");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { validationResult } = require("express-validator");
const UserModel = require("../Models/UserModel");
const transporter = require("../Helpers/mailerHelper");
const path = require("path");
const ejs = require("ejs");

// @route   POST api/v1/ticket/thread/createThread
// @desc    Create Thread
// @access  Private
exports.createThread = async (req, res) => {
    const userInfo = req.userId; 
    const Id = userInfo._id;
    const ticketId = req.query.ticketId;
    const { message } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        if (!message) {
            return res.status(400).send({ status: false, massage: "Message is required" });
        }
        if (Id) {
            const creatorInfo = await UserModel.findOne({ _id: Id }).select(["-password", "-verify"]);
            const sender = creatorInfo.roleType == "admin" ? "admin" : creatorInfo.email;
            const qry = {
                ticketId: ObjectId(ticketId),
                message: message,
                sender: sender,
                read_status: "unread",
            };
            const insert = await thread.create(qry);
            if (insert) {
                return res.status(200).send({ status: true, massage: "Your message submit successfuly" });
            }
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
};