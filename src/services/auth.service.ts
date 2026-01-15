import axiosInstance from '../api/axiosInstance';

export interface User {
    username: string;
    email: string;
    role: string;
    photo?: string;
}

export const authService = {
    login: async (credentials: { username: string; password: string }) => {
        // Updated to use 'params' because FastAPI requires these as query parameters
        const response = await axiosInstance.post('/admin/login', null, {
            params: {
                email: credentials.username,
                password: credentials.password
            }
        });
        console.log(response.data.data.token);
        if (response.data.data.token) {
            console.log(response.data.data.token);
            localStorage.setItem('token', response.data.data.token);
            // Assuming the API returns user info or we set a default for admin
            const user: User = {
                username: credentials.username.split('@')[0], // Use part before @ as name
                email: credentials.username,
                role: 'Super Administrator',
                photo: "https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff&bold=true"
            };
            localStorage.setItem('user', JSON.stringify(user));
            return { user, token: response.data.data.token };
        }
        throw new Error('Login failed');
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
};
