import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
import { AuthUser } from '@/types/auth';
import axios from 'axios'; // Or your custom axios instance

interface AuthStoreState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: any | null;
  checkAuth: () => Promise<void>;
  signup: (data: any) => Promise<void>;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const BASE_URL = '/';

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      authUser: null,
      isSigningUp: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      isCheckingAuth: true,
      onlineUsers: [],
      socket: null,

      checkAuth: async () => {
        try {
          const res = await axios.get<AuthUser>('/api/auth/check');
          set({ authUser: res.data });
          get().connectSocket();
        } catch (error: any) {
          console.log('Error in checkAuth:', error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data: any) => {
        set({ isSigningUp: true });
        try {
          const res = await axios.post<AuthUser>('/api/auth/signup', data);
          set({ authUser: res.data });
          toast.success('Account created successfully');
          get().connectSocket();
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Signup failed');
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data: any) => {
        set({ isLoggingIn: true });
        try {
          const res = await axios.post<AuthUser>('/api/auth/login', data);
          set({ authUser: res.data });
          toast.success('Logged in successfully');
          get().connectSocket();
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Login failed');
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          await axios.post('/api/auth/logout');
          set({ authUser: null });
          toast.success('Logged out successfully');
          get().disconnectSocket();
        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'Logout failed');
        }
      },

      updateProfile: async (data: any) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axios.put<AuthUser>('/api/auth/update-profile', data);
          set({ authUser: res.data });
          toast.success('Profile updated successfully');
        } catch (error: any) {
          console.log('error in update profile:', error);
          toast.error(error?.response?.data?.message || 'Update failed');
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;

        const newSocket: any = io(BASE_URL, {
          query: { userId: authUser._id },
        });
        newSocket.connect();

        set({ socket: newSocket });

        newSocket.on('getOnlineUsers', (userIds: string[]) => {
          set({ onlineUsers: userIds });
        });
      },

      disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) socket.disconnect();
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ authUser: state.authUser }),
    }
  )
);