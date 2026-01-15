import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../services/data.service';

export const useDiets = () => {
    const queryClient = useQueryClient();

    const useGetDiets = () => {
        return useQuery({
            queryKey: ['diets'],
            queryFn: dataService.getDietLogs,
        });
    };

    const useGetDiet = (id: string) => {
        return useQuery({
            queryKey: ['diets', id],
            queryFn: async () => {
                const diets = await dataService.getDietLogs();
                return diets.find(d => String(d.id) === id);
            },
        });
    };

    const useDeleteDiet = () => {
        return useMutation({
            mutationFn: (id: number) => dataService.deleteDietLog(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['diets'] });
            },
        });
    };

    return {
        useGetDiets,
        useGetDiet,
        useDeleteDiet,
    };
};
