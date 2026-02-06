import api from "./axios";

export const getProducts = async () => {
  const res = await api.get("/products/", { withCredentials: true });

  return res.data;
};

export const getProductBySlug = async (slug: string) => {
  const res = await api.get(`/products/${slug}/`, { withCredentials: true });

  return res.data;
};

// Admin API

export const createProduct = async (productData: FormData) => {
  const res = await api.post("/products/admin/create/", productData, {
    withCredentials: true,
  });

  return res.data;
};

export const updateProduct = async (id: number, productData: FormData) => {
  const res = await api.post(`/products/admin/update/${id}/`, productData, {
    withCredentials: true,
  });

  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.post(
    `/products/admin/delete/${id}/`,
    {},
    { withCredentials: true },
  );

  return res.data;
};
