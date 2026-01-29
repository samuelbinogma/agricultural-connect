import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import logo from '../asset/AgriConnectLogo1.png';

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link to='/' className="logo">
                        <img src={logo} alt="logo" className='logo-image'/>
                        <span className="logo-text">AgriConnect</span>
                    </Link>

                    <nav className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/products">Browse Products</Link>
                        <Link to="/how-it-works">How it Works</Link>

                        <div className="auth-sections">
                            {user ? (
                                <div className="user-menu">
                                    <span className="user-greeting">
                                        Welcome, <strong>{user.name}</strong>
                                    </span>

                                    <span className={`role-badge ${user.role}`}>
                                        {user.role === 'farmer' ? 'Farmer' : 'Customer'}
                                    </span>

                                    <button onClick={logout} className='logout-link'>
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className='auth-buttons'>
                                        <Link to="/login" className="btn btn-outline">
                                            Login
                                        </Link>
                                        <Link to="/select-role" className="btn btn-primary">
                                            Sign Up
                                        </Link>
                                    </div>
                                    
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar