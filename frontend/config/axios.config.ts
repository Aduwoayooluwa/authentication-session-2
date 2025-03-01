import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3001' });

// dummy function to get refresh token
async function refreshToken() {
    return {
        access_token: 'new_access_token',
        refresh_token: 'new_refresh_token'
    };
}

// Request handling.
api.interceptors.request.use((config) => {

    config.withCredentials = true;
    
  return config;
});


//  Response handling. 
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      await refreshToken(); 
      return api.request(error.config); 
    }
    return Promise.reject(error);
  }
);