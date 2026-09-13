const prisma = require('../config/prisma')
const { asyncHandler } = require('../utils/asyncHandler')

const checkOut = asyncHandler(async (req, res) => {
    const { payment_method, delivery_location, contact_phone } = req.body
    const user_id = req.user.id
    const userOrder = await prisma.order.findFirst({
        where: { status: 'PENDING', user_id }
    })
    if (!userOrder) {
        return res.status(404).json({
            "message": "You don't have any order in your cart."
        })
    }
    const updatedOrder = await prisma.order.update({
        data: {
            status: "PROCESSING",
            payment_method,
            delivery_location,
            contact_phone
        },
        where: { id: userOrder.id }
    })
    if (payment_method === "CARD") {
        const adminPhone = "994556935304"
        const text = `Salam, mən ${updatedOrder.id} nömrəli sifarişin ödənişini kartla etmək istəyirəm. Məbləğ: ${updatedOrder.total_amount} AZN.`
        const whatsappLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`
        return res.status(200).json({
            "message": "Redirecting to WhatsApp for payment...",
            "redirect_url": whatsappLink,
            "order": updatedOrder
        });
    }
    return res.status(200).json({
        "message": "Your order is waiting for confirmation. After checking, your order status will be updated (PAID, SHIPPED, etc.). We will contact you via your phone number.",
        "order": updatedOrder
    })
})

module.exports = { checkOut }