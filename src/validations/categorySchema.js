const { z } = require('zod')

const categorySchema = z.object({
    name: z.string()
})

module.exports = { categorySchema }