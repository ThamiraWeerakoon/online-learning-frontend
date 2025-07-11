import React, { useState } from 'react';
import api from '../utils/api';

// Form for instructors to create new courses
function CreateCourse() {
    const [formData, setFormData] = useState({ title: '', description: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/courses', formData);
        alert('Course Created');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <input type="text" placeholder="Description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <button type="submit">Create</button>
        </form>
    );
}

export default CreateCourse;
