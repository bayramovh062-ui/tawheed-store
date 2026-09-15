const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { limiter } = require('../middlewares/rateLimiter')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const { registerSchema, loginSchema } = require('../schemas/authSchema')

router.post('/register', limiter, validationMiddleware(registerSchema), register)
router.post('/login', limiter, validationMiddleware(loginSchema), login)
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json({
        "message": "the profile's data got with succesfully!",
        "user": req.user
    })
})
module.exports = router