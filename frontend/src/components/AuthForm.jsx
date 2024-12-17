import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Box, 
  FormControl, 
  Select, 
  MenuItem,
  Link,
  InputLabel
} from '@mui/material';
import { School } from '@mui/icons-material';
import purdueLogo from '../assets/download.png';

function AuthForm() {
    const { user } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'instructor'
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const toggleAuthMode = (e) => {
        e.preventDefault();  // Prevent form submission
        setIsLogin(!isLogin);
    };

    useEffect(() => {
        if (user) {
            navigate('/courses');
        }
    }, [user, navigate]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted:', formData);  // Debug log
        
        const endpoint = isLogin ? 'login' : 'signup';
        try {
            const response = await axios.post(`http://localhost:8000/api/users/${endpoint}`, formData);
            console.log('Response:', response.data);  // Debug log
            
            login(response.data.token, response.data.role, response.data.username);
            navigate('/courses');
        } catch (error) {
            console.error('Authentication failed:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred during authentication');
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5'
            }}
        >
            <Container maxWidth="sm">
                <Box
                    sx={{
                        bgcolor: 'white',
                        borderRadius: 2,
                        p: 4,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                        textAlign: 'center'
                    }}
                >
                    <Box sx={{ mb: 4 }}>
                        <School sx={{ fontSize: 40, color: '#F4B41A', mb: 2 }} />
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 500,
                                mb: 1
                            }}
                        >
                            {isLogin ? 'Welcome Back' : 'Create your account'}
                        </Typography>
                        <Typography 
                            color="text.secondary"
                            sx={{ mb: 4 }}
                        >
                            {isLogin ? 'Sign in to access your account' : 'Join our learning community today'}
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        {!isLogin && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Name"
                                name="username"
                                autoComplete="username"
                                value={formData.username}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                                InputProps={{
                                    sx: { borderRadius: 1 }
                                }}
                            />
                        )}
                        
                        <FormControl fullWidth margin="normal">
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="instructor">Instructor</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                        </FormControl>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                            InputProps={{
                                sx: { borderRadius: 1 }
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                            InputProps={{
                                sx: { borderRadius: 1 }
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 3,
                                py: 1.5,
                                bgcolor: '#F4B41A',
                                '&:hover': { bgcolor: '#d49b15' },
                                borderRadius: 1,
                                textTransform: 'none'
                            }}
                        >
                            {isLogin ? 'Login' : 'Create Account'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography color="text.secondary">
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                                <Link
                                    component="span"  // Changed from "button" to "span"
                                    onClick={toggleAuthMode}
                                    sx={{ 
                                        color: '#F4B41A',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    {isLogin ? 'Create New Account' : 'Sign In'}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default AuthForm;