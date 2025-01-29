import axios from "axios";

const API_URL = "http://localhost:8088/api/todos";
const LOGIN_API_URL = "http://localhost:8088/api/users";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => localStorage.getItem("token");

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const login = (username, password) =>
  axios.post(`${LOGIN_API_URL}/login`, { username, password });

export const fetchTodos = (page) => api.get("/todos?page=${page}&limit=10");
export const createTodo = (todo) => api.post("/save", todo);
export const updateTodo = (id, todo) => api.put(`/${id}`, todo);
export const deleteTodo = (id) => api.delete(`/${id}`);
export const searchTodos = (keyword) => api.get(`/search?keyword=${keyword}`);
export const filterTodos = (filters) => api.get(`/filter`, { params: filters });
