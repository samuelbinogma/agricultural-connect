export default function Browse() {
    return (
        <div className="browse-page">
            <div className="container">
                <header className="browse-header">
                    <h1>Fresh Local Produce</h1>
                    <p>Discover products directly from farmers in your area</p>
                </header>

                <section className="filters">
                    <div className="filter-group">
                        <label>Category</label>
                        <select>
                            <option>All</option>
                            <option>Vegetables</option>
                            <option>Fruits</option>
                            <option>Grains</option>
                            <option>Tubers</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Sort by</label>
                        <select>
                            <option>Newest</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Most Popular</option>
                        </select>
                    </div>

                    <button className="btn filter-btn">Apply</button>
                </section>

                <section className="products-grid">
                    <div className="product-card">
                        <div className="product-image-placeholder">Tomatoes</div>
                        <div className="product-content">
                            <h3>Fresh Tomatoes</h3>
                            <p className="farmer">Sunrise Farm</p>
                            <p className="price">$40 / kg</p>
                            <button className="btn small contact">Message Farmer</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-placeholder">Tomatoes</div>
                        <div className="product-content">
                            <h3>Fresh Tomatoes</h3>
                            <p className="farmer">Sunrise Farm</p>
                            <p className="price">$40 / kg</p>
                            <button className="btn small contact">Message Farmer</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-placeholder">Tomatoes</div>
                        <div className="product-content">
                            <h3>Fresh Tomatoes</h3>
                            <p className="farmer">Sunrise Farm</p>
                            <p className="price">$40 / kg</p>
                            <button className="btn small contact">Message Farmer</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-placeholder">Tomatoes</div>
                        <div className="product-content">
                            <h3>Fresh Tomatoes</h3>
                            <p className="farmer">Sunrise Farm</p>
                            <p className="price">$40 / kg</p>
                            <button className="btn small contact">Message Farmer</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}