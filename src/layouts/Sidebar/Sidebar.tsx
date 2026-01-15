
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import {
    LayoutDashboard,
    Utensils,
    ClipboardList,
    Droplets,
    Users as UsersIcon,
    Crown
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <LayoutDashboard size={22} />,
            path: '/'
        },
        {
            text: 'Analysis Logs',
            isHeader: true,
            items: [
                { text: 'Meal Analyses', icon: <Utensils size={20} />, path: '/logs/meal' },
                { text: 'Required Diet Logs', icon: <ClipboardList size={20} />, path: '/logs/diet' },
                { text: 'Water Intake Logs', icon: <Droplets size={20} />, path: '/logs/water' },
            ]
        },
        {
            text: 'Administration',
            isHeader: true,
            items: [
                { text: 'Users', icon: <UsersIcon size={20} />, path: '/users' },
            ]
        }
    ];

    const isActive = (path?: string) => path ? location.pathname === path : false;

    return (
        <Box
            sx={{
                width: 280,
                height: '100vh',
                bgcolor: '#ffffff',
                borderRight: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1200,
            }}
        >
            {/* Brand */}
            <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                    }}
                >
                    <Crown size={24} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px' }}>
                    Nexus Admin
                </Typography>
            </Box>

            {/* Navigation */}
            <List sx={{ px: 2, flex: 1, overflowY: 'auto' }}>
                {menuItems.map((item, index) => {
                    if (item.isHeader) {
                        return (
                            <Box key={index} sx={{ mt: 3, mb: 1 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        px: 2,
                                        color: '#94a3b8',
                                        textTransform: 'uppercase',
                                        fontWeight: 700,
                                        fontSize: '0.7rem',
                                        letterSpacing: '0.1em'
                                    }}
                                >
                                    {item.text}
                                </Typography>
                                <List disablePadding>
                                    {item.items?.map((subItem) => (
                                        <ListItem key={subItem.path} disablePadding sx={{ mt: 0.5 }}>
                                            <ListItemButton
                                                onClick={() => navigate(subItem.path)}
                                                sx={{
                                                    borderRadius: '10px',
                                                    color: isActive(subItem.path) ? '#4f46e5' : '#64748b',
                                                    bgcolor: isActive(subItem.path) ? '#f5f3ff' : 'transparent',
                                                    '&:hover': {
                                                        bgcolor: isActive(subItem.path) ? '#f5f3ff' : '#f8fafc',
                                                        color: isActive(subItem.path) ? '#4f46e5' : '#1e293b',
                                                    },
                                                    py: 1.25,
                                                }}
                                            >
                                                <ListItemIcon sx={{
                                                    color: isActive(subItem.path) ? '#4f46e5' : '#94a3b8',
                                                    minWidth: 38
                                                }}>
                                                    {subItem.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={subItem.text}
                                                    primaryTypographyProps={{
                                                        fontSize: '0.875rem',
                                                        fontWeight: isActive(subItem.path) ? 700 : 500
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        );
                    }

                    return (
                        <ListItem key={item.path} disablePadding sx={{ mt: 1 }}>
                            <ListItemButton
                                onClick={() => item.path && navigate(item.path)}
                                sx={{
                                    borderRadius: '10px',
                                    color: isActive(item.path) ? '#4f46e5' : '#64748b',
                                    bgcolor: isActive(item.path) ? '#f5f3ff' : 'transparent',
                                    '&:hover': {
                                        bgcolor: isActive(item.path) ? '#f5f3ff' : '#f8fafc',
                                        color: isActive(item.path) ? '#4f46e5' : '#1e293b',
                                    },
                                    py: 1.5,
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: isActive(item.path) ? '#4f46e5' : '#94a3b8',
                                    minWidth: 40
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontSize: '0.925rem',
                                        fontWeight: isActive(item.path) ? 700 : 600
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default Sidebar;
