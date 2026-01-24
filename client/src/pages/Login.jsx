// src/pages/Login.jsx
import AuthForm from '../components/AuthForm';

export default function Login() {
    const handleLogin = (data) => {
        console.log('Login attempt:', data);
        // TODO: send to backend
        alert('Login submitted! (demo)');
    };

    return (
        <AuthForm 
            type="login" 
            // You can pass role from URL/query later
            // role="farmer" or "customer"
            onSubmit={handleLogin} 
        />
    );
}