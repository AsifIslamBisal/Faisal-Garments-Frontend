import axios from "axios";

const SESSION_KEY = "fg_session_id";

export function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = "guest-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers["x-session-id"] = getSessionId();
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export const catalogApi = {
  getCategories: () => api.get("/categories").then((r) => r.data),
  getProducts: (params = {}) => api.get("/products", { params }).then((r) => r.data),
  getProduct: (slug) => api.get(`/products/${slug}`).then((r) => r.data),

  getCart: () => api.get("/cart").then((r) => r.data),
  addToCart: (productId, variantId, quantity) =>
    api.post("/cart/items", { productId, variantId, quantity }).then((r) => r.data),
  updateCartQuantity: (variantId, quantity) =>
    api.patch(`/cart/items/${variantId}`, { quantity }).then((r) => r.data),
  removeCartItem: (variantId) =>
    api.delete(`/cart/items/${variantId}`).then((r) => r.data),

  createOrder: (payload) => api.post("/orders", payload).then((r) => r.data),
  getMyOrders: () => api.get("/orders/my").then((r) => r.data),
  getOrder: (id) => api.get(`/orders/${id}`).then((r) => r.data),

  getMe: () => api.get("/users/me").then((r) => r.data),
  updateMe: (payload) => api.patch("/users/me", payload).then((r) => r.data),
};

export default api;
