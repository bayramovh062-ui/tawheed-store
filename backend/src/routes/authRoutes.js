const express = require('express')
const router = express.Router()
const { register, login, verifyOtp, resendOtp } = require('../controllers/authController')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { limiter } = require('../middlewares/rateLimiter')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const { registerSchema, loginSchema } = require('../schemas/authSchema')
const { verifyOtpSchema, resendOtpSchema } = require('../schemas/verifyOtpSchema')

router.post('/register', limiter, validationMiddleware(registerSchema), register)
router.post('/login', limiter, validationMiddleware(loginSchema), login)
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json({
        "message": "the profile's data got with succesfully!",
        "user": req.user
    })
})
router.post('/verify-otp', limiter, validationMiddleware(verifyOtpSchema), verifyOtp)
router.post('/resend-otp', limiter, validationMiddleware(resendOtpSchema), resendOtp)
module.exports = router