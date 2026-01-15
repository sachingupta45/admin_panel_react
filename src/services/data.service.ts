import axiosInstance from '../api/axiosInstance';
import type { User, MealAnalysis, RequiredDietLog, WaterIntakeLog } from './types';

export const dataService = {
    // Users
    getUsers: async (): Promise<User[]> => {
        const response = await axiosInstance.get('/admin/users');
        return response.data.data;
    },
    deleteUser: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/admin/users/${id}`);
    },

    // User Details (if separate from profile)
    getUserDetails: async (): Promise<any[]> => {
        const response = await axiosInstance.get('/admin/user_details');
        return response.data.data;
    },

    // getting particular user details (if separate from profile)
    getParticularUserDetails: async (id: number): Promise<any[]> => {
        const response = await axiosInstance.get(`/user/${id}`);
        return response.data.data;
    },

    deleteUserDetail: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/admin/user_details/${id}`);
    },

    // Meals
    getMealAnalyses: async (): Promise<MealAnalysis[]> => {
        const response = await axiosInstance.get('/admin/meals');
        return response.data.data;
    },
    deleteMeal: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/admin/meals/${id}`);
    },

    // Water Logs
    getWaterLogs: async (): Promise<WaterIntakeLog[]> => {
        const response = await axiosInstance.get('/admin/water_logs');
        return response.data.data;
    },
    deleteWaterLog: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/admin/water_logs/${id}`);
    },

    // Diets
    getDietLogs: async (): Promise<RequiredDietLog[]> => {
        const response = await axiosInstance.get('/admin/required_diets');
        return response.data.data;
    },
    deleteDietLog: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/admin/required_diets/${id}`);
    },

    // Dashboard Stats (Custom)
    getDashboardStats: async () => {
        const response = await axiosInstance.get('/admin/stats');
        return response.data.data;
    }
};
