import axios from "axios";

const API = axios.create({
  baseURL: "https://financial-dashboard-lrnp.onrender.com/api",
});

/* ================= AUTH ================= */

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

/* ================= USER DATA ================= */

export const getPortfolio = (userId) => {
  return API.get(`/data/portfolio/${userId}`);
};

export const getOrders = (userId) => {
  return API.get(`/data/orders/${userId}`);
};

/* ================= REALTIME ================= */

export const getRealtimeData = (userId) => {
  return API.get(`/data/realtime/${userId}`);
};
