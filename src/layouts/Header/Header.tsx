import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Link,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon
} from '@mui/material';
import { Menu as MenuIcon, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
    };

    // Simple breadcrumb logic
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: 'white',
                borderBottom: '1px solid #e2e8f0',
                width: '100%'
            }}
        >
            <Toolbar sx={{ minHeight: 64, px: { xs: 2, sm: 4 } }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onMenuClick}
                    sx={{ color: '#2d3748', mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon size={20} />
                </IconButton>

                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexGrow: 1 }}>
                    <Link
                        href="/"
                        underline="none"
                        sx={{
                            color: '#718096',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            '&:hover': { color: '#4f46e5' }
                        }}
                    >
                        Home
                    </Link>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        return (
                            <React.Fragment key={name}>
                                <Typography sx={{ color: '#cbd5e0', fontSize: '0.875rem' }}>/</Typography>
                                <Link
                                    href={routeTo}
                                    underline="none"
                                    sx={{
                                        color: isLast ? '#1e293b' : '#718096',
                                        fontSize: '0.875rem',
                                        fontWeight: isLast ? 700 : 500,
                                        textTransform: 'capitalize',
                                        pointerEvents: isLast ? 'none' : 'auto',
                                        '&:hover': { color: '#4f46e5' }
                                    }}
                                >
                                    {name.replace(/-/g, ' ')}
                                </Link>
                            </React.Fragment>
                        );
                    })}
                </Box>

                {/* User Section */}
                <Box
                    onClick={handleMenuOpen}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        cursor: 'pointer',
                        p: 0.75,
                        px: 1.5,
                        borderRadius: 3,
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: '#f8fafc' }
                    }}
                >
                    <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                            {user?.username || 'Admin'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
                            {user?.role || 'Administrator'}
                        </Typography>
                    </Box>
                    <Avatar
                        src={user?.photo || "https://api.dicebear.com/7.x/avataaars/svg?seed=Shine"}
                        sx={{
                            width: 38,
                            height: 38,
                            border: '2px solid #f1f5f9',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                    >
                        <User size={20} />
                    </Avatar>
                    <ChevronDown size={16} color="#94a3b8" />
                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    disableScrollLock
                    PaperProps={{
                        sx: {
                            mt: 1.5,
                            minWidth: 180,
                            borderRadius: 3,
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                            border: '1px solid #f1f5f9',
                            p: 1
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box sx={{ px: 2, py: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            {user?.username}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                            {user?.email}
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 1, borderColor: '#f1f5f9' }} />
                    <MenuItem
                        onClick={handleLogout}
                        sx={{
                            borderRadius: 2,
                            color: '#ef4444',
                            fontWeight: 600,
                            '&:hover': { bgcolor: '#fef2f2' }
                        }}
                    >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
                            <LogOut size={18} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
