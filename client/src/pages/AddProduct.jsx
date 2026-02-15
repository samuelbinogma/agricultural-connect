import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext} from '../context/AuthContext';

export default function AddProduct() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('Selected file:', file.name, file.size, file.type);
            setSelectedFile(file);
        } else {
            console.log('No file selected');
            setSelectedFile(null)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!formData.name || !formData.price || !formData.quantity) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Not logged in');
            }

            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('unit', formData.unit);
            formDataToSend.append('quantity', formData.quantity);
            formDataToSend.append('category', formData.category);

            if (selectedFile) {
                formDataToSend.append('image', selectedFile)
                console.log('File being sent:', selectedFile.name, selectedFile.size)
            } else {
                console.log('No file selected');
            }

            const res = await axios.post(
                'http://localhost:5000/api/products',
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
            setSelectedFile(null);
        } catch (err) {
            console.error('Add product error:', err)
            setError(
                err.response?.data?.message || 'Failed to add product. Please try again.'
            );
        } finally {
            setLoading(false);
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
                        <label htmlFor="image">Product Image URL (optional)</label>
                        <input 
                            type="file" 
                            name="image" 
                            id="image" 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {selectedFile && (
                            <p className="file-name">Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</p>
                        )}
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