import {
    Box,
    Typography,
    Grid2 as Grid,
    Paper,
    Breadcrumbs,
    Link,
    Stack,
} from '@mui/material';
import { ChevronRight, ArrowUpRight, Activity, Users as UsersIcon, Database, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../hooks/useDashboard';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { useGetStats } = useDashboard();
    const { data: counts } = useGetStats();

    const stats = [
        { title: 'Total Users', value: counts?.users?.toLocaleString() || '0', icon: <UsersIcon size={24} />, color: '#6366f1' },
        { title: 'Meal Analyses', value: counts?.meals?.toLocaleString() || '0', icon: <Activity size={24} />, color: '#10b981' },
        { title: 'Diet Logs', value: counts?.diets?.toLocaleString() || '0', icon: <Database size={24} />, color: '#f59e0b' },
        { title: 'Water Logs', value: counts?.water?.toLocaleString() || '0', icon: <Zap size={24} />, color: '#3b82f6' },
    ];

    const categories = [
        {
            title: 'Analysis Logs',
            subtitle: 'Monitor and manage system health data',
            items: [
                { name: 'Meal Analyses', path: '/logs/meal', desc: 'Detailed nutritional feedback' },
                { name: 'Required Diet Logs', path: '/logs/diet', desc: 'Prescribed user dietary plans' },
                { name: 'Water Intake Logs', path: '/logs/water', desc: 'Hydration measurement tracking' },
            ]
        },
        {
            title: 'System Administration',
            subtitle: 'Manage platform users and permissions',
            items: [
                { name: 'User Management', path: '/users', desc: 'View or delete platform users' },
            ]
        }
    ];

    return (
        <Box>
            <Box sx={{ mb: 5 }}>
                <Breadcrumbs separator={<ChevronRight size={14} />} sx={{ mb: 1.5 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        onClick={(e) => { e.preventDefault(); navigate('/'); }}
                        sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', cursor: 'pointer' }}
                    >
                        Home
                    </Link>
                    <Typography color="primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Dashboard</Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 800 }}>
                    Welcome back, {user?.username || 'Shine'}!
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
                    Here's what's happening with your platform today.
                </Typography>
            </Box>

            {/* Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 6 }}>
                {stats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: 4,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'translateY(-4px)' }
                            }}
                        >
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: 3,
                                    bgcolor: `${stat.color}15`,
                                    color: stat.color
                                }}
                            >
                                {stat.icon}
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h5" sx={{ color: '#1e293b', fontWeight: 700 }}>
                                    {stat.value}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Categories sections */}
            <Grid container spacing={4}>
                {categories.map((category) => (
                    <Grid size={{ xs: 12, md: 6 }} key={category.title}>
                        <Box sx={{ mb: 1.5, px: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                {category.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                {category.subtitle}
                            </Typography>
                        </Box>
                        <Stack spacing={2}>
                            {category.items.map((item) => (
                                <Paper
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    sx={{
                                        p: 2.5,
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        border: '1px solid #f1f5f9',
                                        '&:hover': {
                                            borderColor: '#6366f1',
                                            bgcolor: '#f5f3ff',
                                            '& .arrow-icon': { color: '#6366f1', transform: 'translate(2px, -2px)' }
                                        }
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                    <ArrowUpRight
                                        className="arrow-icon"
                                        size={20}
                                        style={{ color: '#cbd5e0', transition: 'all 0.2s' }}
                                    />
                                </Paper>
                            ))}
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
