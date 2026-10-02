const { default: z } = require("zod");

const getFavoriteByIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/)
    })
})

module.exports = { getFavoriteByIdSchema }