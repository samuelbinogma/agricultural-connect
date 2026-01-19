import { Link } from "react-router-dom";

export default function RoleSelection() {
    return (
        <div className="role-select-container">
            <div className="container">
                <h1 className="role-title">Who Are You?</h1>
                <p className="role-subtitle">Choose your role to get the best experience</p>

                <div className="role-cards">
                    {/* Farmers Card */}
                    <Link to="/register?role=farmer" className="role-card farmer-card">
                        <div className="role-icon"></div>
                        <h2>Farmer / Producer</h2>
                        <p>List your fresh produce, manage stock, connect directly with buyers</p>
                        <span className="role-badge">Sell Directly</span>
                    </Link>

                    {/* Customers Card */}
                    <Link to="/register?role=customer" className="role-card customer-card">
                        <div className="role-icon"></div>
                        <h2>Customer / Buyer</h2>
                        <p>Discover fresh local produce, message farmers, get best prices</p>
                        <span className="role-badge">Buy Fresh</span>
                    </Link>
                </div>

                <p className="already-have">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
}