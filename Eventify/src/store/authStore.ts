import { create } from 'zustand';
import type { AuthState, User } from '../types/user.types';

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Supabase/Firebaseでの実際の認証ロジックを実装
      // 現在はモックの成功ログイン
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser: User = {
        id: '1',
        email,
        name: 'テストユーザー',
        createdAt: new Date().toISOString(),
        role: 'user',
      };
      
      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'ログインに失敗しました', 
        isLoading: false 
      });
    }
  },
  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Supabase/Firebaseでの実際の登録ロジックを実装
      // 現在はモックの成功登録
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser: User = {
        id: '1',
        email,
        name,
        createdAt: new Date().toISOString(),
        role: 'user',
      };
      
      set({ 
        user: mockUser, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '登録に失敗しました', 
        isLoading: false 
      });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      // TODO: Supabase/Firebaseでの実際のログアウトロジックを実装
      await new Promise(resolve => setTimeout(resolve, 300));
      set({ ...initialState, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'ログアウトに失敗しました', 
        isLoading: false 
      });
    }
  },
  updateUser: async (userData) => {
    set({ isLoading: true });
    try {
      // TODO: Supabase/Firebaseでの実際のユーザー更新ロジックを実装
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({ 
        user: state.user ? { ...state.user, ...userData } : null,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : '更新に失敗しました', 
        isLoading: false 
      });
    }
  },
  clearError: () => set({ error: null }),
}));