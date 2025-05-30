import type { SignupCredentials, AuthResponse, LoginCredentials, LoginResponse } from '../types/auth';
import type { User } from '../types/user';

const API_URL = 'http://localhost:8000/rest/v1';

// Create a custom event for auth state changes
export const AUTH_STATE_CHANGE = 'authStateChange';

export const authService = {
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      // Dispatch loading state
      window.dispatchEvent(new CustomEvent(AUTH_STATE_CHANGE, { detail: { loading: true } }));

      const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      
      // Store tokens in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('user_id', data.user_id.toString());
      
      return data;
    } catch (error) {
      throw error;
    } finally {
      // Dispatch loading state end
      window.dispatchEvent(new CustomEvent(AUTH_STATE_CHANGE, { detail: { loading: false } }));
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await fetch(`${API_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      // Dispatch loading state
      window.dispatchEvent(new CustomEvent(AUTH_STATE_CHANGE, { detail: { loading: true } }));

      // Remove all auth-related items from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_id');
      
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to login page
      window.location.href = '/login';
    } finally {
      // Dispatch loading state end
      window.dispatchEvent(new CustomEvent(AUTH_STATE_CHANGE, { detail: { loading: false } }));
    }
  },
}; 