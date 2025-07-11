import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import CourseList from './pages/CourseList';
import EnrolledCourses from './pages/EnrolledCourses';
import CreateCourse from './pages/CreateCourse';
import Chat from './pages/Chat';
import Landing from './pages/Landing';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Main App component containing route declarations
function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/enrolled" element={<EnrolledCourses />} />
            <Route path="/create" element={<CreateCourse />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<h2>Page not found</h2>} />
        </Routes>
    );
}

export default App;