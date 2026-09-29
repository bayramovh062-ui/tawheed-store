import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { useEffect } from "react"
import { fetchProducts } from "../redux/slice/productSlice"
import Product from "./Product"
import type { productType } from "../redux/slice/productSlice"
import '../css/products.css'


function Products() {
    const { products, loading, error } = useSelector((state: RootState) => {
        return state.product
    })

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])
    return (
        <div className="products-wrapper">{products.map((product: productType) => {
            return <Product product={product} key={product.id} />
        })}</div>
    )
}

export default Products