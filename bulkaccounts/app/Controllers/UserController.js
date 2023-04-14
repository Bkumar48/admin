const { generateToken } = require("../config/jwtToken");
const { role, permission } = require("../Models/RoleModel");
const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwttoken = require("jsonwebtoken"); 
const {validateEmail, validatePassword, validatePhone, phoneDigit, alphabet} = require("../Helpers/validationHelper")
require('dotenv').config();


// create a user
const createUser = asyncHandler(async (req, res) => {
  let roleType="";
  const checkUserType = await UserModel.findOne({roleType:'admin'}).count();
  
  // check the admin register or not
   checkUserType == 0 ? roleType = 'admin' : roleType = 'user';
   
    try {
    const { email, password, cpassword, first_name, last_name, contact } = req.body;
    const username = email.split("@");
    const uname = username.length == 2 ? username[0] : null;
    // all fields are required check blank 
    if (!first_name) {
      return res.status(400).send({ status: false, massage: "First Name is required" })
    }

    if (!last_name) {
      return res.status(400).send({ status: false, massage: "Last Name is required" })
    }

    if (!(email)) {
      return res.status(400).send({ status: false, massage: "Email field is required!" })
    }

    if (validateEmail(email) == false) {
      return res.status(400).send({ status: false, massage: "You have entered wrong email format" })
    }

    if (!(password)) {
      return res.status(400).send({ status: false, massage: "Password field is required!" })
    }

    if (validatePassword(password) == false) {
      return res.status(400).send({ status: false, massage: "Password with min 8 character along One Capital, One Small also with digist and symbole" })
    }
    if (!password) {
      return res.status(400).send({ status: false, massage: "Password is required" })
    }

    if (!cpassword) {
      return res.status(400).send({ status: false, massage: "confirm is required" })
    }

    if (password != cpassword) {
      return res.status(400).send({ status: false, massage: "Confirm Password is not matched with password" })
    }

    if (!contact) {
      return res.status(400).send({ status: false, massage: "Phone is required" })
    }

    if (validatePhone(contact) == false) {
      return res.status(400).send({ status: false, massage: "You have entered the phone number is invalid" })
    }

    if (validatePhone(contact) == undefined) {
      return res.status(400).send({ status: false, massage: "You have entered invalid number" })
    }

    if (phoneDigit(contact) == false) {
      return res.status(400).send({ status: false, massage: "You have entered invalid number" })
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    // check email duplicate in database
    const adminexit = await UserModel.find({ email: email }).count();
    if (adminexit==1) {
        return res.status(400).send({ status: false, massage: "Email already exist in database" });
    }
   
    const query = { firstName:first_name, lastName:last_name, userName:uname, email: email.toLowerCase(), mobile: contact, status:"Active", password: encryptedPassword, roleType: roleType };
    const create = await UserModel.create(query);
    // create token
    const token = jwttoken.sign({ user_id: create._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
    const update = await UserModel.findByIdAndUpdate(create._id, { $set: { refreshToken: token } })
    return res.status(200).send({ status: true, massage: "User is registred successfully! :)", token:token })
    }
    catch (err) {
      console.log(err);
      return res.status(400).send({ status: false, massage: err.message })
    }
  
  
});

// login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
       const { email, password } = req.body;
       let roleType ="";
       const checkUserType = await UserModel.findOne({email:email});
       try{
        if(checkUserType!=null){
              if(checkUserType.roleType=='admin'){
                roleType= 'admin';
              }
              if(checkUserType.roleType=='user'){
                roleType= 'user';
              }
              if (!(email && password)) {
                return res.status(400).send({ status: false, massage: "All the fields are required!" })
              }
              // Validate if user exist in our database
              const user = await UserModel.findOne({ email });
              const cpassword = await bcrypt.compare(password, user.password)
                          // check user and password
             if (user && cpassword) {
              const token = jwttoken.sign({ user_id: user._id, urole:user.roleType, role:user.role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
              
              const update = await UserModel.findByIdAndUpdate(user._id, { $set: { refreshToken: token } })
              // localStorage.setItem('token', update.refreshToken)
              return res.status(200).send({ status: true, massage: "Login successfully! :)", token: token })
          }
          else {
              return res.status(400).send({ status: false, massage: "you are use the wrong credential use!" })
          }

         }
         else{
          return res.status(400).send({ status: false, massage: "EMail is not exist in account" }) 
         }
       }
       catch (err){
        console.log(err);
         return res.status(400).send({ status: false, massage: err.message })
       }
       
});

// get all users
const getallUser = asyncHandler(async (req, res) => {
    const UserInfo = req.userId
    let getList="" ;
    let permissions =""
    if(UserInfo.role[0]!=undefined){
        permissions = UserInfo.role[0].permissions[0].users.read== true
    }
    try {
        if(UserInfo.roleType=="admin"){
            getList= true
         }
    
        if(UserInfo.roleType=="user" &&  permissions){
            getList= true
        }
        if( getList==true){
            const getUsers = await UserModel.find().populate("role").select('-password');
            return res.status(200).send({ status: true, data: getUsers })
      }  
      else{
        return res.status(400).send({ status: false, massage: "Deny access all users" })
      }
    }
      catch (err) {
        console.log(err);
        return res.status(400).send({ status: false, massage: "Something went wrong!" })
       //  throw new Error(err);
     }
  
  });

// get One user
const getoneUser = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  const user_Id = req.query.userId
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].users.read== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
  
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
         const getoneUser = await UserModel.findById(user_Id).populate("role").select('-password');
          return res.status(200).send({ status: true, data: getoneUser })
      }
      else{
        return res.status(400).send({ status: false, massage: "Deny access single list  users" })
      }
    }
    catch (err) {
      console.log(err);
      return res.status(400).send({ status: false, massage: "Something went wrong!" })
     //  throw new Error(err);
   }

});

// push Role to user
const pushRoleToUser = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
 if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].users.create== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
  
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
      const { userId, roleId } = req.body;
      const role = await Role.findById(roleId);
      const user = await UserModel.findByIdAndUpdate(userId, {
        $push: { role: role },
      });
     return res.status(200).send({ status: true, massage: "Sign the role to user successfully! :)" })
    }
    else{
      return res.status(400).send({ status: false, massage: "Deny access users permission" })
    }
  }
    catch (err) {
     return res.status(400).send({ status: false, massage: "Something went wrong!" })
     //  throw new Error(err);
   }
  });

  //Update a user
const updateaUser = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].users.update== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
  
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
           const updateaUser = await UserModel.findByIdAndUpdate(userId,
                                                               {
                                                              firstName: req?.body.firstname,
                                                              lastName: req?.body.lastname,
                                                              mobile: req?.body.mobile,
                                                              status: req?.body.status,
                                                          },
                                                    {
                                                    new: true,
                                                  }
      );
      return res.status(200).send({ status: true, massage: "User Update successfully! :)" })
  } 
else{
  return res.status(400).send({ status: false, massage: "Deny access users update" })
}
}
  catch (err) {
    
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }
});


// Delete a user
const deleteaUser = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].users.delete== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
         const deleteaUser = await UserModel.findByIdAndDelete(userId);
         return res.status(200).send({ status: true, massage: "User delete successfully! :)" })
    } 
    else{
      return res.status(400).send({ status: false, massage: "Deny access users update" })
    }
}
  catch (err) {
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }
});

 

// Logout a user
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await UserModel.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await UserModel.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.send({ message: "Logged out successfully" });
});




module.exports = {
  createUser,
  loginUserCtrl,
   getallUser,
   getoneUser,
   pushRoleToUser,
   deleteaUser,
   updateaUser,
   logout
};
