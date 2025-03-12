export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: string;
    role: 'user' | 'organizer' | 'admin';  // ユーザー、主催者、管理者
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }