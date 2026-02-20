// src/services/authService.js
const API_URL = "http://localhost:8080/api/auth";

export const authService = {
    // REGISTRATION: Sends user data to the backend
    register: async (userData) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                role: 'BORROWER' // Default role for portal sign-ups
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }
        return response.json();
    },

    // LOGIN: Receives JWT and user details
    login: async (credentials) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Invalid username or password');
        }

        const data = await response.json();
        
        // Save to localStorage so the "New Dimension" persists after refresh
        if (data.token) {
            localStorage.setItem('user', JSON.stringify(data));
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('user');
    }
};