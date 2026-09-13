const express = require("express")
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const { globalErrorMiddleware } = require("./middlewares/errorMiddleware")
require('dotenv').config()

if (!process.env.JWT_SECRET) {
    console.log("FATAL ERROR: JWT_SECRET could'nt found in .env")
    process.exit(1)
}
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

app.get('/', (req, res) => {
    res.send('server working with succesfully')
})

app.use(globalErrorMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server is working on http://localhost:5000")
})