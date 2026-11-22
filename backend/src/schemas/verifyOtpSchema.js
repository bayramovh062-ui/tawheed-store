const { default: z } = require("zod");

const verifyOtpSchema = z.object({
    body: z.object({
        email: z.string().email(),
        otpCode: z.string().length(6)
    })
})

const resendOtpSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format')
    })
})


module.exports = {
    verifyOtpSchema,
    resendOtpSchema
}