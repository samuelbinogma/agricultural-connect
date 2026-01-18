import { useState } from 'react';

export default function AuthForm({ type = 'login', role = 'customer', onSubmit}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
    });
    
    const isRegister = type === 'register';
    const isFarmer = role === 'farmer';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const title = isRegister
        ? (isFarmer ? 'Create Farmer Account' : 'Create Customer Account')
        : (isFarmer ? 'Farmer Login' : 'Customer Login');

    const subtitle = isRegister 
        ? 'Join our direct farm-to-table community'
        : 'Welcome back! Login to continue';

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>

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
                        <div className="formgroup">
                            <label htmlFor="farmName">Farm Name (optional)</label>
                            <input type="text" 
                                id='farmName'
                                name='farmName'
                                placeholder='Sunshine Farm'
                            />
                        </div>
                    )}

                    <button type='submit' className='btn btn-primary btn-full'>
                        {isRegister ? 'Create Acoount' : 'Log In'}
                    </button>
                </form>

                <div className="auth-footer">
                    {isRegister ? (
                        <p>
                            Already have an account? <a href='/login'>Log In</a>
                        </p>
                    ) : (
                        <p>
                            Don't have an account? <a href='/register'>Sign Up</a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}