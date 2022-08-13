import { Routes, Route } from 'react-router-dom'
import Login from '../components/public/Login'
import Home from '../components/private/Home'
import Register from '../components/public/Register'
import PrivateRoute from './PrivateRoutes'
import PublicRoute from './PublicRoutes' 
import PurchasedImg from '../components/private/PurchasedImg'
import SavedImg from '../components/private/SavedImg'

const RouterApp = () => {
    return (
        <Routes>
            <Route exact path="/" element={<PublicRoute> <Login /> </PublicRoute>} />
            <Route path="Home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
            <Route path="Register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="Purchased" element={<PrivateRoute> <PurchasedImg /> </PrivateRoute>} />
            <Route path="Saved" element={<PrivateRoute> <SavedImg /> </PrivateRoute>} />
            <Route path="*" element={<h1>ERROR 404 Not Found</h1>} />
        </Routes>
    )
}

export default RouterApp