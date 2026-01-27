export default function Dashboard() {
    return (
        <div className="dashboard-page">
            <div className="container">
                <header className="dashboard-header">
                    <h1>Farmer Dashboard</h1>
                    <p>Welcome back</p>
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
                        <button className="action-btn primary">Add New Product</button>
                        <button className="action-btn">View Orders</button>
                        <button className="action-btn primary">Check Messages</button>
                        <button className="action-btn secondary">Update Farm Profile</button>
                    </div>
                </section>

                <section className="my-products">
                    <div className="section-header">
                        <h2>My Products</h2>
                        <button className="btn small">View All</button>
                    </div>

                    <div className="products-list">
                        <div className="product-item">
                            <div className="product-image-placeholder">Tomatoes</div>
                            <div className="product-info">
                                <h3>Fresh Tomatoes</h3>
                                <p className="price">$40 / kg</p>
                                <p className="stock">In stock: 45kg</p>
                            </div>
                            <div className="product-actions">
                                <button className="btn small edit">Edit</button>
                                <button className="btn small delete">Delete</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}