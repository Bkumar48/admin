const Coupon = require("../Models/CouponModel");
const asyncHandler = require("express-async-handler");

// Create a new Coupon
const createCoupon = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].coupon.create== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if(getList== true){
    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  }
  else{
    return res.status(400).send({ status: false, massage: "Access deny create blog !" })
  } 
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get all Coupons
const getAllCoupons = asyncHandler(async (req, res) => {
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].coupon.create== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if(getList== true){
 
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  }
  else{
    return res.status(400).send({ status: false, massage: "Access deny create blog !" })
  } 
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get one Coupon
const getOneCoupon = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].coupon.create== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if(getList== true){
 
    const coupon = await Coupon.findById(id);
    res.status(200).json(coupon);
  }
  else{
    return res.status(400).send({ status: false, massage: "Access deny create blog !" })
  } 
  } catch (error) {
    throw new Error(error.message);
  }
});

// Update a coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].coupon.create== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if(getList== true){
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.status(200).json({ message: "Updated Successfully", data:updatedCoupon});
  }
  else{
    return res.status(400).send({ status: false, massage: "Access deny create blog !" })
  } 
  } catch (error) {
    throw new Error(error.message);
  }
});

// Delete a coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const UserInfo = req.userId
  let getList="" ;
  let permissions =""
  if(UserInfo.role[0]!=undefined){
      permissions = UserInfo.role[0].permissions[0].coupon.create== true
  }
  try {
      if(UserInfo.roleType=="admin"){
          getList= true
       }
      if(UserInfo.roleType=="user" &&  permissions){
          getList= true
      }
      if(getList== true){
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.send({message:"Deleted Successfully", data: deletedCoupon});
  }
  else{
    return res.status(400).send({ status: false, massage: "Access deny create blog !" })
  } 
  } catch (error) {
    throw new Error(error.message);
  }
});

module.exports = { createCoupon, getAllCoupons, getOneCoupon, updateCoupon, deleteCoupon };
