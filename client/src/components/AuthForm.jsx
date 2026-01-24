import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AuthForm({ type = 'login', role = 'customer' }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        farmName: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, login } = useContext(AuthContext);
    
    const isRegister = type === 'register';
    const isFarmer = role === 'farmer';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            let response;

            if (isRegister) {
                // Sending registration data to the backend
                response = await register(formData, role);
                setSuccess('Registration successful!, You can now log in');

                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                // Sending Login data to backend
                response = await login(formData, role);
                setSuccess('Login successful!');
                // Redirect user after login based on role
                if (response.user.role === 'farmer') {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/browse';
                }
            }
        } catch (error) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>
                        {isRegister
                        ? isFarmer ? 'Create Farmer Account' : 'Create Customer Account'
                        : isFarmer ? 'Farmer Login' : 'Customer Login'}
                    </h1>
                    <p>
                        {isRegister
                        ? 'Join our direct farm-to-table community'
                        : isFarmer
                        ? 'Access your farm dashboard, manage produce & orders'
                        : 'Login to browse fresh produce & connect with farmers'}
                    </p>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit} className='auth-form'>
                    {isRegister && (
                        <>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" 
                                    id='name'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder='Ellen Smith'
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" 
                                    id='phone'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder='+233 54 123 4567'
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" 
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='ellensmith@something.com'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" 
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='********'
                            required
                        />
                    </div>

                    {isFarmer && isRegister && (
                        <div className="form-group">
                            <label htmlFor="farmName">Farm Name (optional)</label>
                            <input type="text" 
                                id='farmName'
                                name='farmName'
                                value={formData.farmName}
                                onChange={handleChange}
                                placeholder='Sunshine Farm'
                            />
                        </div>
                    )}

                    <button type='submit' className='btn btn-primary btn-full' disabled={loading}>
                        {loading
                            ? 'Please wait...'
                            : isRegister
                            ? 'Create Account'
                            : 'Log In'}
                    </button>
                </form>

                <div className="auth-footer">
                    {isRegister ? (
                        <p>
                            Already have an account? <a href='/login'>Log In</a>
                        </p>
                    ) : (
                        <p>
                            Don't have an account? <a href='/select-role'>Sign Up</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}