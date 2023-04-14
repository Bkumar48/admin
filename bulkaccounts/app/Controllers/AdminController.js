'use strict';
const adminModel = require("../Models/AdminModel");
const bcrypt = require('bcrypt');
const jwttoken = require("jsonwebtoken"); 
require('dotenv').config();

class admin{
 
 // admin registred 
    async adminRegister(req, res){
    // check the logic of code
        try {
            const { email, password, first_name,last_name,contact} = req.body;
            // all fields are required check blank 
            if (!(email)) {
                return res.status(400).send({ status: false, massage: "Email field is required!" })
            }
            if (!(password)) {
                return res.status(400).send({ status: false, massage: "Password field is required!" })
            }
             
            // check admin exist in database
            const adminexit = await adminModel.find({ email: email }).count();
            if (adminexit==1) {
                return res.status(409).send({ status: false, massage: "Admin already exist in database" });
            }
            // Make the password encrypted
            
            const encryptedPassword = await bcrypt.hash(password, 10);
            const Insert = { email: email.toLowerCase(), password: encryptedPassword,first_name:first_name,last_name:last_name,contact:contact,roles:"admin"  }
            const create = await adminModel.create(Insert);
            
            // create token
            const token = jwttoken.sign({ user_id: create._id, role:"admin" }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
            const update = await adminModel.findByIdAndUpdate(create._id,{$set:{token:token}})
            return res.status(200).send({ status: true, massage: "Admin is registred successfully! :)", token:token })
        }
        catch (err) {
            return res.status(400).send({ status: false, massage: "Something went wrong!" })
        }
    }

// admin Login 
    async adminLogin(req, res) {

        try {
            const { email, password } = req.body;
            // all fields are required check blank 
            if (!(email && password)) {
                return res.status(400).send({ status: false, massage: "All the fields are required!" })
            }
            // Validate if user exist in our database
            const user = await adminModel.findOne({ email });
            const cpassword = await bcrypt.compare(password, user.password)
            // check user and password
            if (user && cpassword) {
                const urole = user.roles
                const token = jwttoken.sign({ user_id: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
                const update = await adminModel.findByIdAndUpdate(user._id, { $set: { token: token } })
                return res.status(200).send({ status: true, massage: "Login successfully! :)", token: token })
            }
            else {
                return res.status(400).send({ status: false, massage: "you are use the wrong credential use!" })
            }
        }
        catch (err) {
            console.log(err);
            return res.status(400).send({ status: false,  massage: "Something went wrong!" })
        }
    }

// Change password of admin
async changepassword(req, res){
    const Id = req.user_id 
    try{
       const  {oldpassword, newpassword, cpassword} = req.body;
        if(!(oldpassword && newpassword && cpassword )){
            return res.status(400).send({ status: false, massage: "All the fields are required!" })
        }
        else{
            const user = await adminModel.findById({ _id:Id });
            const mpassword = await bcrypt.compare(oldpassword, user.password)
            if(mpassword==true){
                    if(newpassword==cpassword){
                        const encryptedPassword = await bcrypt.hash(newpassword, 10);
                         const update = await adminModel.findByIdAndUpdate({_id:Id}, { $set:{ password: encryptedPassword } })
                         if(update){
                            return res.status(200).send({ status: true, massage: "Password has chnaged successfully! :)" })
                         }
                    }
                    else{
                        return res.status(400).send({ status: false, massage: "New password and Confirm password is not match! :)" })
                    }
             }
             else{
                return res.status(400).send({ status: false, massage: "You have entered the wrong password !" })
             }
        }
    }
    catch(err){
        return res.status(400).send({ status: false, massage: "Something went wrong!" })
    }
}

// add users roles
async userRoles(req, res){
    try {
        const { rolename, create, update, read, dele } = req.body
       
        if (rolename=="") {
            return res.status(400).send({ status: false, massage: "Please entered the name of roles" })
        }
        else {
            const permissions = []
            permissions.push({
                        create:create,
                        update:update,
                        read:read,
                        delete:dele
                   })
             const query = { rolename: rolename, permissions: permissions} 
             await userRoles.create(query);
             return res.status(200).send({ status: true, massage: "Role has been created successfully! :)" })
            }
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ status: false, massage: "Something went wrong!" })
    }
}



}
const Admin = new admin(); 
module.exports = Admin;