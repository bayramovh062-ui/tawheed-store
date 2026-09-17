const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { authorizeAdmin } = require('../middlewares/adminMiddleware')
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController')
const { createProductSchema, getProductByIdAndDeleteSchema, updateProductSchema, productQuerySchema } = require('../schemas/productSchema')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const router = express.Router()

router.post('/', authenticateToken, authorizeAdmin, validationMiddleware(createProductSchema), createProduct)
router.get('/', validationMiddleware(productQuerySchema), getAllProducts)
router.get('/:id', validationMiddleware(getProductByIdAndDeleteSchema), getProductById)
router.put('/:id', authenticateToken, authorizeAdmin, validationMiddleware(updateProductSchema), updateProduct)
router.delete('/:id', authenticateToken, authorizeAdmin, validationMiddleware(getProductByIdAndDeleteSchema), deleteProduct)

module.exports = router