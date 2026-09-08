const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { authorizeAdmin } = require('../middlewares/adminMiddleware')
const { createCategory, getAllCategories, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router = express.Router()
const { categorySchema, deleteCategorySchema, updateCategorySchema } = require('../validations/categorySchema')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
router.post('/', authenticateToken, authorizeAdmin, validationMiddleware(categorySchema), createCategory)
router.get('/', authenticateToken, getAllCategories)
router.put('/:id', authenticateToken, authorizeAdmin, validationMiddleware(updateCategorySchema), updateCategory)
router.delete('/:id', authenticateToken, authorizeAdmin, validationMiddleware(deleteCategorySchema), deleteCategory)

module.exports = router