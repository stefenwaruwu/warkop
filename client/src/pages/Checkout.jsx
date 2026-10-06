import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const Checkout = () => {
  const { items, totalAmount, clearCart, customerNote, setCustomerNote } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderCode, setOrderCode] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!items || items.length === 0) return;
    setLoading(true);
    try {
      const payload = {
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        customer_note: customerNote,
      };
      const res = await createOrder(payload);
      if (res.data && res.data.data) {
        setOrderCode(res.data.data.order_code);
        clearCart();
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat membuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  if (orderCode) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-2xl font-semibold mb-4">Pesanan Dibuat</h2>
        <p className="mb-4">Tunjukkan kode berikut ke kasir untuk pembayaran:</p>
        <div className="p-6 bg-amber/10 rounded-lg inline-block text-amber font-bold text-lg">{orderCode}</div>
        <div className="mt-6">
          <button onClick={() => navigate('/menu')} className="btn-primary mt-4">Kembali ke Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {items.map(it => (
            <div key={it.id} className="p-4 border rounded-lg flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold">{it.name}</h3>
                <p className="text-sm text-cream-muted">{formatPrice(it.price)} x {it.quantity}</p>
              </div>
              <div className="text-right font-semibold">{formatPrice(it.price * it.quantity)}</div>
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
          <button disabled={loading} onClick={handleSubmit} className="btn-primary w-full mt-4">{loading ? 'Memproses...' : 'Buat Pesanan'}</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
