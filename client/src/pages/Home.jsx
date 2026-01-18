function Home() {
    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <div className="hero-container">
                        <h1>Fresh from Farm to you</h1>
                        <p>Connect directly with local farmers. No middlemen, better prices, fresher produce.</p>
                        <div className="hero-buttons">
                            <button className="btn btn-primary btn-large">Browse Products</button>
                            <button className="btn btn-outline btn-large">Sell your produce</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="featured-products">
                <div className="container">
                    <h2>Featured Fresh Produce</h2>
                    <div className="products-grid">
                        {/* We'll add real ProductCard components later */}
                        <div className="card product-preview">Tomatoes</div>
                        <div className="card product-preview">Cassava</div>
                        <div className="card product-preview">Plantain</div>
                        <div className="card product-preview">Garden Eggs</div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home