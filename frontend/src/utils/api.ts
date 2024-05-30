import axios from "axios";
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

interface UserData {
  username: string;
  email?: string;
  password: string;
}

interface CredentialData {
  website: string;
  username: string;
  password: string;
}

export const signUp = (userData: UserData) => api.post('/auth/signup', userData);
export const login = (userData: UserData) => api.post('/auth/login', userData);
export const fetchCredentials = (token: string) => api.get('/credentials', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const addCredential = (credentialData: CredentialData, token: string) => api.post('/credentials', credentialData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export default api;