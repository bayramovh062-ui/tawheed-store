const { z } = require('zod')

const checkoutSchema = z.object({
    body: z.object({
        payment_method: z.enum(['CASH', 'CARD']),
        delivery_location: z.string().min(5),
        contact_phone: z.string().regex(/^(\+?994)(50|51|55|70|77|99|10|60)\d{7}$/)
    })
})

module.exports = { checkoutSchema }