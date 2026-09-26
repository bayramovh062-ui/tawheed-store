import { Route, Routes } from 'react-router-dom'
import Products from '../components/Products'
function RouteConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Products />}></Route>
            </Routes>
        </div>
    )
}

export default RouteConfig