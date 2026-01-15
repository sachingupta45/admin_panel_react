import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../services/data.service';

export const useWater = () => {
    const queryClient = useQueryClient();

    const useGetWaterLogs = () => {
        return useQuery({
            queryKey: ['water'],
            queryFn: dataService.getWaterLogs,
        });
    };

    const useGetWaterLog = (id: string) => {
        return useQuery({
            queryKey: ['water', id],
            queryFn: async () => {
                const logs = await dataService.getWaterLogs();
                return logs.find(l => String(l.id) === id);
            },
        });
    };

    const useDeleteWaterLog = () => {
        return useMutation({
            mutationFn: (id: number) => dataService.deleteWaterLog(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['water'] });
            },
        });
    };

    return {
        useGetWaterLogs,
        useGetWaterLog,
        useDeleteWaterLog,
    };
};
