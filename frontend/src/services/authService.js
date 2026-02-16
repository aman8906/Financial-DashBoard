import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};
