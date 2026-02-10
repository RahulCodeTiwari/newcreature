import api from "./axios.js";

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data.categories || [];
};
