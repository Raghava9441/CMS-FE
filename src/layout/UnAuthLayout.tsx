import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LoadingScreen from '../components/LoadingScreen';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import appRoutes from '../routes/routePaths';

function UnAuthLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(appRoutes.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  // Show loading screen while checking authentication status
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, show unauthenticated layout with outlet
  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          padding: '20px',
        }}
      >
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </>
  );
}

export default UnAuthLayout;