const mongoose = require("mongoose");
const threadSchema = new mongoose.Schema({
    ticketId:{type:mongoose.Schema.Types.ObjectId, ref:"tickets", default:""},
    message:{type:String, default:""},
    sender:{type:String, enum: ['admin','customer'], default:""},
    read_status:{type:String, enum: ['read','unread'], default:""},
},
{timestamps: true}
);

module.exports = mongoose.model("thread", threadSchema); 