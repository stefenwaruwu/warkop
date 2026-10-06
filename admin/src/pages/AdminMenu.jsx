import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { getMenus, createMenu, updateMenu, deleteMenu } from '../services/api';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Utensils } from 'lucide-react';

const categories = ['Kopi', 'Non Kopi', 'Makanan Berat', 'Snack', 'Paket Nongkrong'];
const badges = ['', 'Best Seller', 'New', 'Promo'];

const AdminMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'Kopi', price: '', description: '', badge: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMenus = () => {
    setLoading(true);
    getMenus()
      .then((r) => setMenus(r.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = 'Kelola Menu — Admin Panel';
    fetchMenus();
  }, []);

  const openModal = (menu = null) => {
    if (menu) {
      setEditId(menu.id);
      setFormData({ name: menu.name, category: menu.category, price: menu.price, description: menu.description || '', badge: menu.badge || '' });
      setImagePreview(menu.image ? `/uploads/${menu.image}` : null);
    } else {
      setEditId(null);
      setFormData({ name: '', category: 'Kopi', price: '', description: '', badge: '' });
      setImagePreview(null);
    }
    setImageFile(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      if (editId) {
        await updateMenu(editId, data);
      } else {
        await createMenu(data);
      }
      setShowModal(false);
      fetchMenus();
    } catch (err) {
      alert(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus menu ini?')) {
      try {
        await deleteMenu(id);
        fetchMenus();
      } catch (err) {
        alert('Gagal menghapus menu');
      }
    }
  };

  return (
    <AdminSidebar>
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-cream mb-1">Kelola Menu</h1>
            <p className="text-cream-muted text-sm">Daftar menu makanan & minuman Warkop BIntang</p>
          </div>
          <button onClick={() => openModal()} className="btn-primary py-2.5 px-4 text-sm flex items-center gap-2">
            <Plus size={16} /> Tambah Menu
          </button>
        </div>

        <div className="bg-dark-light border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-cream-muted">
              <thead className="bg-white/5 text-cream border-b border-white/10">
                <tr>
                  <th className="p-4 font-semibold">Menu</th>
                  <th className="p-4 font-semibold">Kategori</th>
                  <th className="p-4 font-semibold">Harga</th>
                  <th className="p-4 font-semibold">Badge</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="p-8 text-center text-cream-muted">Memuat data...</td></tr>
                ) : menus.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-cream-muted">Belum ada data menu.</td></tr>
                ) : (
                  menus.map((m) => (
                    <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-dark overflow-hidden shrink-0">
                          {m.image ? (
                            <img src={`/uploads/${m.image}`} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-amber/10 text-amber"><Utensils size={16} /></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-cream">{m.name}</p>
                          <p className="text-xs truncate max-w-[200px]">{m.description || '-'}</p>
                        </div>
                      </td>
                      <td className="p-4">{m.category}</td>
                      <td className="p-4 text-amber font-semibold">Rp {Number(m.price).toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        {m.badge ? <span className="px-2 py-1 bg-amber/20 text-amber text-xs rounded-md border border-amber/30">{m.badge}</span> : '-'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openModal(m)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(m.id)} className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => !isSubmitting && setShowModal(false)} />
          <div className="bg-dark-deep border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 p-6 md:p-8">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-cream-muted hover:text-cream"><X size={20} /></button>
            <h2 className="text-xl font-bold text-cream mb-6">{editId ? 'Edit Menu' : 'Tambah Menu Baru'}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Nama Menu *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="Contoh: Kopi Susu BIntang" />
                </div>
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Harga (Rp) *</label>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input-field" placeholder="Contoh: 15000" />
                </div>
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Kategori *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field bg-dark">
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Badge (Opsional)</label>
                  <select value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} className="input-field bg-dark">
                    {badges.map((b) => <option key={b} value={b}>{b || 'Tidak ada'}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-cream-muted mb-2">Deskripsi</label>
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field resize-none" placeholder="Deskripsi menu..." />
              </div>

              <div>
                <label className="block text-xs text-cream-muted mb-2">Gambar / Foto Menu</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-xl bg-dark border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-cream-muted" />}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-cream-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber/20 file:text-amber hover:file:bg-amber/30 cursor-pointer" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline px-6 py-2.5 text-sm">Batal</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary px-6 py-2.5 text-sm">{isSubmitting ? 'Menyimpan...' : 'Simpan Menu'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminSidebar>
  );
};

export default AdminMenu;
