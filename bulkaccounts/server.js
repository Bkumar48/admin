'use strict';
var http = require('http');
// var https = require('https');
// var privateKey  = fs.readFileSync('certificates/key.pem', 'utf8');
// var certificate = fs.readFileSync('certificates/cert.pem', 'utf8'); 
//var credentials = {key: privateKey, cert: certificate};
const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./app/Database/db")
const adminRoute = require("./app/Routers/AdminRoutes")
const productRoute = require("./app/Routers/ProductRoute")
const pageRoute = require("./app/Routers/PageRoute")
const faqRoute = require("./app/Routers/FaqRoute")
const customerRoute = require("./app/Routers/CustomerRoute")
const ticketRoute = require("./app/Routers/UserTicketRoute")
const userRoute = require("./app/Routers/UserRoute")
const userRoleRoute = require("./app/Routers/RoleRouter")
const blogCateRoute = require("./app/Routers/BlogCateRoute")
const blogRoute = require("./app/Routers/BlogRoute")
const coupon = require("./app/Routers/CouponRoute")

require('dotenv').config();
const port = process.env.NODE_PORT || 3000;


app.use(express.static('public')); 
app.use('/images', express.static('images')); 
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



// Define admin route
app.use("/api/v1/admin",adminRoute);

// Define product route
app.use("/api/v1/product",productRoute)

// Define Page route
app.use("/api/v1/pages",pageRoute)

// Define FQA route
app.use("/api/v1/faq", faqRoute)

// Define Customer route 
app.use("/api/v1/customer",customerRoute)

// Define User Ticket route
app.use("/api/v1/ticket",ticketRoute)

// Define user route
app.use("/api/v1/user",userRoute)

// Define user role route
app.use("/api/v1/users/roles",userRoleRoute)

// Define blog in user/ admin access
app.use("/api/v1/user/blogcate",blogCateRoute)

// Define blog in user/admin access
app.use("/api/v1/user/blog",blogRoute)

// Define coupon in user/admin access
app.use("/api/v1/user/coupon",coupon) 

// defualt route to test the api
   app.get("/", (req, res, next) => {
       res.json({massage:"App is working! :)"});
   });

   



// Create Server 
var server = http.createServer(app)    
 
// Create https server
//var httpsServer = https.createServer(credentials, app);

// Run server
server.listen(port, ()=>{
    console.log(`web server at ${port} running..`)
}); 

//  Check DB Connect 
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});
// For https
//httpsServer.listen(8443);