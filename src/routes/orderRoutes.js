const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const { checkoutSchema } = require('../schemas/orderSchema')
const { checkOut } = require('../controllers/orderController')
const router = express.Router()
router.put('/', authenticateToken, validationMiddleware(checkoutSchema), checkOut)
module.exports = router