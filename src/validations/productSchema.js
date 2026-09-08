const { z, object } = require("zod");

const createProductSchema = z.object({
    body: z.object({
        title: z.string(),
        description: z.string().optional(),
        price: z.number().positive(),
        category_id: z.number().int(),
        image: z.string(),
        is_active: z.boolean()
    })
})

const getProductByIdAndDeleteSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/)
    })
})

const updateProductSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        category_id: z.number().int().optional(),
        image: z.string().optional(),
        is_active: z.boolean().optional()
    }),
    params: z.object({
        id: z.string().regex(/^\d+$/)
    })
})


module.exports = { createProductSchema, getProductByIdAndDeleteSchema, updateProductSchema }