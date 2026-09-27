/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { catalogApi } from "../api/catalogApi";

const CartContext = createContext(null);

const SHIPPING_FEE = 80;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshCart = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await catalogApi.getCart();
      setCart(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart(true);
  }, [refreshCart]);

  const addItem = async (productId, variantId, quantity) => {
    const data = await catalogApi.addToCart(productId, variantId, quantity);
    setCart(data);
  };

  const updateQuantity = async (variantId, quantity) => {
    const data = await catalogApi.updateCartQuantity(variantId, quantity);
    setCart(data);
  };

  const removeItem = async (variantId) => {
    const data = await catalogApi.removeCartItem(variantId);
    setCart(data);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        refreshCart,
        addItem,
        updateQuantity,
        removeItem,
        itemCount,
        subtotal,
        shippingFee: SHIPPING_FEE,
        total: subtotal + (cart.length ? SHIPPING_FEE : 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
