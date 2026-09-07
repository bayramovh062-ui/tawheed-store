const prisma = require("../config/prisma")

const createCategory = async (req, res) => {
    try {
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

    } catch (error) {
        console.log("An error occuried while creating new category")
        return res.status(500).json({
            "message": `An error occuried while creating new category ${error}`
        })
    }

}

const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()
        return res.status(200).json({
            "message": "Getting categories with succesfully!",
            categories
        })
    } catch (error) {
        console.log("An error occuried while getting categories from database")
        return res.status(500).json({
            "message": `An error occuried while getting categories from database ${error}`
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        let id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({
                "message": "Invalid category ID"
            })
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
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                "message": `Category with id ${req.params.id} not found`
            })
        }
        console.log(`An error occuried while upadating category ${error}`)
        return res.status(500).json({
            "message": `An error occuried while upadating category ${error}`
        })
    }
}

const deleteCategory = async (req, res) => {
    let id
    try {
        id = parseInt(req.params.id)
        if (isNaN(id)) {
            return res.status(400).json({
                "message": "Invalid category ID"
            })
        }
        const deletedCategory = await prisma.category.delete({
            where: { id }
        })
        return res.status(200).json({
            "message": "Delete category with succesfully",
            deletedCategory
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                "message": `Category with id ${id} not found`
            })
        }
        console.log(`An error occuried while deleting category ${error}`)
        return res.status(500).json({
            "message": `An error occuried while deleting category ${error}`
        })
    }
}

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory }