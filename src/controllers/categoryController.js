const prisma = require("../config/prisma")
const { AppError } = require("../utils/AppError")
const { asyncHandler } = require("../utils/asyncHandler")

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    const category = await prisma.category.create({
        "data": {
            name
        }
    })
    return res.status(201).json({
        "message": "Created new category in database with succesfully!",
        category
    })
})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await prisma.category.findMany()
    return res.status(200).json({
        "message": "Getting categories with succesfully!",
        categories
    })

})

const updateCategory = asyncHandler(async (req, res) => {
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        throw new AppError("Invalid category ID", 400)
    }
    const { name } = req.body

    const updatedCategory = await prisma.category.update({
        where: { id },
        "data": {
            name
        }
    })
    return res.status(200).json({
        "message": "Update category with succesfully!",
        updatedCategory
    })

})

const deleteCategory = asyncHandler(async (req, res) => {
    let id
    id = parseInt(req.params.id)
    if (isNaN(id)) {
        throw new AppError("Invalid category ID", 400)

    }
    const deletedCategory = await prisma.category.delete({
        where: { id }
    })
    return res.status(200).json({
        "message": "Delete category with succesfully",
        deletedCategory
    })

})

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory }