import React, { useState, useEffect } from 'react';
import axiosWithAuth from './axiosWithAuth';
import CourseCard from './CourseCard';
import { Grid, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Add this import

function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const { userRole } = useAuth(); // Get user role from auth context
    const isAdmin = userRole === 'admin'; // Check if user is admin

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosWithAuth.get('/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleCreate = () => {
        navigate('/courses/create');
    };

    const handleEdit = (courseId) => {
        navigate(`/courses/edit/${courseId}`);
    };

    const handleDelete = async (courseId) => {
        try {
            await axiosWithAuth.delete(`/courses/${courseId}`);
            setCourses(courses.filter(course => course._id !== courseId));
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, m: 3, pt: '64px' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Course Management
            </Typography>
            {isAdmin && ( // Only show Add New Course button to admin
                <Button onClick={handleCreate} color="primary" variant="contained" sx={{ mb: 2 }}>
                    Add New Course
                </Button>
            )}
            <Grid container spacing={2}>
                {courses.map(course => (
                    <Grid item key={course._id} xs={12} sm={6} md={4}>
                        <CourseCard 
                            course={course} 
                            onDelete={isAdmin ? () => handleDelete(course._id) : null} 
                            onEdit={isAdmin ? () => handleEdit(course._id) : null}
                            isAdmin={isAdmin} // Pass isAdmin prop to CourseCard
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default CoursesPage;