const prisma = require("../config/prisma")
const { asyncHandler } = require('../utils/asyncHandler')
const { AppError } = require('../utils/AppError')

const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category_id, image, is_active } = req.body
    const created_by = req.user.id
    const product = await prisma.product.create({
        "data": {
            title,
            description,
            price,
            category_id,
            image,
            is_active,
            created_by
        }
    })

    return res.status(201).json({
        "message": "Created a new product in database with succesfully!",
        product
    })

}
)

const getAllProducts = asyncHandler(async (req, res) => {
    const { page, limit, search, categoryId, minPrice, maxPrice } = req.query
    const where = {}
    const pageNum = Number(page) || 1
    const limitNum = Number(limit) || 10
    const skip = (pageNum - 1) * limitNum

    if (search) {
        where.title = { contains: search, mode: 'insensitive' }
    }

    if (categoryId) {
        where.category_id = Number(categoryId)
    }

    if (minPrice || maxPrice) {
        where.price = {}
        if (minPrice) where.price.gte = Number(minPrice)
        if (maxPrice) where.price.lte = Number(maxPrice)
    }
    const [products, totalProducts] = await Promise.all([prisma.product.findMany({
        include: { category: true },
        where,
        skip,
        take: limitNum

    }), prisma.product.count({
        where
    })])
    return res.status(200).json({
        "message": "Getting products with successfully!",
        products,
        pagination: {
            total: totalProducts,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(totalProducts / limitNum)
        }
    })

}
)

const getProductById = asyncHandler(async (req, res) => {
    let id = parseInt(req.params.id)
    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    })
    if (!product) {
        throw new AppError(`product could'nt found with this ${id} id in database`, 404)
    }
    return res.status(200).json({
        "message": "Getting product with succesfully!",
        product
    })
})

const updateProduct = asyncHandler(async (req, res) => {
    let id = parseInt(req.params.id)
    const { title, description, price, category_id, image, is_active } = req.body
    const updatedProduct = await prisma.product.update({
        where: { id },
        "data": {
            title,
            description,
            price,
            category_id,
            image,
            is_active,
        }
    })
    return res.status(200).json({
        "message": "update product with succesfully!",
        updatedProduct
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    let id = parseInt(req.params.id)
    const deletedProduct = await prisma.product.delete({
        where: { id }
    })
    return res.status(200).json({
        "message": "Delete product with succesfully!",
        deletedProduct
    })
}
)
module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }