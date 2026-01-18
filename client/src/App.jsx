import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './styles/main.css'


function App() {

    return (
        <>
            <Navbar />
            
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route path='*' element={<div>404 - Page Not Found</div>} />
            </Routes>
        </>
        
    )
}

export default App