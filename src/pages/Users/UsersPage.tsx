import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DataTable from '../../components/DataTable';
import { Box, CircularProgress } from '@mui/material';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { useUsers } from '../../hooks/useUsers';

const UsersPage = () => {
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const { useGetUsers, useDeleteUser } = useUsers();
    const { data: rows, isLoading } = useGetUsers();
    const deleteMutation = useDeleteUser();

    const columns = [
        { id: 'username', label: 'User', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 200 },
        { id: 'role', label: 'Role', minWidth: 130 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'created_at', label: 'Joined', minWidth: 130 },
    ];

    const handleDelete = (id: number) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = async () => {
        if (deleteId === null) return;
        try {
            await deleteMutation.mutateAsync(deleteId);
            setDeleteId(null);
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleView = (id: any) => {
        navigate(`/users/${id}`);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <DataTable
                title="User Management"
                columns={columns}
                rows={rows || []}
                onDelete={handleDelete}
                onView={handleView}
                searchPlaceholder="Search users by name, email or role..."
            />
            <DeleteConfirmModal
                open={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                description="Are you sure you want to delete this user? This action cannot be undone."
                isLoading={deleteMutation.isPending}
            />
        </Box>
    );
};

export default UsersPage;
