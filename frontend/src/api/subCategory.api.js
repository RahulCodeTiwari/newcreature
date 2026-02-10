import api from "./axios.js";

/**
 * Category → SubCategories (LIST)
 * /api/subcategories?category=slugOrId
 */
export const getSubCategories = async (slugOrId) => {
  const res = await api.get(
    `/subcategories?category=${slugOrId}`
  );
  return res.data;
};


export const getSubCategoryGroups = async () => {
  const res = await api.get("/api/subcategories/groups");
  return res.data;   // ["gas","dosa","momo","burger"]
};
// subcategory=slugId

export const getSingleSubCategory = async (slug) => {
  const res = await api.get(`/subcategories/${slug}`);
  return res.data;
};

export const getRelatedSubcategories = async (params) => {
  const res = await api.get("/subcategories/related", { params });
  return res.data;
}

export const searchSubcategories = async (query) => {
  const res = await api.get("/subcategories/search", { params: { q: query } });
  return res.data;
}




