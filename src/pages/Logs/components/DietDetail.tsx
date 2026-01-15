import { useNavigate } from 'react-router-dom';
import { Grid2 as Grid, Typography, Box, Divider, Paper, CircularProgress } from '@mui/material';
import { ClipboardList, Wheat, Candy, Zap, Hash } from 'lucide-react';
import DetailViewContainer from '../../../components/DetailViewContainer';
import { useDiets } from '../../../hooks/useDiets';

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

const DietDetail = ({ id }: { id: string }) => {
    const navigate = useNavigate();
    const { useGetDiet, useDeleteDiet } = useDiets();
    const { data: diet, isLoading } = useGetDiet(id);
    const deleteMutation = useDeleteDiet();

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(Number(id));
            navigate('/logs/diet');
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>;
    if (!diet) return null;

    return (
        <DetailViewContainer
            title="Diet Plan Details"
            subtitle={`Plan for ${diet.username} on ${diet.diet_date}`}
            onDelete={handleDelete}
            deleteModalTitle="Delete Diet Plan"
            deleteModalDescription={`Are you sure you want to delete this diet plan for ${diet.username}? This action cannot be undone.`}
            isDeleting={deleteMutation.isPending}
            breadcrumbs={[
                { label: 'Home', path: '/' },
                { label: 'Diet Logs', path: '/logs/diet' },
                { label: `Plan #${id}` }
            ]}
        >
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ p: 8, bgcolor: '#f5f3ff', borderRadius: 4, textAlign: 'center', border: '1px solid #e0e7ff', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <ClipboardList size={64} color="#6366f1" />
                        <Typography variant="h6" sx={{ mt: 3, fontWeight: 800, color: '#4338ca' }}>
                            Diet Overview
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 4 }}>
                        <InfoItem label="Plan Owner" value={diet.username || `User ID: ${diet.user_id}`} />
                        <InfoItem label="Target Date" value={diet.diet_date} />
                        <InfoItem label="Meals Per Day" value={`${diet.meal_per_day} Sessions`} />
                        <InfoItem label="Created At" value={diet.created_at} />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: '#1e293b' }}>
                            Daily Nutritional Target
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                <InfoItem label="Status" value="Target requirements set" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                                <InfoItem label="Log ID" value={`#${diet.id}`} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4f46e5' }}>Nutritional Goals</Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Calories" value={`${diet.calories} kcal`} color="#6366f1" /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Protein" value={`${diet.protein_g}g`} color="#10b981" /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Carbs" value={`${diet.carbs_g}g`} color="#f59e0b" /></Grid>
                            <Grid size={{ xs: 6, sm: 3 }}><MacroCard label="Fats" value={`${diet.fats_g}g`} color="#ef4444" /></Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MicroNutrient icon={Wheat} label="Fiber" value={`${diet.fiber_g}g`} color="#8b5cf6" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MicroNutrient icon={Candy} label="Sugar" value={`${diet.sugar_g}g`} color="#ec4899" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MicroNutrient icon={Zap} label="Sodium" value={`${diet.sodium_mg}mg`} color="#06b6d4" />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ p: 4, bgcolor: '#f0f9ff', borderRadius: 4, border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <Hash size={24} color="#0369a1" />
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0c4a6e' }}>
                                Frequnecy Analysis
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#0369a1', fontWeight: 500 }}>
                                Based on the profile, {diet.meal_per_day} meals per day are recommended to hit these targets effectively.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </DetailViewContainer>
    );
};

export default DietDetail;
