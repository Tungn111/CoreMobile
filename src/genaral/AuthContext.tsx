import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { api, getErrorMessage } from '../utils/api';
import storage from '../utils/storage';
import { STORAGE_KEYS } from '../config';

// =============================================
// TYPES
// =============================================
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_ERROR'; payload: string | null };

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterPayload) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// =============================================
// REDUCER
// =============================================
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return { ...initialState, isLoading: false };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

// =============================================
// CONTEXT
// =============================================
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Khôi phục phiên đăng nhập khi mở app
  useEffect(() => {
    (async () => {
      try {
        const token = await storage.getItem<string>(STORAGE_KEYS.ACCESS_TOKEN);
        const user = await storage.getItem<User>(STORAGE_KEYS.USER_DATA);
        if (token && user) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    })();
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await api.post<{
          user: User;
          access_token: string;
          refresh_token: string;
        }>('/auth/login', { email, password });

        const { user, access_token, refresh_token } = res.data;
        await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
        await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
        await storage.setItem(STORAGE_KEYS.USER_DATA, user);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token: access_token },
        });
        return true;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: getErrorMessage(error) });
        return false;
      }
    },
    [],
  );

  const register = useCallback(
    async (data: RegisterPayload): Promise<boolean> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await api.post<{
          user: User;
          access_token: string;
          refresh_token: string;
        }>('/auth/register', data);

        const { user, access_token, refresh_token } = res.data;
        await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
        await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
        await storage.setItem(STORAGE_KEYS.USER_DATA, user);

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token: access_token },
        });
        return true;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: getErrorMessage(error) });
        return false;
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    await storage.removeItem(STORAGE_KEYS.USER_DATA);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: data });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      register,
      logout,
      updateUser,
      clearError,
    }),
    [state, login, register, logout, updateUser, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =============================================
// HOOK
// =============================================
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
