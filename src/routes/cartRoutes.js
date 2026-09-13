const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const { addToCartSchema, updateCartItemSchema, deleteCartItemSchema } = require('../schemas/cartSchema')
const { addItemToCart, getUserCartItems, updateCartItem, deleteOrderItem } = require('../controllers/cartController')
const router = express.Router()

router.post('/', authenticateToken, validationMiddleware(addToCartSchema), addItemToCart)
router.get('/', authenticateToken, getUserCartItems)
router.put('/:id', authenticateToken, validationMiddleware(updateCartItemSchema), updateCartItem)
router.delete('/:id', authenticateToken, validationMiddleware(deleteCartItemSchema), deleteOrderItem)
module.exports = router 