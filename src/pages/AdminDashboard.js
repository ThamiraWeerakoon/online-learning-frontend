import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/auth/users'); // secure endpoint
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            setMessage('❌ Access denied');
        }
    };

    const createInstructor = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/create-instructor', form);
            setMessage('✅ Instructor created successfully');
            setForm({ username: '', password: '' });
            fetchUsers();
        } catch (err) {
            setMessage('❌ Error creating instructor');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>👑 Admin Dashboard</h2>
                <button onClick={logout} style={styles.logout}>Logout</button>

                <section>
                    <h3>Create Instructor</h3>
                    <form onSubmit={createInstructor} style={styles.form}>
                        <input
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                            style={styles.input}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>Create</button>
                    </form>
                </section>

                <section>
                    <h3>All Users</h3>
                    <table style={styles.table}>
                        <thead>
                        <tr><th>Username</th><th>Role</th></tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>

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
        alignItems: 'flex-start',
        padding: '40px 20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    },
    title: {
        fontSize: '1.8rem',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
    },
    logout: {
        float: 'right',
        backgroundColor: '#ff6666',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 12px',
        cursor: 'pointer',
        marginTop: '-40px',
    },
    form: {
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        flexWrap: 'wrap',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        flex: 1,
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#667eea',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    message: {
        marginTop: '10px',
        color: '#444',
    }
};

export default AdminDashboard;