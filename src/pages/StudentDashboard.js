import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    const [enrolled, setEnrolled] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [reply, setReply] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        api.get('/courses').then(res => setCourses(res.data));
        api.get('/courses/enrolled').then(res => setEnrolled(res.data));
    };

    const enroll = async (id) => {
        try {
            await api.post(`/courses/${id}/enroll`);
            setSuccessMessage('✅ Successfully enrolled in the course!');
            fetchData();
            setTimeout(() => setSuccessMessage(''), 3000); // Hide after 3s
        } catch (err) {
            console.error(err);
            setSuccessMessage('❌ Enrollment failed.');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    const askGPT = async (e) => {
        e.preventDefault();
        const res = await api.post('/chat/recommend', { prompt });
        setReply(res.data.reply);
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>🎓 Student Dashboard</h2>
                <button onClick={logout} style={styles.logout}>Logout</button>

                {/* Success Message */}
                {successMessage && (
                    <div style={styles.successMessage}>
                        {successMessage}
                    </div>
                )}

                <section>
                    <h3 style={styles.sectionTitle}>Available Courses</h3>
                    {courses.map(course => (
                        <div key={course._id} style={styles.item}>
                            <strong>{course.title}</strong>
                            <p>{course.description}</p>
                            <p><em>{course.content}</em></p> {/* Show content */}
                            <button onClick={() => enroll(course._id)} style={styles.button}>Enroll</button>
                        </div>
                    ))}
                </section>

                <section>
                    <h3 style={styles.sectionTitle}>My Enrolled Courses</h3>
                    {enrolled.map(course => (
                        <div key={course._id} style={styles.item}>
                            <strong>{course.title}</strong>
                            <p>{course.description}</p>
                            <p><em>{course.content}</em></p> {/* Show content */}
                        </div>
                    ))}
                </section>

                <section>
                    <h3 style={styles.sectionTitle}>Ask ChatGPT for Suggestions</h3>
                    <form onSubmit={askGPT} style={styles.form}>
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g. I want to be a data scientist"
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>Ask</button>
                    </form>
                    {reply && <p><strong>GPT:</strong> {reply}</p>}
                </section>
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
        maxWidth: '900px',
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
    sectionTitle: {
        fontSize: '1.2rem',
        marginTop: '20px',
        color: '#444',
    },
    item: {
        border: '1px solid #eee',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '8px',
    },
    input: {
        padding: '10px',
        flex: 1,
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#667eea',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        marginLeft: '10px',
        cursor: 'pointer',
    },
    form: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px',
        flexWrap: 'wrap',
    },
    successMessage: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '12px 16px',
        borderRadius: '8px',
        marginBottom: '15px',
        border: '1px solid #c3e6cb',
        textAlign: 'center',
    },
};

export default StudentDashboard;