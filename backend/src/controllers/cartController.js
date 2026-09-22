const prisma = require('../config/prisma')
const { AppError } = require('../utils/AppError')
const { asyncHandler } = require('../utils/asyncHandler')

const addItemToCart = asyncHandler(async (req, res) => {
    const { product_id, quantity } = req.body
    const user_id = req.user.id
    let message = "added item to order with successfully!"

    const product = await prisma.product.findUnique({
        where: { id: product_id }
    })
    if (!product) {
        throw new AppError(`couldn't found item with this ${product_id} id in database`, 404)
    }

    let userOrder = await prisma.order.findFirst({
        where: { user_id, status: 'PENDING' }
    })

    if (!userOrder) {
        userOrder = await prisma.order.create({
            data: {
                total_amount: 0,
                status: 'PENDING',
                user_id
            }
        })
        message = "created order and added item to order with succesfully!"
    }

    let order_item = await prisma.orderItem.findFirst({
        where: { order_id: userOrder.id, product_id }
    })

    if (!order_item) {
        order_item = await prisma.orderItem.create({
            data: {
                product_id,
                product_quantity: quantity,
                product_price: product.price,
                order_id: userOrder.id
            }
        })
    } else {
        order_item = await prisma.orderItem.update({
            where: { id: order_item.id },
            data: {
                product_quantity: order_item.product_quantity + quantity
            }
        })
    }

    const updatedOrder = await recalculateOrderTotal(order_item.order_id)

    return res.status(201).json({
        message,
        order_item,
        total_amount: updatedOrder.total_amount
    })
})

const updateCartItem = asyncHandler(async (req, res) => {
    const { quantity } = req.body
    const id = Number(req.params.id)
    const user_id = req.user.id

    const order_item = await prisma.orderItem.findFirst({
        where: { id, order: { user_id, status: 'PENDING' } }
    })

    if (!order_item) {
        throw new AppError("Cart item not found or unauthorized", 404)
    }

    const updatedOrderItem = await prisma.orderItem.update({
        where: { id },
        data: { product_quantity: quantity }
    })


    await recalculateOrderTotal(updatedOrderItem.order_id)

    return res.status(200).json({
        message: "updated order with succesfully",
        updatedOrderItem
    })
})

const deleteOrderItem = asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const user_id = req.user.id

    const order_item = await prisma.orderItem.findFirst({
        where: { id, order: { user_id, status: 'PENDING' } }
    })

    if (!order_item) {
        throw new AppError("Cart item not found or unauthorized", 404)
    }

    const deletedOrderItem = await prisma.orderItem.delete({
        where: { id }
    })


    await recalculateOrderTotal(deletedOrderItem.order_id)

    return res.status(200).json({
        message: "deleted item with succesfully!",
        deletedOrderItem
    })
})

const getUserCartItems = asyncHandler(async (req, res) => {
    const user_id = req.user.id
    const order = await prisma.order.findFirst({
        where: { user_id, status: 'PENDING' },
        include: { items: { include: { product: true } } }
    })

    if (!order) {
        return res.status(200).json({
            message: "cart is empty",
            order: {
                items: [],
                total_amount: 0
            }
        })
    }

    return res.status(200).json({
        message: 'getting user order with succesfully!',
        order
    })
})

const recalculateOrderTotal = async (order_id) => {
    const items = await prisma.orderItem.findMany({
        where: { order_id: order_id }
    })

    const totalAmount = items.reduce((sum, item) => {
        return sum + item.product_quantity * item.product_price
    }, 0)

    return await prisma.order.update({
        where: { id: order_id },
        data: {
            total_amount: totalAmount
        }
    })
}

module.exports = { deleteOrderItem, updateCartItem, addItemToCart, getUserCartItems }