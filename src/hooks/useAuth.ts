import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { authApi } from '../services/auth/auth.services';

export const useLogin = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.access_token);
      toast.success('Login successful!');
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error('Login error:', error);
    },
  });
};

export const useIsAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return {
    isAuthenticated: !!token,
  }
};
