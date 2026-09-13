const prisma = require('../config/prisma')
const { AppError } = require('../utils/AppError')
const { asyncHandler } = require('../utils/asyncHandler')

const addItemToCart = asyncHandler(async (req, res) => {
    const { product_id, quantity, location } = req.body
    const user_id = req.user.id
    let message = "added item to order with successfully!"

    // 1. Məhsulun bazada olub-olmadığını yoxla
    const product = await prisma.product.findUnique({
        where: { id: product_id }
    })
    if (!product) {
        throw new AppError(`couldn't found item with this ${product_id} id in database`, 404)
    }

    // 2. İstifadəçinin PENDING statuslu active order-ni tap və ya yarat
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

    // 3. Məhsulun bu order daxilində olub-olmadığını yoxla
    let order_item = await prisma.orderItem.findFirst({
        where: { order_id: userOrder.id, product_id }
    })

    if (!order_item) {
        // Yoxdursa: Yeni orderItem yarat
        order_item = await prisma.orderItem.create({
            data: {
                product_id,
                product_quantity: quantity,
                product_price: product.price,
                location,
                order_id: userOrder.id
            }
        })
    } else {
        // Varsa: Mövcud sayın üstünə yeni gələn sayı əlavə et
        order_item = await prisma.orderItem.update({
            where: { id: order_item.id },
            data: {
                product_quantity: order_item.product_quantity + quantity
            }
        })
    }

    // 4. Əsas Order-in ümumi məbləğinə YALNIZ yeni əlavə edilən miqdarın qiymətini gəl
    const updatedOrder = await prisma.order.update({
        where: { id: userOrder.id },
        data: {
            total_amount: userOrder.total_amount + (product.price * quantity)
        }
    })

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

    const order = await prisma.order.findFirst({
        where: { id: updatedOrderItem.order_id }
    })

    let totalPrice = order.total_amount
    totalPrice -= (order_item.product_quantity * order_item.product_price)
    totalPrice += (updatedOrderItem.product_quantity * updatedOrderItem.product_price)

    await prisma.order.update({
        where: { id: order.id },
        data: { total_amount: totalPrice }
    })

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

    const order = await prisma.order.findUnique({
        where: { id: deletedOrderItem.order_id }
    })

    let totalPrice = order.total_amount - (deletedOrderItem.product_price * deletedOrderItem.product_quantity)

    await prisma.order.update({
        where: { id: order.id },
        data: { total_amount: totalPrice }
    })

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

module.exports = { deleteOrderItem, updateCartItem, addItemToCart, getUserCartItems }