import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('berttam_cart');
      const parsed = raw ? JSON.parse(raw) : { items: [], note: '' };
      return parsed.items || [];
    } catch (e) {
      return [];
    }
  });

  const [customerNote, setCustomerNote] = useState(() => {
    try {
      const raw = localStorage.getItem('berttam_cart');
      const parsed = raw ? JSON.parse(raw) : { items: [], note: '' };
      return parsed.note || '';
    } catch (e) {
      return '';
    }
  });

  useEffect(() => {
    localStorage.setItem('berttam_cart', JSON.stringify({ items, note: customerNote }));
  }, [items, customerNote]);

  const addItem = (menuItem, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === menuItem.id);
      if (found) {
        return prev.map((p) => (p.id === menuItem.id ? { ...p, quantity: p.quantity + quantity } : p));
      }
      return [...prev, { ...menuItem, quantity }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p)));
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const clearCart = () => {
    setItems([]);
    setCustomerNote('');
  };

  const totalCount = items.reduce((s, it) => s + Number(it.quantity || 0), 0);
  const totalAmount = items.reduce((s, it) => s + Number(it.price || 0) * Number(it.quantity || 0), 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalCount,
      totalAmount,
      customerNote,
      setCustomerNote,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
