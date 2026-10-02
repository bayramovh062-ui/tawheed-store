const prisma = require("../config/prisma");
const { asyncHandler } = require("../utils/asyncHandler");

const getFavoritesById = asyncHandler(async (req, res) => {
    const id = Number(req.params.id)
    const favorites = await prisma.favorite.findMany({
        where: { user_id: id },
        include: { product: true }
    })
    return res.status(200).json({
        "message": 'Getting favorite products with successfully !',
        favorites
    })
})

module.exports = { getFavoritesById }