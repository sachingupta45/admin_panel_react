import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    open,
    onClose,
    onConfirm,
    title = "Delete Record",
    description = "Are you sure you want to delete this record? This action cannot be undone.",
    isLoading = false
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    width: '100%',
                    maxWidth: 400,
                    p: 1
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#fef2f2',
                        color: '#ef4444',
                        p: 1,
                        borderRadius: 2
                    }}>
                        <AlertTriangle size={20} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>
                        {title}
                    </Typography>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: '#94a3b8' }}>
                    <X size={20} />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Typography sx={{ color: '#64748b', fontWeight: 500 }}>
                    {description}
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button
                    onClick={onClose}
                    disabled={isLoading}
                    sx={{
                        flex: 1,
                        fontWeight: 700,
                        color: '#64748b',
                        bgcolor: '#f1f5f9',
                        '&:hover': { bgcolor: '#e2e8f0' }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                        flex: 1,
                        fontWeight: 700,
                        bgcolor: '#ef4444',
                        '&:hover': { bgcolor: '#dc2626' }
                    }}
                >
                    {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmModal;
