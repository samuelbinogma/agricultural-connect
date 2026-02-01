import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext} from '../context/AuthContext';

export default function AddProduct() {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        unit: 'kg',
        quantity: '',
        category: 'vegetables',
        imageUrl: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLaoding] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLaoding(true);

        if (!formData.name || !formData.price || !formData.quantity) {
            setError('Please fill in all required fields');
            setLaoding(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(
                'http://localhost:5000/api/products',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setSuccess('Product added successfully!');

            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)

            setFormData({
                name: '',
                description: '',
                price: '',
                unit: 'kg',
                quantity: '',
                category: 'vegetables',
                imageUrl: '',
            });
        } catch (err) {
            console.error('Add product error:', err)
            setError(
                err.response?.data?.message || 'Failed to add product. Please try again.'
            );
        } finally {
            setLaoding(false);
        }
    };

    return (
        <div className="add-product-page">
            <div className="container">
                <header className="page-header">
                    <h1>Add New Product</h1>
                    <p>List a new item for sale on AgriConnect</p>
                </header>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Fresh Tomatoes"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select name="category" id="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                            <option value="tubers">Tubers</option>
                            <option value="grains">Grains & Cereals</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="price">Price</label>
                            <div className="price-input">
                                <span className="currency">GH¢</span>
                                <input 
                                    type="number" 
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="40"
                                    step='0.01'
                                    min='0'
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group half">
                            <label htmlFor="unit">Unit</label>
                            <select name="unit" id="unit"
                                value={formData.unit}
                                onChange={handleChange}
                            >
                                <option value="kg">per kg</option>
                                <option value="piece">per piece</option>
                                <option value="bunch">per bunch</option>
                                <option value="crate">per crate</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Available Qunatity</label>
                        <input 
                            type="number"
                            id="quantity"
                            name="quantity"
                            onChange={handleChange}
                            value={formData.quantity}
                            placeholder="e.g. 50"
                            min='1'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" 
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your product (variety, freshness, organic, etc)"
                            rows='4'
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageURL">Product Image URL (optional)</label>
                        <input type="url" name="imageURL" id="imageURL" 
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/tomatoes.jpg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                        disabled={loading}
                        onSubmit={handleSubmit}
                    >
                        {loading ? 'Adding Product...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}