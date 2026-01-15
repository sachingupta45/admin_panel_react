import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    ml: '280px', // Matches Sidebar width
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(100% - 280px)'
                }}
            >
                <Header />
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
                    © 2026 Cricket Fitness Ltd. Crafted with passion for high performance.
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
