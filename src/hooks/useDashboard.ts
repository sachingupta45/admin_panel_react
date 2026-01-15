import { useQuery } from '@tanstack/react-query';
import { dataService } from '../services/data.service';

export const useDashboard = () => {
    const useGetStats = () => {
        return useQuery({
            queryKey: ['dashboard-stats'],
            queryFn: async () => {
                const [users, meals, diets, water] = await Promise.all([
                    dataService.getUsers(),
                    dataService.getMealAnalyses(),
                    dataService.getDietLogs(),
                    dataService.getWaterLogs()
                ]);
                return {
                    users: users.length,
                    meals: meals.length,
                    diets: diets.length,
                    water: water.length
                };
            },
        });
    };

    return {
        useGetStats,
    };
};
