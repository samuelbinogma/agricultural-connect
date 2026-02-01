import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RoleSelection from './pages/RoleSelection'
import './styles/main.css'
import Dashboard from './pages/Dashboard'
import Browse from './pages/CustomerBrowse'
import AddProduct from './pages/AddProduct'


function App() {

    return (
        <>
            <Navbar />

            <Routes>
                <Route path='/select-role' element={<RoleSelection />} />
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/browse"    element={<Browse />} />
                <Route path="/add-product" element={<AddProduct />} />
                
                <Route path='*' element={<div>404 - Page Not Found</div>} />
            </Routes>
        </>
        
    )
}

export default App