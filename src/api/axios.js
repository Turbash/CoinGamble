import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export const registerUser = async (userData) => {
  const res = await api.post("/users/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await api.post("/users/login", userData);
  return res.data;
};


export const addCoin = async (coinData) => {
  const res = await api.post("/coins", coinData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getMyCoins = async () => {
  const res = await api.get("/coins");
  return res.data;
};

export const getCoinById = async (id) => {
  const res = await api.get(`/coins/${id}`);
  return res.data;
};

export const updateCoin = async (id, coinData) => {
  const res = await api.patch(`/coins/${id}`, coinData);
  return res.data;
};

export const deleteCoin = async (id) => {
  const res = await api.delete(`/coins/${id}`);
  return res.data;
};

export const getTotalValue = async () => {
  const res = await api.get("/coins/value/total");
  return res.data;
};

export const getPendingCoins = async () => {
  const res = await api.get("/expert/pending");
  return res.data;
};

export const evaluateCoin = async (id, value) => {
  const res = await api.patch(`/expert/${id}/evaluate`, { value });
  return res.data;
};

export default api;