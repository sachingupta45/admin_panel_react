import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DataTable from '../../components/DataTable';
import { Box, CircularProgress } from '@mui/material';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import { useMeals } from '../../hooks/useMeals';
import { useDiets } from '../../hooks/useDiets';
import { useWater } from '../../hooks/useWater';

const LogsPage = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { useGetMeals, useDeleteMeal } = useMeals();
    const { useGetDiets, useDeleteDiet } = useDiets();
    const { useGetWaterLogs, useDeleteWaterLog } = useWater();

    const mealsQuery = useGetMeals();
    const dietsQuery = useGetDiets();
    const waterQuery = useGetWaterLogs();

    const deleteMealMutation = useDeleteMeal();
    const deleteDietMutation = useDeleteDiet();
    const deleteWaterMutation = useDeleteWaterLog();

    const getLogInfo = () => {
        switch (type) {
            case 'meal':
                return {
                    title: 'Meal Analysis Logs',
                    columns: [
                        { id: 'username', label: 'User', minWidth: 150 },
                        { id: 'item_name', label: 'Item', minWidth: 150 },
                        { id: 'calories', label: 'Calories', minWidth: 100 },
                        { id: 'protein_g', label: 'Protein', minWidth: 100 },
                        { id: 'meal_date', label: 'Date', minWidth: 120 },
                    ],
                    rows: mealsQuery.data || [],
                    isLoading: mealsQuery.isLoading,
                    deleteFn: (id: number) => deleteMealMutation.mutateAsync(id)
                };
            case 'diet':
                return {
                    title: 'Required Diet Logs',
                    columns: [
                        { id: 'username', label: 'User', minWidth: 150 },
                        { id: 'calories', label: 'Cal Target', minWidth: 120 },
                        { id: 'protein_g', label: 'Pro Target', minWidth: 120 },
                        { id: 'diet_date', label: 'Effective Date', minWidth: 150 },
                    ],
                    rows: dietsQuery.data || [],
                    isLoading: dietsQuery.isLoading,
                    deleteFn: (id: number) => deleteDietMutation.mutateAsync(id)
                };
            case 'water':
                return {
                    title: 'Water Intake Logs',
                    columns: [
                        { id: 'username', label: 'User', minWidth: 150 },
                        { id: 'water_ml', label: 'Amount (ml)', minWidth: 120 },
                        { id: 'bottle_type', label: 'Bottle', minWidth: 150 },
                        { id: 'logged_at', label: 'Time', minWidth: 180 },
                    ],
                    rows: waterQuery.data || [],
                    isLoading: waterQuery.isLoading,
                    deleteFn: (id: number) => deleteWaterMutation.mutateAsync(id)
                };
            default:
                return { title: 'Logs', columns: [], rows: [], isLoading: false, deleteFn: async () => { } };
        }
    };

    const { title, columns, rows, isLoading, deleteFn } = getLogInfo();

    const handleDelete = (id: any) => {
        setDeleteId(id);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteFn(deleteId);
            setDeleteId(null);
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleView = (id: any) => {
        navigate(`/logs/${type}/${id}`);
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
                title={title}
                columns={columns}
                rows={rows}
                onDelete={handleDelete}
                onView={handleView}
                searchPlaceholder={`Search ${type} logs...`}
            />
            <DeleteConfirmModal
                open={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={handleConfirmDelete}
                title={`Delete ${type === 'meal' ? 'Meal' : type === 'diet' ? 'Diet' : 'Water'} Log`}
                description={`Are you sure you want to delete this ${type} log? This action cannot be undone.`}
                isLoading={deleteMealMutation.isPending || deleteDietMutation.isPending || deleteWaterMutation.isPending}
            />
        </Box>
    );
};

export default LogsPage;
