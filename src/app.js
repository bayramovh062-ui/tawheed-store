const express = require("express")
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const { globalErrorMiddleware } = require("./middlewares/errorMiddleware")
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
    res.send('server working with succesfully')
})

app.use(globalErrorMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("server is working on http://localhost:5000")
})