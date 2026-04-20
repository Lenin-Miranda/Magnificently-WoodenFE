import api from "./axios";

export const getCart = async () => {
  const res = await api.get("/cart/", { withCredentials: true });

  return res.data;
};

// Agregar item al carrito
export const addToCart = async (productId: number, quantity: number) => {
  const res = await api.post(
    "/cart/items/",
    {
      productId, // Django suele esperar 'product' como clave
      quantity,
    },
    { withCredentials: true },
  );
  return res.data;
};

// Eliminar item del carrito (DELETE)
export const removeFromCart = async (itemId: number) => {
  const res = await api.delete(`/cart/items/${itemId}/`, {
    withCredentials: true,
  });
  return res.data;
};

// Actualizar cantidad de item (PATCH)
export const updateCartItem = async (itemId: number, quantity: number) => {
  const res = await api.patch(
    `/cart/items/${itemId}/`,
    { quantity },
    { withCredentials: true },
  );
  return res.data;
};

export const clearCart = async () => {
  const res = await api.post("/cart/clear/", {}, { withCredentials: true });
  return res.data;
};
