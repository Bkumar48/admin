const { role, permission } = require("../Models/RoleModel");
const asyncHandler = require("express-async-handler");
//******************************************************************************
// ROLES SECTION                                                            *
//******************************************************************************    
// create a role
const createRole = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  console.log(UserInfo.roleType)
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].role.create== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" && permissions){
          getList= true
      }
      if( getList==true){
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).send({ status: false, massage: "Role name is required" })
    }
    const roles = await role.create(req.body);
    return res.status(200).send({ status: true, massage: "Role saved successfuly! :)" })
  }
  else{
    return res.status(400).send({ status: false, massage: "Deny access create users role" })
  }  
} catch (error) {
    return res.status(400).send({ status: false, massage: error.message })
    }
  

});

// get all roles
const getAllRoles = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].role.read== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" && permissions){
          getList= true
      }
      if( getList==true){
    const roles = await role.find({});
    return res.status(200).send({ status: true, data:roles })
  } 
  else{
    return res.status(400).send({ status: false, massage: "Deny access all role of users" })
  }
}
  catch (error) {
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }


});

// get one role
const getOneRole = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].role.read== true  
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
    const roles = await role.findById(req.query.roleId).populate("permissions");
    return res.status(200).send({ status: true, data:roles })
  } 
  else{
    return res.status(400).send({ status: false, massage: "Deny access user role" })
  }
}
catch (error) {
     return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }


});

// update a role
const updateRole = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].role.upoate== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" && permissions){
          getList= true
      }
      if( getList==true){
      const role = await role.findByIdAndUpdate(req.query.id, { $set: req.body  })
      return res.status(200).send({ status: true, massage: "Role update successfuly! :)" })
  } 
  else{
    return res.status(400).send({ status: false, massage: "Deny access update users role" })
  }
}
  catch (error) {
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }

  
});

// delete a role
const deleteRole = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  // let permissions =""
  // if(UserInfo.role[0]!=undefined){
  //     permissions = UserInfo.role[0].permissions[0].role.delete== true
  // }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
    const role = await role.findByIdAndDelete(req.query.roleId);
    await permission.deleteMany({ roleId: role._id });
    return res.status(200).send({ status: true, massage: "Role delete successfuly! :)" })
  } 
  else{
    return res.status(400).send({ status: false, massage: "Deny access delete role" })
  }
}
  catch (error) {
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }
  
  
});

// get Permissions by roleId
const getPermissionsByRoleId = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
    let permissions =""
    if(UserInfo.role[0]!=undefined){
        permissions = UserInfo.role[0].permissions[0].role.read== true
    }
    try {
        if(UserInfo.roleType=="admin"){
            getList= true
         }
        if(UserInfo.roleType=="user" &&  permissions){
            getList= true
        }
        if( getList==true){
    const role = await role.findById(req.query.roleId);
    const permissions = await permission.find({
      _id: { $in: role.permissions },
    });
    return res.status(200).send({ status: true, data:permissions })
  } 
  else{
    return res.status(400).send({ status: false, massage: "Deny access role of users" })
  }
}
 catch (error) {
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }


});

//******************************************************************************
// PERMISSION SECTION                                                          *
//******************************************************************************


// create a permission
const createPermission = asyncHandler(async (req, res) => {
    const UserInfo = req.userId
    let getList="" ;
    let permissions =""
    if(UserInfo.role[0]!=undefined){
        permissions = UserInfo.role[0].permissions[0].permission.create== true
    }
    try {
        if(UserInfo.roleType=="admin"){
            getList= true
         }
        if(UserInfo.roleType=="user" &&  permissions){
            getList= true
        }
        if( getList==true){
           const permission = await permission.create(req.body);
           permission.save();
           const role = await role.findById(req.body.roleId);
           role.permissions.push(permission._id);
           role.save();
          return res.status(200).send({ status: true, massage: "Permission saved successfuly! :)" })
          } 
          else{
            return res.status(400).send({ status: false, massage: "Deny access create users permission" })
        }
        }
          catch (error) {
         return res.status(400).send({ status: false, massage: "Something went wrong!" })
       }
    
  
});

// delete a permission
const deletePermission = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  const permId = req.query.permissionId;
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].permission.delete== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
             await role.updateOne(
                                  { permissions: permId },
                                  { $pull: { permissions: permId } }
                               );
    const permission = await permission.findByIdAndDelete(permId);
    return res.status(200).send({ status: true, massage: "Permission delete successfuly! :)" })
  } 
  else{
    return res.status(400).send({ status: false, massage: "Deny access users permission Delete" })
  }
}
catch (error) {
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }
 
});

// update a permission
const updatePermission = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  const permId = req.query.permissionId;
  const query = req.body
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].permission.update== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if( getList==true){
    const list = await permission.findByIdAndUpdate(permId,{$set:query});
    return res.status(200).send({ status: true, massage: "Permission update successfuly! :)" })
  } 
  else{
    return res.status(400).send({ status: false, massage: "Deny access users permission update" })
  }
}
  catch (error) {
    return res.status(400).send({ status: false, massage: "Something went wrong!" })
  }
 
});

module.exports = {
  createRole,
  getAllRoles,
  getOneRole,
  updateRole,
  deleteRole,
  createPermission,
  deletePermission,
  updatePermission,
  getPermissionsByRoleId,
};

 