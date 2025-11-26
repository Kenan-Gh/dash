import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { setUser, logout, restoreAuth } from '@/store/slices/authSlice';
import { SignInCredentials, User } from '@/lib/types';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Restore auth from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch(restoreAuth({ user, token }));
      } catch (err) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  const handleSignIn = async (credentials: SignInCredentials) => {
    try {
      // Simulate API call - in production, use RTK Query
      // For demo purposes, create mock users based on email
      const mockUsers: Record<string, { password: string; role: 'admin' | 'manager' | 'user' }> = {
        'admin@example.com': { password: 'admin123', role: 'admin' },
        'manager@example.com': { password: 'manager123', role: 'manager' },
        'user@example.com': { password: 'user123', role: 'user' },
      };

      const mockUser = mockUsers[credentials.email];
      if (!mockUser || mockUser.password !== credentials.password) {
        throw new Error('Invalid email or password');
      }

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: mockUser.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        createdAt: new Date().toISOString(),
      };

      const token = 'mock-token-' + Date.now();
      
      // Store in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch(setUser(user));
      return { user, token };
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn: handleSignIn,
    logout: handleLogout,
  };
};
