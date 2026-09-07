const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { authorizeAdmin } = require('../middlewares/adminMiddleware')
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const router = express.Router()

router.post('/', authenticateToken, authorizeAdmin, createProduct)
router.get('/', authenticateToken, getAllProducts)
router.get('/:id', authenticateToken, getProductById)
router.put('/:id', authenticateToken, authorizeAdmin, updateProduct)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteProduct)

module.exports = router