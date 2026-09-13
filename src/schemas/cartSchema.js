const { z } = require('zod')

const addToCartSchema = z.object({
    body: z.object({
        product_id: z.number().int().positive(),
        location: z.string(),
        quantity: z.number().int().min(1)
    })
})

const updateCartItemSchema = z.object({
    body: z.object({
        quantity: z.number().int().min(1)
    }),
    params: z.object({
        id: z.string().regex(/^\d+$/)
    })
})

const deleteCartItemSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/)
    })
})

module.exports = { addToCartSchema, updateCartItemSchema, deleteCartItemSchema }