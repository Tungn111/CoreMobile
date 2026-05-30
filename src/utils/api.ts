import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE_URL, API_TIMEOUT, STORAGE_KEYS } from '../config';
import storage from './storage';

// =============================================
// API RESPONSE TYPES
// =============================================
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// =============================================
// CREATE AXIOS INSTANCE
// =============================================
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// =============================================
// REQUEST INTERCEPTOR — gắn token
// =============================================
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await storage.getItem<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// =============================================
// RESPONSE INTERCEPTOR — xử lý lỗi & refresh
// =============================================
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token!);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          if (originalRequest.headers) {
            (originalRequest.headers as Record<string, string>).Authorization =
              `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await storage.getItem<string>(
          STORAGE_KEYS.REFRESH_TOKEN,
        );
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = response.data.data;
        await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
        await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);

        processQueue(null, access_token);
        if (originalRequest.headers) {
          (originalRequest.headers as Record<string, string>).Authorization =
            `Bearer ${access_token}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        // Xóa token → navigate về Login (handle ở AuthContext)
        await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// =============================================
// HTTP HELPER METHODS
// =============================================
export const api = {
  get: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    apiClient.get<ApiResponse<T>>(url, config).then(r => r.data),

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    apiClient.post<ApiResponse<T>>(url, data, config).then(r => r.data),

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    apiClient.put<ApiResponse<T>>(url, data, config).then(r => r.data),

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    apiClient.patch<ApiResponse<T>>(url, data, config).then(r => r.data),

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    apiClient.delete<ApiResponse<T>>(url, config).then(r => r.data),

  upload: <T = unknown>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<T>> =>
    apiClient
      .post<ApiResponse<T>>(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: event => {
          if (onProgress && event.total) {
            onProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      })
      .then(r => r.data),
};

/**
 * Trích xuất message lỗi từ Axios error
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Đã xảy ra lỗi, vui lòng thử lại'
    );
  }
  if (error instanceof Error) return error.message;
  return 'Đã xảy ra lỗi không xác định';
};

export default apiClient;
