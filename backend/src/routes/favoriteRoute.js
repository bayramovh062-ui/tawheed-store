const express = require('express')
const { authenticateToken } = require('../middlewares/authMiddleware')
const { validationMiddleware } = require('../middlewares/validationMiddleware')
const { getFavoriteByIdSchema } = require('../schemas/favoriteSchema')
const { getFavoritesById } = require('../controllers/favoriteController')
const route = express.Router()

route.get('/:id', authenticateToken, validationMiddleware(getFavoriteByIdSchema), getFavoritesById)

module.exports = route