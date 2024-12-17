// src/components/LibraryPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { userRole } = useAuth();
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get('http://localhost:8000/api/library', config);
        setBooks(response.data);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};


  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
        try {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.delete(`http://localhost:8000/api/library/${id}`, config);
            fetchBooks(); // Refresh the list
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3, pt: '80px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Library
        </Typography>
        {userRole === 'admin' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/library/add')}
            sx={{ bgcolor: '#007bff' }}
          >
            Add Book
          </Button>
        )}
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search books by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {book.description?.substring(0, 150)}...
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  ISBN: {book.isbn}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  Published: {book.publishedYear}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Typography 
                    color={book.available ? 'success.main' : 'error.main'}
                    variant="body2"
                  >
                    {book.available ? 'Available' : 'Not Available'}
                  </Typography>
                  {userRole === 'admin' && (
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => navigate(`/library/edit/${book._id}`)}
                        sx={{ color: '#007bff' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(book._id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LibraryPage;