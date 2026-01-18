import AuthForm from '../components/AuthForm';

export default function Register() {
    const handleRegister = (data) => {
        console.log('Registration data:', data);
        // TODO: send to backend
        alert('Registration submitted! (demo)');
    };

    return (
        <AuthForm 
            type="register" 
            // role="farmer" or "customer" - can come from previous page
            onSubmit={handleRegister} 
        />
    );
}