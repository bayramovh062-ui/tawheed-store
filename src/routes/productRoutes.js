const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { authorizeAdmin } = require('../middlewares/adminMiddleware')
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const { productSchema } = require('../validations/productSchema')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const router = express.Router()

router.post('/', authenticateToken, authorizeAdmin, validationMiddleware(productSchema), createProduct)
router.get('/', authenticateToken, getAllProducts)
router.get('/:id', authenticateToken, getProductById)
router.put('/:id', authenticateToken, authorizeAdmin, validationMiddleware(productSchema), updateProduct)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteProduct)

module.exports = router