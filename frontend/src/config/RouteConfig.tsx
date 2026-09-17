import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
function RouteConfig() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </div>
    )
}

export default RouteConfig