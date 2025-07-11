import React, { useEffect, useState } from 'react';
import api from '../utils/api';

// Displays all available courses with enroll option
function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get('/courses').then((res) => setCourses(res.data));
    }, []);

    const enroll = (id) => {
        api.post(`/courses/${id}/enroll`).then(() => alert('Enrolled!'));
    };

    return (
        <div>
            <h2>Available Courses</h2>
            {courses.map((course) => (
                <div key={course._id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button onClick={() => enroll(course._id)}>Enroll</button>
                </div>
            ))}
        </div>
    );
}

export default CourseList;