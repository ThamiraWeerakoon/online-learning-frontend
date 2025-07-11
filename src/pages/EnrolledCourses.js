import React, { useEffect, useState } from 'react';
import api from '../utils/api';

// Shows courses user is enrolled in
function EnrolledCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get('/courses/enrolled').then((res) => setCourses(res.data));
    }, []);

    return (
        <div>
            <h2>My Enrolled Courses</h2>
            {courses.map((course) => (
                <div key={course._id}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                </div>
            ))}
        </div>
    );
}

export default EnrolledCourses;