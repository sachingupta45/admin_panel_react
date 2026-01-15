import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    Breadcrumbs,
    Link,
} from '@mui/material';
import { ChevronLeft, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from './DeleteConfirmModal';

interface DetailViewContainerProps {
    title: string;
    subtitle?: string;
    onDelete: () => void;
    children: React.ReactNode;
    breadcrumbs: { label: string; path?: string }[];
    deleteModalTitle?: string;
    deleteModalDescription?: string;
    isDeleting?: boolean;
}

const DetailViewContainer: React.FC<DetailViewContainerProps> = ({
    title,
    subtitle,
    onDelete,
    children,
    breadcrumbs,
    deleteModalTitle = "Delete Entry",
    deleteModalDescription = "Are you sure you want to delete this specific entry? This action cannot be undone.",
    isDeleting = false
}) => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        setIsDeleteModalOpen(false);
        onDelete();
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Breadcrumbs separator={<ChevronRight size={14} />} sx={{ mb: 2 }}>
                    {breadcrumbs.map((bc, idx) => (
                        bc.path ? (
                            <Link
                                key={idx}
                                underline="hover"
                                color="inherit"
                                onClick={() => navigate(bc.path!)}
                                sx={{ cursor: 'pointer', fontSize: '0.875rem' }}
                            >
                                {bc.label}
                            </Link>
                        ) : (
                            <Typography key={idx} color="primary" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                                {bc.label}
                            </Typography>
                        )
                    ))}
                </Breadcrumbs>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Button
                            startIcon={<ChevronLeft size={18} />}
                            onClick={() => navigate(-1)}
                            sx={{ color: '#64748b', mb: 1, p: 0, '&:hover': { background: 'none', color: '#1e293b' } }}
                        >
                            Back to list
                        </Button>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Trash2 size={18} />}
                        onClick={() => setIsDeleteModalOpen(true)}
                        sx={{
                            borderRadius: 3,
                            borderWidth: 2,
                            '&:hover': { borderWidth: 2, bgcolor: '#fef2f2' }
                        }}
                    >
                        Delete Entry
                    </Button>
                </Box>
            </Box>

            <Paper sx={{ p: 4, borderRadius: 4, border: '1px solid #f1f5f9' }}>
                {children}
            </Paper>

            <DeleteConfirmModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title={deleteModalTitle}
                description={deleteModalDescription}
                isLoading={isDeleting}
            />
        </Box>
    );
};

export default DetailViewContainer;
