const API_BASE_URL = "http://localhost:8088/api";

export const authService = {
    async register(userData) {
        try{
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(userData),
            });
            return await response.json();

        } catch(e) {
            throw new Error("Registration failed.");
        }
    },

    async login(credentials) {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });
          const data = await response.json();
          console.log("data:: ", data);
          console.log("user:: ", credentials);
          if (data.message != null) {
            console.log('token', data.message);
            localStorage.setItem('token', data.message);
            localStorage.setItem('user', JSON.stringify(credentials));
          }
          return data;
        } catch (error) {
          throw new Error('Login failed');
        }
      },

      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },

      getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
      },

      getToken() {
        return localStorage.getItem('token');
      },
    
      isAuthenticated() {
        return !!this.getToken();
      }
}

