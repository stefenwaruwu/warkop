import { useEffect, useMemo, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { getOrders, getOrderById, updateOrderStatus } from '../services/api';

const statusMap = {
  MENUNGGU_PEMBAYARAN: 'Menunggu Pembayaran',
  DIPROSES: 'Diproses',
  SELESAI: 'Selesai',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      setOrders(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Pesanan — Admin Panel';
    fetch();
  }, []);

  const openDetail = async (id) => {
    const res = await getOrderById(id);
    setSelected(res.data.data);
  };

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    await fetch();
    setSelected(null);
  };

  const stats = useMemo(() => {
    return orders.reduce(
      (acc, o) => {
        acc.total += 1;
        acc[o.status] = (acc[o.status] || 0) + 1;
        return acc;
      },
      { total: 0 }
    );
  }, [orders]);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return String(o.order_code).toLowerCase().includes(q) || String(o.customer_note || '').toLowerCase().includes(q);
    });
  }, [orders, search, statusFilter]);

  return (
    <AdminSidebar>
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-cream">Daftar Pesanan</h2>
            <p className="text-cream-muted text-sm">Kelola semua pesanan pelanggan di sini.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari kode atau catatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field text-sm"
            />
            <button onClick={fetch} className="btn-primary py-2 px-4 text-sm">Refresh</button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <button onClick={() => setStatusFilter('ALL')} className={`px-3 py-1 rounded ${statusFilter === 'ALL' ? 'bg-amber text-dark' : 'bg-white/5'}`}>
            Semua ({stats.total || 0})
          </button>
          {Object.keys(statusMap).map((k) => (
            <button key={k} onClick={() => setStatusFilter(k)} className={`px-3 py-1 rounded ${statusFilter === k ? 'bg-amber text-dark' : 'bg-white/5'}`}>
              {statusMap[k]} ({stats[k] || 0})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-3">
            {loading && <div className="text-cream-muted">Memuat...</div>}
            {!loading && filtered.length === 0 && <div className="text-cream-muted">Tidak ada pesanan.</div>}
            {filtered.map((o) => (
              <div key={o.id} className="p-4 border rounded flex items-center justify-between bg-dark-light/70">
                <div>
                  <div className="font-semibold text-cream">{o.order_code}</div>
                  <div className="text-sm text-cream-muted">{new Date(o.created_at).toLocaleString()}</div>
                  <div className="text-xs text-cream-muted mt-1">{statusMap[o.status]}</div>
                </div>
                <button onClick={() => openDetail(o.id)} className="btn-primary text-xs px-3 py-2">Lihat</button>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="p-4 border rounded bg-dark-light">
              <h3 className="font-semibold text-cream mb-3">Panel Admin</h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="p-2 bg-white/5 rounded text-center">
                  <div className="text-2xl font-bold">{stats.total || 0}</div>
                  <div className="text-xs text-cream-muted">Total</div>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <div className="text-2xl font-bold">{stats.MENUNGGU_PEMBAYARAN || 0}</div>
                  <div className="text-xs text-cream-muted">Menunggu</div>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <div className="text-2xl font-bold">{stats.DIPROSES || 0}</div>
                  <div className="text-xs text-cream-muted">Diproses</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setStatusFilter('ALL'); setSearch(''); }} className="px-3 py-2 bg-white/5 rounded">Reset</button>
                <button onClick={fetch} className="px-3 py-2 bg-amber text-dark rounded">Segarkan</button>
              </div>
            </div>

            {selected ? (
              <div className="p-4 border rounded bg-dark-light">
                <h3 className="font-semibold text-cream mb-2">{selected.order_code}</h3>
                <div className="text-sm text-cream-muted mb-3">{new Date(selected.created_at).toLocaleString()}</div>
                <div className="mb-3 space-y-2">
                  {selected.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-sm">
                      <div>{it.name} x {it.quantity}</div>
                      <div>Rp {it.price}</div>
                    </div>
                  ))}
                </div>
                <div className="mb-3">Total: Rp {selected.total_amount}</div>
                <div className="mb-3">Catatan: {selected.customer_note || '-'}</div>
                <div className="space-x-2">
                  <button onClick={() => changeStatus(selected.id, 'MENUNGGU_PEMBAYARAN')} className="px-3 py-1 bg-white/5 rounded">Menunggu Pembayaran</button>
                  <button onClick={() => changeStatus(selected.id, 'DIPROSES')} className="px-3 py-1 bg-white/5 rounded">Diproses</button>
                  <button onClick={() => changeStatus(selected.id, 'SELESAI')} className="px-3 py-1 bg-white/5 rounded">Selesai</button>
                </div>
              </div>
            ) : (
              <div className="p-4 border rounded bg-dark-light text-cream-muted">Pilih pesanan untuk melihat detail</div>
            )}
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminOrders;
