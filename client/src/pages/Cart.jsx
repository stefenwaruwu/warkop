import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const Cart = () => {
  const { items, updateQuantity, removeItem, totalAmount, customerNote, setCustomerNote } = useCart();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-2xl font-semibold mb-4">Keranjang Anda kosong</h2>
        <Link to="/menu" className="btn-primary">Lihat Menu</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-2xl font-semibold mb-6">Keranjang Pesanan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="p-4 border rounded-lg flex items-center gap-4">
              <img src={it.image ? `/uploads/${it.image}` : `https://placehold.co/120x90`} alt={it.name} className="w-28 h-20 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="font-semibold">{it.name}</h3>
                <p className="text-sm text-cream-muted">{formatPrice(it.price)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => updateQuantity(it.id, it.quantity - 1)} className="px-2 py-1 bg-white/5 rounded">-</button>
                  <span className="px-3">{it.quantity}</span>
                  <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="px-2 py-1 bg-white/5 rounded">+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(it.price * it.quantity)}</p>
                <button onClick={() => removeItem(it.id)} className="text-sm text-red-400 mt-2">Hapus</button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Catatan / Pesan tambahan</label>
            <textarea
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              className="w-full p-3 rounded-lg bg-dark-deep text-cream-muted border border-white/10"
              rows={4}
              placeholder="Contoh: Tanpa gula, pesan diambil di tempat"
            />
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold mb-3">Ringkasan</h4>
          <div className="flex justify-between mb-2">
            <span>Total</span>
            <span className="font-semibold">{formatPrice(totalAmount)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-primary w-full mt-4">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
