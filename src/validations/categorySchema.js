const { z } = require('zod')

const categorySchema = z.object({
    body: z.object({
        name: z.string()
    })
})

const deleteCategorySchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/)
    })
})

const updateCategorySchema = z.object({
    body: z.object({
        name: z.string().min(1)
    }),
    params: z.object({
        id: z.string().regex(/^\d+$/)
    })
})

module.exports = { categorySchema, deleteCategorySchema, updateCategorySchema }