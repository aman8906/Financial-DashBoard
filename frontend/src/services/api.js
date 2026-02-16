import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ================= AUTH ================= */

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

/* ================= USER DATA ================= */

// Always use userId (client101 type)

export const getPortfolio = (userId) => {
  return API.get(`/data/portfolio/${userId}`);
};

export const getOrders = (userId) => {
  return API.get(`/data/orders/${userId}`);
};

/* ================= REALTIME (OPTIONAL FALLBACK) ================= */

export const getRealtimeData = (userId) => {
  return API.get(`/data/realtime/${userId}`);
};
