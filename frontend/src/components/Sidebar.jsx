// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const Sidebar = ({ open, onOpen, onClose }) => {
    const { isAuthenticated, logout, userRole } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        onClose();
    };

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 240,
                    bgcolor: '#f8f9fa',  // Light background
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
                }
            }}
        >
            <Box
                sx={{ width: 240 }}
                role="presentation"
                onClick={onClose}
                onKeyDown={onClose}
            >
                <Typography 
                    variant="h6" 
                    sx={{ 
                        my: 2, 
                        ml: 2,
                        color: '#F4B41A'  // Blue text for header
                    }}
                >
                    Menu
                </Typography>
                <List>
                    <ListItem 
                        button 
                        onClick={() => navigate('/')}
                        sx={{
                            '&:hover': {
                                bgcolor: 'rgba(0, 123, 255, 0.08)'  // Light blue hover
                            }
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon sx={{ color: '#F4B41A' }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Home" 
                            sx={{ 
                                '& .MuiTypography-root': { 
                                    color: '#212529'  // Dark text
                                }
                            }} 
                        />
                    </ListItem>
                    <ListItem 
                        button 
                        onClick={() => navigate('/courses')}
                        sx={{
                            '&:hover': {
                                bgcolor: 'rgba(0, 123, 255, 0.08)'
                            }
                        }}
                    >
                        <ListItemIcon>
                            <SchoolIcon sx={{ color: '#F4B41A' }} />
                        </ListItemIcon>
                        <ListItemText 
                            primary="Courses" 
                            sx={{ 
                                '& .MuiTypography-root': { 
                                    color: '#212529' 
                                }
                            }} 
                        />
                    </ListItem>
                    {userRole === 'admin' && (
                        <ListItem 
                            button 
                            onClick={() => navigate('/users')}
                            sx={{
                                '&:hover': {
                                    bgcolor: 'rgba(0, 123, 255, 0.08)'
                                }
                            }}
                        >
                            <ListItemIcon>
                                <MenuIcon sx={{ color: '#F4B41A' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Users" 
                                sx={{ 
                                    '& .MuiTypography-root': { 
                                        color: '#212529' 
                                    }
                                }} 
                            />
                        </ListItem>
                    )}
                    <ListItem button onClick={() => navigate('/library')}>
                        <ListItemIcon>
                            <LocalLibraryIcon sx={{ color: '#F4B41A' }} />
                        </ListItemIcon>
                        <ListItemText primary="Library" />
                    </ListItem>
                    {isAuthenticated && (
                        <ListItem 
                            button 
                            onClick={handleLogout}
                            sx={{
                                '&:hover': {
                                    bgcolor: 'rgba(0, 123, 255, 0.08)'
                                }
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon sx={{ color: '#F4B41A' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Logout" 
                                sx={{ 
                                    '& .MuiTypography-root': { 
                                        color: '#212529' 
                                    }
                                }} 
                            />
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
