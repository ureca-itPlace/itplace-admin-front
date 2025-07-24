import api from './axiosInstance';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  code: string;
  status: string;
  message: string;
  data: T;
  timestamp: string;
}

// 로그인
export const adminLogin = async (loginData: LoginRequest): Promise<ApiResponse<null>> => {
  const response = await api.post('/api/v1/auth/login', loginData, { withCredentials: true });
  return response.data;
};

// 로그아웃
export const adminLogout = async (): Promise<ApiResponse<null>> => {
  const response = await api.post('/api/v1/auth/logout', {}, { withCredentials: true });
  return response.data;
};
