import { useNavigate } from 'react-router-dom';
import { Grid2 as Grid, Typography, Box, Divider, Paper, CircularProgress, Stack } from '@mui/material';
import { Droplets, Clock, Calendar, Hash, Waves } from 'lucide-react';
import DetailViewContainer from '../../../components/DetailViewContainer';
import { useWater } from '../../../hooks/useWater';

const MetricCard = ({ label, value, color, icon: Icon }: { label: string; value: any; color: string; icon: any }) => (
    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: `${color}05`, border: `1px solid ${color}20`, borderRadius: 4, height: '100%' }}>
        <Stack alignItems="center" spacing={1}>
            <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}10`, color: color }}>
                <Icon size={24} />
            </Box>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>{label}</Typography>
            <Typography variant="h5" sx={{ color: '#1e293b', fontWeight: 800 }}>{value}</Typography>
        </Stack>
    </Paper>
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

const WaterDetail = ({ id }: { id: string }) => {
    const navigate = useNavigate();
    const { useGetWaterLog, useDeleteWaterLog } = useWater();
    const { data: log, isLoading } = useGetWaterLog(id);
    const deleteMutation = useDeleteWaterLog();

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(Number(id));
            navigate('/logs/water');
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>;
    if (!log) return null;

    const getImageUrl = (path?: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const baseUrl = import.meta.env.VITE_API_URL.replace('/api/v1', '');
        return `${baseUrl}/${path}`;
    };

    return (
        <DetailViewContainer
            title="Water Intake Details"
            subtitle={`Hydration log for ${log.username}`}
            onDelete={handleDelete}
            deleteModalTitle="Delete Hydration Log"
            deleteModalDescription={`Are you sure you want to delete this hydration entry of ${log.water_ml}ml? This action cannot be undone.`}
            isDeleting={deleteMutation.isPending}
            breadcrumbs={[
                { label: 'Home', path: '/' },
                { label: 'Water Logs', path: '/logs/water' },
                { label: `Log #${id}` }
            ]}
        >
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    {log.image_path ? (
                        <Box sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                            <img
                                src={getImageUrl(log.image_path)}
                                alt="Water intake"
                                style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </Box>
                    ) : (
                        <Box sx={{ p: 8, bgcolor: '#f0f9ff', borderRadius: 4, textAlign: 'center', border: '1px dashed #bae6fd' }}>
                            <Waves size={80} color="#0ea5e9" />
                            <Typography variant="body1" sx={{ mt: 2, color: '#0ea5e9', fontWeight: 600 }}>Hydration Entry</Typography>
                        </Box>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: '#1e293b' }}>
                            {log.water_ml} ml Intake
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="User" value={log.username || `User ID: ${log.user_id}`} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="Bottle Type" value={log.bottle_type || 'Standard'} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <InfoItem label="Log ID" value={`#${log.id}`} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#0ea5e9' }}>Session Details</Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MetricCard
                                    label="Volume"
                                    value={`${log.water_ml} ml`}
                                    color="#0ea5e9"
                                    icon={Droplets}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MetricCard
                                    label="Intake Time"
                                    value={log.water_time || 'Unknown'}
                                    color="#6366f1"
                                    icon={Clock}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <MetricCard
                                    label="Date Recorded"
                                    value={log.logged_at.split(' ')[0]}
                                    color="#8b5cf6"
                                    icon={Calendar}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: 4, border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Box sx={{ p: 2, bgcolor: '#ffffff', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <Hash size={24} color="#94a3b8" />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                Accurate Hydration Tracking
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                This record was verified and synced with the user's daily goals at {log.logged_at}.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </DetailViewContainer>
    );
};

export default WaterDetail;
