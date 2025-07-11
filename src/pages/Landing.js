import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h1 style={styles.title}>🚀 Online Learning Platform</h1>
                <p style={styles.subtitle}>Empower your future with the right course.</p>
                <div style={styles.buttons}>
                    <button style={styles.buttonPrimary} onClick={() => navigate('/login')}>Login</button>
                    <button style={styles.buttonSecondary} onClick={() => navigate('/register')}>Register</button>
                </div>
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
        maxWidth: '450px',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    },
    title: {
        fontSize: '2rem',
        marginBottom: '10px',
        color: '#333',
    },
    subtitle: {
        fontSize: '1rem',
        marginBottom: '30px',
        color: '#666',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
    },
    buttonPrimary: {
        flex: 1,
        padding: '12px',
        fontSize: '1rem',
        backgroundColor: '#667eea',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    buttonSecondary: {
        flex: 1,
        padding: '12px',
        fontSize: '1rem',
        backgroundColor: '#764ba2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
};

export default Landing;
