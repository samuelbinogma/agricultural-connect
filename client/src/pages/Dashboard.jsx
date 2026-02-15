import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Not logge in');

                const res = await axios.get('http://localhost:5000/api/products/my-products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProducts(res.data.products || []);
            } catch (err) {
                console.error('Fetch products error:', err);
                setError(err.response?.data?.message || 'Failed to laod products');
            } finally {
                setLoading(false)
            }
        };

        if (user?.role === 'farmer') {
            fetchMyProducts();
        }
    }, [user]);

    return (
        <div className="dashboard-page">
            <div className="container">
                <header className="dashboard-header">
                    <h1>Farmer Dashboard</h1>
                    <p>Welcome back {user?.name || 'Farmer'}</p>
                </header>

                <section className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">12</div>
                        <div className="stat-label">Active Products</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">$ 2,450</div>
                        <div className="stat-label">This Month Earnings</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">8</div>
                        <div className="stat-label">Pending Orders</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">4.8</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </section>

                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to='/add-product'className="action-btn primary">Add New Product</Link>
                        <button className="action-btn">View Orders</button>
                        <button className="action-btn primary">Check Messages</button>
                        <button className="action-btn secondary">Update Farm Profile</button>
                    </div>
                </section>

                <section className="my-products">
                    <div className="section-header">
                        <h2>My Products</h2>
                        <Link to="/add-product" className="btn small">
                            Add New
                        </Link>
                    </div>

                    {loading && <p className="loading">Loading your products...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {!loading && !error && products.length === 0 && (
                        <p className="no-products">You haven't added any products yet.</p>
                    )}

                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                {product.imageUrl ? (
                                    <img 
                                        src={`http://localhost:5000${product.imageUrl}`}
                                        alt={product.name}
                                        className="product-image"
                                        onError={(e) => {
                                            e.target.src = '/placeholder-product.jpg';
                                            e.target.alt ='Image failed to load'
                                        }}
                                    />
                                ) : (
                                    <div className="product-image-placeholder">{product.name}</div>
                                )}

                                <div className="product-content">
                                    <h3>{product.name}</h3>
                                    <p className="price">
                                        GH¢ {Number(product.price).toFixed(2)} / {product.unit}
                                    </p>
                                    <p className="stock">Stock: {product.quantity} {product.unit}</p>
                                    <p className="category">{product.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}