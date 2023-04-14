const express = require('express');
const { createCoupon, getAllCoupons, updateCoupon, deleteCoupon, getOneCoupon } = require('../Controllers/CouponController');
const { authMiddleware} = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/create-coupon', authMiddleware,  createCoupon); 
router.get('/getall-coupons', authMiddleware,  getAllCoupons); 
router.get('/getone-coupon', authMiddleware,  getOneCoupon); 
router.put('/update-coupon', authMiddleware,  updateCoupon); 
router.delete('/delete-coupon', authMiddleware, deleteCoupon); 



module.exports = router;