import { useParams, useNavigate } from 'react-router-dom';
import { Grid2 as Grid, Typography, Avatar, Box, Divider, Chip, CircularProgress } from '@mui/material';
import DetailViewContainer from '../../components/DetailViewContainer';
import { useUsers } from '../../hooks/useUsers';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { useGetUser, useDeleteUser } = useUsers();
    const { data: user, isLoading } = useGetUser(id || '');
    const deleteMutation = useDeleteUser();

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(Number(id));
            navigate('/users');
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const InfoItem = ({ label, value }: { label: string; value: any }) => (
        <Box sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ color: '#1e293b', fontWeight: 600 }}>
                {value || 'N/A'}
            </Typography>
        </Box>
    );

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>;
    if (!user) return null;

    const getProfilePhoto = (path?: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        // Prefix with base URL (assuming localhost:8000 based on environment)
        const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');
        return `${baseUrl}/${path}`;
    };

    return (
        <DetailViewContainer
            title={`User: ${user.username}`}
            subtitle={`Member since ${new Date(user.created_at).toLocaleDateString()}`}
            onDelete={handleDelete}
            deleteModalTitle="Delete User"
            deleteModalDescription={`Are you sure you want to delete user ${user.username}? This action cannot be undone.`}
            isDeleting={deleteMutation.isPending}
            breadcrumbs={[
                { label: 'Home', path: '/' },
                { label: 'Users', path: '/users' },
                { label: user.username }
            ]}
        >
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 3 }} sx={{ textAlign: 'center' }}>
                    <Avatar
                        src={getProfilePhoto(user.profile_photo)}
                        sx={{ width: 150, height: 150, mx: 'auto', mb: 2, border: '4px solid #f1f5f9' }}
                    />
                    <Chip
                        label={user.status}
                        color={user.status === 'active' ? 'success' : 'error'}
                        sx={{ fontWeight: 700, textTransform: 'capitalize' }}
                    />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>{user.role}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 9 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4f46e5' }}>Personal Information</Typography>
                    <Grid container>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Full Name" value={user.username} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Email" value={user.email} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Date of Birth" value={user.dob} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Gender" value={user.gender} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Height" value={`${user.height_cm} cm`} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Weight" value={`${user.weight_kg} kg`} /></Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4f46e5' }}>Fitness & Nutrition</Typography>
                    <Grid container>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Experience" value={user.experience_level} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Activity Level" value={user.activity_level} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Goal" value={user.training_goal} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Diet Type" value={user.diet_type} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Meals/Day" value={user.meals_per_day} /></Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}><InfoItem label="Sleep Hours" value={user.sleep_hours} /></Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4f46e5' }}>Cricket Statistics</Typography>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <InfoItem label="Match Overs" value={user.cricket_match_over} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 8 }}>
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Practice Types
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                {user.practice_type?.map((p, i) => (
                                    <Chip
                                        key={i}
                                        label={`${p.pt}: ${p.time} mins`}
                                        variant="outlined"
                                        size="small"
                                        sx={{ borderRadius: 1, fontWeight: 600 }}
                                    />
                                )) || 'N/A'}
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4f46e5' }}>Additional Details</Typography>
                    <Grid container>
                        <Grid size={{ xs: 12, md: 6 }}><InfoItem label="Allergies" value={user.food_allergies} /></Grid>
                        <Grid size={{ xs: 12, md: 6 }}><InfoItem label="Preferences" value={user.food_preferences} /></Grid>
                        <Grid size={{ xs: 12 }}><InfoItem label="Injuries" value={user.injuries} /></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DetailViewContainer>
    );
};

export default UserDetail;
