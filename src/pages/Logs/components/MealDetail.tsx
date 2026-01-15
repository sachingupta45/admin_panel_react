import { useNavigate } from 'react-router-dom';
import { Grid2 as Grid, Typography, Box, Divider, Paper, CircularProgress } from '@mui/material';
import { Utensils, Wheat, Candy, Zap } from 'lucide-react';
import DetailViewContainer from '../../../components/DetailViewContainer';
import { useMeals } from '../../../hooks/useMeals';

const MacroCard = ({ label, value, color }: { label: string; value: any; color: string }) => (
    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: `${color}05`, border: `1px solid ${color}20`, borderRadius: 3 }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700 }}>{label}</Typography>
        <Typography variant="h6" sx={{ color: color, fontWeight: 800 }}>{value}</Typography>
    </Paper>
);

const MicroNutrient = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) => (
    <Box
        sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: '#f8fafc',
            borderRadius: 3,
            border: '1px solid #f1f5f9',
            transition: 'all 0.2s',
            '&:hover': { bgcolor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', borderColor: color }
        }}
    >
        <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}15`, color: color, display: 'flex' }}>
            <Icon size={18} />
        </Box>
        <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, display: 'block', lineHeight: 1 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                {value}
            </Typography>
        </Box>
    </Box>
);

const InfoItem = ({ label, value }: { label: string; value: any }) => (
    <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.025em' }}>
            {label}
        </Typography>
        <Typography variant="body1" sx={{ color: '#1e293b', fontWeight: 600 }}>
            {value || 'N/A'}
        </Typography>
    </Box>
);

const MealDetail = ({ id }: { id: string }) => {
    const navigate = useNavigate();
    const { useGetMeal, useDeleteMeal } = useMeals();
    const { data: meal, isLoading } = useGetMeal(id);
    const deleteMutation = useDeleteMeal();

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(Number(id));
            navigate('/logs/meal');
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>;
    if (!meal) return null;

    const getImageUrl = (path?: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');
        return `${baseUrl}/${path}`;
    };

    return (
        <DetailViewContainer
            title="Meal Details"
            subtitle={`Record for ${meal.username} on ${meal.meal_date}`}
            onDelete={handleDelete}
            deleteModalTitle="Delete Meal Analysis"
            deleteModalDescription={`Are you sure you want to delete this meal analysis for ${meal.username}? This action cannot be undone.`}
            isDeleting={deleteMutation.isPending}
            breadcrumbs={[
                { label: 'Home', path: '/' },
                { label: 'Meal Logs', path: '/logs/meal' },
                { label: `Record #${id}` }
            ]}
        >
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    {meal.image_path ? (
                        <Box sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <img
                                src={getImageUrl(meal.image_path)}
                                alt={meal.item_name}
                                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ p: 8, bgcolor: '#f8fafc', borderRadius: 4, textAlign: 'center', border: '1px dashed #cbd5e0' }}>
                            <Utensils size={64} color="#94a3b8" />
                            <Typography variant="body1" sx={{ mt: 2, color: '#94a3b8', fontWeight: 500 }}>No image available</Typography>
                        </Box>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: '#1e293b' }}>
                            {meal.item_name || 'Meal Analysis'}
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="User" value={meal.username || `User ID: ${meal.user_id}`} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="Quantity" value={`${meal.quantity} ${meal.quantity_unit}`} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="Meal Date" value={meal.meal_date} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="Precise Meal Time" value={meal.meal_time} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="Record Created" value={meal.created_at} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4f46e5' }}>Nutritional Content</Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Calories" value={`${meal.calories} kcal`} color="#6366f1" /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Protein" value={`${meal.protein_g}g`} color="#10b981" /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Carbs" value={`${meal.carbs_g}g`} color="#f59e0b" /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Fats" value={`${meal.fats_g}g`} color="#ef4444" /></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MicroNutrient icon={Wheat} label="Fiber" value={`${meal.fiber_g}g`} color="#8b5cf6" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MicroNutrient icon={Candy} label="Sugar" value={`${meal.sugar_g}g`} color="#ec4899" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MicroNutrient icon={Zap} label="Sodium" value={`${meal.sodium_mg}mg`} color="#06b6d4" />
                            </Grid>
                        </Grid>
                    </Box>

                    {meal.ai_response && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#4f46e5' }}>Analysis Insights</Typography>
                            <Box sx={{ p: 3, bgcolor: '#f5f3ff', borderRadius: 3, borderLeft: '5px solid #6366f1', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <Typography variant="body1" sx={{ color: '#4338ca', fontStyle: 'italic', lineHeight: 1.7, fontWeight: 500 }}>
                                    "{meal.ai_response}"
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </DetailViewContainer>
    );
};

export default MealDetail;
