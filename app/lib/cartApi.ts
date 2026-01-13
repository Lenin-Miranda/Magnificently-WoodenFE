import api from "./axios";

export const getCart = async () => {
  const res = await api.get("/cart/", { withCredentials: true });

  return res.data;
};

export const addToCart = async (productId: number, quantity: number) => {
  const res = await api.post(
    "/cart/add/",
    {
      productId,
      quantity,
    },
    { withCredentials: true }
  );
  return res.data;
};

export const removeFromCart = async (productId: number) => {
  const res = await api.post(
    "/cart/remove/",
    { productId },
    { withCredentials: true }
  );
  return res.data;
};

export const updateCartItem = async (productId: number, quantity: number) => {
  const res = await api.post(
    "/cart/update/",
    { productId, quantity },
    { withCredentials: true }
  );
  return res.data;
};

export const clearCart = async () => {
  const res = await api.post("/cart/clear/", {}, { withCredentials: true });
  return res.data;
};
