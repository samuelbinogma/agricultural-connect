import AuthForm from '../components/AuthForm';
import { useSearchParams } from 'react-router-dom';

export default function Register() {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'customer';

    const handleRegister = (data) => {
        console.log('Registration data:', {...data, role});
        // TODO: send to backend
        alert(`Registration as ${role} submitted! (demo)`);
    };

    return (
        <>

            <div style={{ textAlign: 'center', padding: '1rem', background: '#e8f5e9' }}>
                <span className="role-badge">
                    Registering as a {role === 'farmer' ? 'Farmer' : 'Customer'}
                </span>
            </div>
            <AuthForm 
                type="register" 
                role={role}
                onSubmit={handleRegister} 
            />
        </>
        
    );
}