import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const drawerWidth = 280;

const MainLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
            <Box
                sx={{
                    flexGrow: 1,
                    ml: { sm: `${drawerWidth}px` },
                    display: 'flex',
                    flexDirection: 'column',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    minWidth: 0 // Prevents flex child from overflowing
                }}
            >
                <Header onMenuClick={handleDrawerToggle} />
                <Box
                    component="main"
                    sx={{
                        p: { xs: 3, md: 5 },
                        flexGrow: 1,
                        maxWidth: '1400px',
                        width: '100%',
                        mx: 'auto'
                    }}
                >
                    <Outlet />
                </Box>
                {/* Footer */}
                <Box
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        color: '#94a3b8',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        borderTop: '1px solid #f1f5f9'
                    }}
                >
                    © copyright {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
