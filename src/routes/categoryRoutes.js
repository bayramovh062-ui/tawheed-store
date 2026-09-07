const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { authorizeAdmin } = require('../middlewares/adminMiddleware')
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router = express.Router()
const { categorySchema } = require('../validations/categorySchema')
const { validationMiddleware } = require('../middlewares/validate')
router.post('/', authenticateToken, authorizeAdmin, validationMiddleware(categorySchema), createCategory)
router.get('/', authenticateToken, getAllCategories)
router.put('/:id', authenticateToken, authorizeAdmin, validationMiddleware(categorySchema), updateCategory)
router.delete('/:id', authenticateToken, authorizeAdmin, deleteCategory)

module.exports = router