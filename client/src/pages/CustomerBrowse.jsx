import { useState, useEffect } from "react";
import axios from 'axios';

export default function Browse() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');

                let url = 'http://localhost:5000/api/products';
                const params = {};

                if (categoryFilter !== 'all') params.category = categoryFilter;
                if (sortBy === 'price-low') params.sort = 'price';
                if (sortBy === 'price-high') params.sort = '-price';

                const res = await axios.get(url, { params });

                setProducts(res.data.products || [])
            } catch (err) {
                console.error('Browse fetch error:', err);
                setError('Failed to load products. Please try again.');
            } finally {
                setLoading(false)
            }
        };

        fetchProducts();
    }, [categoryFilter, sortBy]);

    const filteredProducts = products;

    return (
        <div className="browse-page">
            <div className="container">
                <header className="browse-header">
                    <h1>Fresh Local Produce</h1>
                    <p>Discover fresh produce directly from local farmers</p>
                </header>

                <section className="filters-section">
                    <div className="filter-controls">
                        <div className="filter-group">
                            <label htmlFor="category">Category</label>
                            <select id="category"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="fruits">Fruits</option>
                                <option value="tubers">Tubers</option>
                                <option value="grains">Grains</option>
                                <option value="others">Others</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="sort">Sort By</label>
                            <select 
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="products-section">
                    {loading && <div className="loading">Laoding fresh produce....</div>}
                    {error && <div className="error-message">{error}</div>}

                    {!loading && !error && products.length === 0 && (
                        <div className="no-products">
                            <p>No products found in this category yet.</p>
                            <p>Check back soon or try another filter!</p>
                        </div>
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
                                            e.target.alt = 'Image failed to load';
                                        }}
                                    />
                                ) : (
                                    <div className="product-placeholder">{product.name}</div>
                                )}

                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">
                                        GH¢ {Number(product.price).toFixed(2)} / {product.unit}
                                    </p>
                                    <p className="product-stock">
                                        Available: {product.quantity} {product.unit}
                                    </p>
                                    <p className="product farmer">
                                        From Farmer {product.farmer?.name || 'Local Farm'}
                                    </p>
                                    <button className="btn contact-btn">Message Farmer</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>                      
    )
}