import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../services/data.service';

export const useMeals = () => {
    const queryClient = useQueryClient();

    const useGetMeals = () => {
        return useQuery({
            queryKey: ['meals'],
            queryFn: dataService.getMealAnalyses,
        });
    };

    const useGetMeal = (id: string) => {
        return useQuery({
            queryKey: ['meals', id],
            queryFn: async () => {
                const meals = await dataService.getMealAnalyses();
                return meals.find(m => String(m.id) === id);
            },
        });
    };

    const useDeleteMeal = () => {
        return useMutation({
            mutationFn: (id: number) => dataService.deleteMeal(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['meals'] });
            },
        });
    };

    return {
        useGetMeals,
        useGetMeal,
        useDeleteMeal,
    };
};
