const prisma = require("../config/prisma")

const createProduct = async (req, res) => {
    try {
        const { title, description, price, category_id, image, is_active } = req.body
        const created_by = req.user.id
        if (!title || !price || !category_id || !image || typeof is_active !== "boolean" || !created_by) {
            return res.status(400).json({
                "message": "title, price, category_id, image, is_active and created_by required"
            })
        }
        const product = await prisma.product.create({
            "data": {
                title,
                description,
                price: parseFloat(price),
                category_id: parseInt(category_id),
                image,
                is_active: Boolean(is_active),
                created_by
            }
        })

        return res.status(201).json({
            "message": "Created a new product in database with succesfully!",
            product
        })
    } catch (error) {
        console.log("An error occuried while creating a new product in database")
        return res.status(500).json({
            "message": `An error occuried while creating a new product in database ${error}`
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({ include: { category: true } })
        return res.status(200).json({
            "message": "Getting products with successfully!",
            products
        })
    } catch (error) {
        console.log("An error occuried while getting products from database")
        return res.status(500).json({
            "message": `An error occuried while getting products from database ${error}`
        })
    }

}

const getProductById = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({
                "message": "Invalid product ID"
            })
        }
        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true }
        })
        if (!product) {
            return res.status(404).json({
                "message": `There is no product in database with this ${id} id`,
                product
            })
        }
        return res.status(200).json({
            "message": "Getting product with succesfully!",
            product
        })
    } catch (error) {
        console.log(`An error occuried while getting product by id in database ${error}`)
        return res.status(500).json({
            "message": `An error occuried while getting product by id in database ${error}`
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({
                "message": "Invalid product ID"
            })
        }
        const { title, description, price, category_id, image, is_active } = req.body
        if (!title || !price || !category_id || !image || typeof is_active !== "boolean") {
            return res.status(400).json({
                "message": "title, price, category_id, image, and is_active required"
            })
        }
        const updatedProduct = await prisma.product.update({
            where: { id },
            "data": {
                title,
                description,
                price: parseFloat(price),
                category_id: parseInt(category_id),
                image,
                is_active: Boolean(is_active),
            }
        })
        return res.status(200).json({
            "message": "update product with succesfully!",
            updatedProduct
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: `Product with id ${req.params.id} not found`
            })
        }
        console.log(`An error occuried while updating product ${error}`)
        return res.status(500).json({
            "message": `An error occuried while updating product ${error}`
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({
                "message": "Invalid product ID"
            })
        }
        const deletedProduct = await prisma.product.delete({
            where: { id }
        })
        return res.status(200).json({
            "message": "Delete product with succesfully!",
            deletedProduct
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                message: `Product with id ${req.params.id} not found`
            })
        }
        console.log(`An error occuried while deleting product ${error}`)
        return res.status(500).json({
            "message": `An error occuried while deleting product ${error}`
        })
    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }