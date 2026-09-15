const { z } = require('zod')

const registerSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string().min(8),
        name: z.string(),
        last_name: z.string(),
        location: z.string().optional()
    })
})

const loginSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string().min(8),
    })
})

module.exports = { registerSchema, loginSchema }