import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography, CardActions, Button } from '@mui/material';

function CourseCard({ course, onDelete, onEdit, isAdmin }) { // Add isAdmin prop
    const navigate = useNavigate();

    const handleNavigateToDetail = () => {
        navigate(`/courses/${course._id}`);
    };

    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardActionArea onClick={handleNavigateToDetail}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {course.courseName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {course.courseCode}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {isAdmin && ( // Only show actions for admin users
                <CardActions>
                    <Button size="small" color="primary" onClick={() => onEdit(course._id)}>
                        Edit
                    </Button>
                    <Button size="small" color="secondary" onClick={() => onDelete(course._id)}>
                        Delete
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}

export default CourseCard;