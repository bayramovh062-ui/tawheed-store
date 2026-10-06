import { Route, Routes } from 'react-router-dom'
import Products from '../components/Products'
import RegisterPage from '../components/RegisterPage'
import LoginPage from '../components/LoginPage'
function RouteConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Products />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
            </Routes>
        </div>
    )
}

export default RouteConfig