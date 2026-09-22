const prisma = require('../config/prisma')
const { asyncHandler } = require('../utils/asyncHandler')

const checkOut = asyncHandler(async (req, res) => {
    const { payment_method, delivery_location, contact_phone } = req.body
    const user_id = req.user.id
    const userOrder = await prisma.order.findFirst({
        where: { status: 'PENDING', user_id },
        include: { items: true }
    })
    if (!userOrder) {
        return res.status(404).json({
            "message": "You don't have any order in your cart."
        })
    }

    if (userOrder.items.length === 0) {
        return res.status(400).json({
            "message": "Your cart is empty"
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

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await prisma.order.findMany({
        where: { status: { not: 'PENDING' } },
        include: { user: { select: { id: true, name: true, last_name: true, email: true } }, items: { include: { product: true } } }
    })

    if (orders.length === 0) {
        return res.status(200).json({
            "message": "There is no any order in database",
            orders
        })
    }
    return res.status(200).json({
        "message": "getting all orders with succesfully",
        orders
    })
})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body
    const id = Number(req.params.id)
    const order = await prisma.order.findUnique({
        where: { id }
    })
    if (!order) {
        return res.status(404).json({
            "message": `We couldn't found any order with this ${id} id in database`
        })
    }
    const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
            status
        }
    })

    return res.status(200).json({
        "message": `updated order's status from ${order.status} to ${updatedOrder.status} with succesfully`
    })
})

const getUserOrderHistory = asyncHandler(async (req, res) => {
    const user_id = req.user.id
    const orders = await prisma.order.findMany({
        where: { user_id, status: { not: 'PENDING' } },
        include: { items: { include: { product: true } } }
    })
    if (orders.length === 0) {
        return res.status(200).json({
            "message": "You don't have any order history",
            orders
        })
    }
    return res.status(200).json({
        "message": "getting orders history successfully",
        orders
    })
})
module.exports = { checkOut, getAllOrders, updateOrderStatus, getUserOrderHistory }