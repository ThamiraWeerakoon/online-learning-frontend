import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await api.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            setMessage('✅ Logged in! Redirecting...');
            const user = JSON.parse(atob(res.data.token.split('.')[1]));
            const redirect = user.role === 'admin' ? '/admin' :
                user.role === 'instructor' ? '/instructor' : '/student';
            navigate(redirect);
        } catch (err) {
            setMessage('❌ Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: '100vh',
        background: 'linear-gradient(to right, #667eea, #764ba2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        padding: '40px 30px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    },
    title: {
        fontSize: '1.8rem',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px 15px',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '12px',
        fontSize: '1rem',
        backgroundColor: '#667eea',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    message: {
        marginTop: '15px',
        color: '#444',
    },
};

export default Login;
