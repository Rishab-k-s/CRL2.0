// src/components/BookForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    isbn: '',
    publishedYear: '',
    category: '',
    available: true
  });

  const fetchBook = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      // Fetch specific book by ID
      const response = await axios.get(`http://localhost:8000/api/library/${id}`, config);
      // Set form data with the fetched book data
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBook(); // Call fetchBook instead of fetchBooks
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token'); // Retrieve token

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        if (id) {
            // Update existing book
            await axios.put(`http://localhost:8000/api/library/${id}`, formData, config);
        } else {
            // Add new book
            await axios.post('http://localhost:8000/api/library', formData, config);
        }

        navigate('/library'); // Redirect to library page
    } catch (error) {
        console.error('Error saving book:', error);
    }
  };

  return (
    <Box sx={{ p: 3, pt: '80px' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Edit Book' : 'Add New Book'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="ISBN"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Published Year"
            name="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            margin="normal"
            type="number"
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.available}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  available: e.target.checked
                }))}
                name="available"
              />
            }
            label="Available"
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: '#007bff' }}
            >
              {id ? 'Update' : 'Add'} Book
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/library')}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookForm;