import logo from '../asset/AgriConnectLogo1.png';

function Navbar() {
    return (
        <header className="navbar">
            <div className="container">
                <div className="nav-content">
                    <a href='/' className="logo">
                        <img src={logo} alt="logo" className='logo-image'/>
                        <span className="logo-text">AgriConnect</span>
                    </a>

                    <nav className="nav-links">
                        <a href="#">Home</a>
                        <a href="#">Browse Products</a>
                        <a href="#">How it Works</a>
                        <div className="auth-buttons">
                            <a href="#" className='btn btn-outline'>Login</a>
                            <a href="#" className='btn btn-primary'>Sign Up</a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar