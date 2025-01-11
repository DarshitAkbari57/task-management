import axios, { AxiosResponse, AxiosError } from "axios";

const API_URL: string = "http://localhost:8080/api/";
type Token = string | null;

const setAuthToken = (token: Token): void => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["ngrok-skip-browser-warning"] = `69420`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

type ApiResponse<T> = AxiosResponse<T>;

// API Post Request
export const apiPost = async <T>(
  endpoint: string,
  data: any,
  token: Token = null
): Promise<ApiResponse<T>> => {
  setAuthToken(token);
  try {
    const response = await axios.post<T>(`${API_URL}${endpoint}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// API Get Request
export const apiGet = async <T>(
  endpoint: string,
  token: Token = null
): Promise<ApiResponse<T>> => {
  setAuthToken(token);
  try {
    const response = await axios.get<T>(`${API_URL}${endpoint}`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response;
  }
};

// API Put Request
export const apiPut = async <T>(
  endpoint: string,
  data: any,
  token: Token = null
): Promise<ApiResponse<T>> => {
  setAuthToken(token);
  try {
    const response = await axios.put<T>(`${API_URL}${endpoint}`, data);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response;
  }
};

// API Delete Request
export const apiDelete = async <T>(
  endpoint: string,
  token: Token = null
): Promise<ApiResponse<T>> => {
  setAuthToken(token);
  try {
    const response = await axios.delete<T>(`${API_URL}${endpoint}`);
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response;
  }
};
