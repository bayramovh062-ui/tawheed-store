const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { limiter } = require('../middlewares/rateLimiter')

router.post('/register', limiter, register)
router.post('/login', limiter, login)
router.get('/profile', authenticateToken, (req, res) => {
    res.status(200).json({
        "message": "the profile's data got with succesfully!",
        "user": req.user
    })
})
module.exports = router