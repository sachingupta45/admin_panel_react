import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Alert,
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// authService is now handled via useAuth context
// import { authService } from '../../services/auth.service';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (email && password) {
                await login({ username: email, password });
                navigate('/');
            } else {
                setError('Please fill in all fields');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                p: 3
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    p: { xs: 4, md: 6 },
                    borderRadius: 6,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
                }}
            >
                {/* Logo Section */}
                <Box sx={{ mb: 5, textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mb: 2,
                            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
                        }}
                    >
                        <Crown size={32} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-1px' }}>
                        Cricket MP Admin
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mt: 1, fontWeight: 500 }}>
                        Welcome back! Please enter your details.
                    </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

                <form onSubmit={handleLogin}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mail size={20} color="#94a3b8" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock size={20} color="#94a3b8" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.8,
                                mt: 1,
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 700,
                                fontSize: '1rem',
                                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.25)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                                    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.35)',
                                }
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Box>
                </form>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
                        Powered by ShineDezign
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
