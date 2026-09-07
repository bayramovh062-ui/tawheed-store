const { z } = require("zod");

const productSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.number().positive(),
    category_id: z.number().int(),
    image: z.string(),
    is_active: z.boolean()
})

module.exports = { productSchema }