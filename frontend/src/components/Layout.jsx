// src/components/Layout.jsx
import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ handleDrawerOpen }) => {
  const { username } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ bgcolor: 'black', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 'lg', width: '100%', mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}  // Updated to use prop
                    edge="start"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon sx={{ color: '#F4B41A' }} />
                </IconButton>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        color: '#F4B41A',
                        fontWeight: 500
                    }}
                >
                    CAMS Resource Library
                </Typography>
            </Box>
            <Box>
                {username ? (
                    <Typography sx={{ color: '#F4B41A' }}>Hi, {username}</Typography>
                ) : (
                    <Box>
                        <Button 
                            color="inherit" 
                            onClick={() => navigate('/login')}
                            sx={{ mr: 1 }}
                        >
                            Login
                        </Button>
                        <Button 
                            variant="contained"
                            onClick={() => navigate('/login')}
                            sx={{ 
                                bgcolor: '#F4B41A',
                                '&:hover': { bgcolor: '#d49b15' }
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                )}
            </Box>
        </Toolbar>
    </AppBar>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;