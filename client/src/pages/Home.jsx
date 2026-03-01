import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Leaf, DollarSign, MessageSquare } from 'lucide-react';

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setFeaturedProducts(res.data.products.slice(0, 6));
            } catch (err) {
                setError('Failed to laod featured products');
            } finally {
                setLoading(false)
            }
        };

        fetchFeatured();
    }, []);

    return (
        <div className="home-page">
            <section className="hero">
                    <div className="container hero-content">
                        <h1>Fresh from Farm to you</h1>
                        <p>Connect directly with local farmers. No middlemen, better prices, fresher produce.</p>

                        <div className="hero-cta">
                            <Link to="/browse" className="btn btn-primary btn-large">Browse Products</Link>
                            <Link to="/select-role" className="btn btn-outline btn-large">Sell your produce</Link>
                        </div>
                    </div>
            </section>


            <section className="featured-products">
                <div className="container">
                    <h2>Featured Fresh Produce</h2>

                    {loading && <p className="loading">Laoding featured items....</p>}
                    {error && <p className="error">{error}</p>}

                    <div className="featured-grid">
                        {featuredProducts.map(product => (
                            <div key={product._id} className="featured-card">
                                {product.imageUrl ? (
                                    <img 
                                        src={`http://localhost:5000${product.imageUrl}`}
                                        alt={product.name}
                                        className="featured-image"
                                    />
                                ) : (
                                    <div className="featured-placeholder">{product.name}</div>
                                )}

                                <div className="featured-info">
                                    <h3>{product.name}</h3>
                                    <p className="price">GH¢ {Number(product.price).toFixed(2)} / {product.unit}</p>
                                    <p className="farmer">From {product.farmerName || 'Local Farmer'}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="see-more">
                        <Link to="/browse" className="btn btn-outline">
                            See All Products
                        </Link>
                    </div>
                </div>
            </section>

            <section className="benefits">
                <div className="container">
                    <h2>Why Choose AgriConnect</h2>
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <Leaf size={48} strokeWidth={1.5} className="benefit-icon-svg" />
                            <h3>Fresh & Local</h3>
                            <p>Direct from farms, no long supply chains</p>
                        </div>
                        <div className="benefit-item">
                            <DollarSign size={48} strokeWidth={1.5} className="benefit-icon-svg" />
                            <h3>Better Prices</h3>
                            <p>Cut out middlemen, fairer for everyone</p>
                        </div>
                        <div className="benefit-item">
                            <MessageSquare size={48} strokeWidth={1.5} className="benefit-icon-svg" />
                            <h3>Direct Connection</h3>
                            <p>Message farmers, ask questions, build trust</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

