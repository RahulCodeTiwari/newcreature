import api from "./axios.js";

/**
 * Category → products (LIST)
 * /api/products?category=slugOrId
 */
export const getProducts = async (slugOrId) => {
  const res = await api.get(
    `/products?category=${slugOrId}`
  );
  return res.data;
};


export const getProductGroups = async () => {
  const res = await api.get("/api/products/groups");
  return res.data;   // ["gas","dosa","momo","burger"]
};
// subcategory=slugId

export const getSingleProduct = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data;
};

export const getRelatedProducts = async (params) => {
  const res = await api.get("/products/related", { params });
  return res.data;
}

export const searchProducts = async (query) => {
  const res = await api.get("/products/search", { params: { q: query } });
  return res.data;
}




