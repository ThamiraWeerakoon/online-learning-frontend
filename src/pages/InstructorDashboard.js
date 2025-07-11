import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function InstructorDashboard() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', content: '' });
    const [editingCourse, setEditingCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        api.get('/courses/instructor').then(res => setCourses(res.data));
    };

    const createCourse = async (e) => {
        e.preventDefault();
        await api.post('/courses', form);
        setForm({ title: '', description: '', content: '' });
        fetchCourses();
    };

    const viewStudents = (id) => {
        api.get(`/courses/${id}/students`).then(res => {
            setSelected(id);
            setStudents(res.data);
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const startEditing = (course) => {
        setEditingCourse(course._id);
        setForm({ title: course.title, description: course.description, content: course.content || '' });
    };

    const saveChanges = async (id) => {
        await api.put(`/courses/${id}`, form);
        setEditingCourse(null);
        setForm({ title: '', description: '', content: '' });
        fetchCourses();
    };

    const cancelEdit = () => {
        setEditingCourse(null);
        setForm({ title: '', description: '', content: '' });
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>🧑‍🏫 Instructor Dashboard</h2>
                <button onClick={logout} style={styles.logout}>Logout</button>

                {/* Create Course */}
                <section>
                    <h3 style={styles.sectionTitle}>Create New Course</h3>
                    <form onSubmit={createCourse} style={styles.form}>
                        <input
                            placeholder="Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            style={styles.input}
                            required
                        />
                        <input
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            style={styles.input}
                            required
                        />
                        <textarea
                            placeholder="Course Content"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            style={styles.textarea}
                            rows={4}
                        />
                        <button type="submit" style={styles.button}>Create</button>
                    </form>
                </section>

                {/* My Courses */}
                <section>
                    <h3 style={styles.sectionTitle}>My Courses</h3>
                    {courses.map(course => (
                        <div key={course._id} style={styles.item}>
                            {editingCourse === course._id ? (
                                <>
                                    <input
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        style={styles.input}
                                    />
                                    <input
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        style={styles.input}
                                    />
                                    <textarea
                                        value={form.content}
                                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                                        style={styles.textarea}
                                        rows={4}
                                    />
                                    <button onClick={() => saveChanges(course._id)} style={styles.button}>Save</button>
                                    <button onClick={cancelEdit} style={styles.cancelButton}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <strong>{course.title}</strong>
                                    <p>{course.description}</p>
                                    <p style={{ whiteSpace: 'pre-wrap' }}>{course.content}</p>
                                    <button onClick={() => viewStudents(course._id)} style={styles.button}>View Students</button>
                                    <button onClick={() => startEditing(course)} style={styles.editButton}>Edit</button>
                                </>
                            )}
                        </div>
                    ))}
                </section>

                {/* Enrolled Students */}
                {selected && (
                    <section>
                        <h4 style={styles.sectionTitle}>Enrolled Students</h4>
                        <table style={styles.table}>
                            <thead>
                            <tr><th>Username</th></tr>
                            </thead>
                            <tbody>
                            {students.map(s => (
                                <tr key={s._id}><td>{s.username}</td></tr>
                            ))}
                            </tbody>
                        </table>
                    </section>
                )}
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '10px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    textarea: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        resize: 'vertical',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#667eea',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    cancelButton: {
        padding: '10px 15px',
        backgroundColor: '#aaa',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    editButton: {
        marginLeft: '10px',
        padding: '10px 15px',
        backgroundColor: '#f0ad4e',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    table: {
        marginTop: '10px',
        width: '100%',
        borderCollapse: 'collapse',
    },
};

export default InstructorDashboard;