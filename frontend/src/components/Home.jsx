import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid,
  Card,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Book, School, Group } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { username } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'black',
        py: { xs: 8, md: 12 },
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white',
              fontWeight: 500,
              fontSize: { xs: '2rem', md: '3.5rem' },
              mb: 2
            }}
          >
            Your Gateway to
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              color: '#F4B41A',
              fontWeight: 500,
              fontSize: { xs: '2rem', md: '3.5rem' },
              mb: 4
            }}
          >
            Knowledge and Learning
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#ffffff80',
              mb: 6,
              mx: 'auto',
              maxWidth: 'sm'
            }}
          >
            Access a vast collection of educational resources, courses, and library materials. 
          </Typography>
          <Button 
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ 
              bgcolor: '#F4B41A',
              '&:hover': { bgcolor: '#d49b15' },
              px: 6,
              py: 1.5
            }}
          >
            GET STARTED
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              fontWeight: 500,
              mb: 1
            }}
          >
            Everything You Need
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: 'text.secondary',
              mb: 8,
              maxWidth: 'sm',
              mx: 'auto'
            }}
          >
            A comprehensive platform combining library resources and course management
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <Book sx={{ fontSize: 40 }} />,
                title: 'Digital Library',
                description: 'Access thousands of digital resources including books, journals, and research papers.'
              },
              {
                icon: <School sx={{ fontSize: 40 }} />,
                title: 'Online Courses',
                description: 'Enroll in various courses and earn certificates from CAMS.'
              },
              {
                icon: <Group sx={{ fontSize: 40 }} />,
                title: 'Community Learning',
                description: 'Connect with peers and educators in a collaborative learning environment.'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%',
                    p: 3,
                    borderRadius: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 1
                    }
                  }}
                >
                  <Box sx={{ color: '#F4B41A', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ fontWeight: 500 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;