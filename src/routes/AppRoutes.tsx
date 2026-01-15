import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import UsersPage from '../pages/Users/UsersPage';
import UserDetail from '../pages/Users/UserDetail';
import LogsPage from '../pages/Logs/LogsPage';
import LogDetail from '../pages/Logs/LogDetail';
import LoginPage from '../pages/Login/LoginPage';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const NotFound = () => (
    <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>404 - Page Not Found</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>The page you are looking for doesn't exist.</Typography>
        <Button variant="contained" href="/">Go Home</Button>
    </Box>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="users/:id" element={<UserDetail />} />
                <Route path="logs/:type" element={<LogsPage />} />
                <Route path="logs/:type/:id" element={<LogDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
