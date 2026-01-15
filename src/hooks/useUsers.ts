import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../services/data.service';

export const useUsers = () => {
    const queryClient = useQueryClient();

    const useGetUsers = () => {
        return useQuery({
            queryKey: ['users'],
            queryFn: dataService.getUsers,
        });
    };

    const useGetUser = (id: string) => {
        return useQuery({
            queryKey: ['users', id],
            queryFn: async () => {
                const users = await dataService.getUsers();
                return users.find(u => String(u.id) === id);
            },
        });
    };

    const useDeleteUser = () => {
        return useMutation({
            mutationFn: (id: number) => dataService.deleteUser(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
            },
        });
    };

    const useGetUserDetails = (id: string) => {
        return useQuery({
            queryKey: ['user-details', id],
            queryFn: () => dataService.getUserDetails(), // Note: image showed /admin/user_details, might need id in real API
        });
    };

    return {
        useGetUsers,
        useGetUser,
        useDeleteUser,
        useGetUserDetails,
    };
};
