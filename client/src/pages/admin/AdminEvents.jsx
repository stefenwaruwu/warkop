import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/api';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const statuses = ['OPEN', 'SEGERA', 'SELESAI'];

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({ title: '', date: '', status: 'SEGERA', description: '', prize: '', requirements: '', register_link: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEvents = () => {
    setLoading(true);
    getEvents()
      .then(r => setEvents(r.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = 'Kelola Event — Admin Panel';
    fetchEvents();
  }, []);

  const openModal = (event = null) => {
    if (event) {
      setEditId(event.id);
      setFormData({ 
        title: event.title, 
        date: event.date.split('T')[0], 
        status: event.status, 
        description: event.description || '', 
        prize: event.prize || '', 
        requirements: event.requirements || '', 
        register_link: event.register_link || '' 
      });
      setImagePreview(event.image ? `/uploads/${event.image}` : null);
    } else {
      setEditId(null);
      setFormData({ title: '', date: '', status: 'SEGERA', description: '', prize: '', requirements: '', register_link: '' });
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
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      if (editId) await updateEvent(editId, data);
      else await createEvent(data);
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus event ini?')) {
      try {
        await deleteEvent(id);
        fetchEvents();
      } catch (err) {
        alert('Gagal menghapus event');
      }
    }
  };

  return (
    <AdminSidebar>
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="font-playfair text-2xl font-bold text-cream mb-1">Kelola Event</h1>
            <p className="text-cream-muted text-sm">Daftar kegiatan, lomba, dan pengumuman komunitas</p>
          </div>
          <button onClick={() => openModal()} className="btn-primary py-2.5 px-4 text-sm flex items-center gap-2">
            <Plus size={16} /> Tambah Event
          </button>
        </div>

        <div className="bg-dark-light border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-cream-muted">
              <thead className="bg-white/5 text-cream border-b border-white/10">
                <tr>
                  <th className="p-4 font-semibold">Judul Event</th>
                  <th className="p-4 font-semibold">Tanggal</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" className="p-8 text-center text-cream-muted">Memuat data...</td></tr>
                ) : events.length === 0 ? (
                  <tr><td colSpan="4" className="p-8 text-center text-cream-muted">Belum ada data event.</td></tr>
                ) : (
                  events.map(e => (
                    <tr key={e.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-dark overflow-hidden shrink-0">
                          {e.image ? (
                            <img src={`/uploads/${e.image}`} alt={e.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-amber/10 text-amber"><ImageIcon size={16} /></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-cream">{e.title}</p>
                          <p className="text-xs truncate max-w-[250px]">{e.description || '-'}</p>
                        </div>
                      </td>
                      <td className="p-4">{new Date(e.date).toLocaleDateString('id-ID')}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          e.status === 'OPEN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          e.status === 'SEGERA' ? 'bg-amber/20 text-amber border border-amber/30' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openModal(e)} className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(e.id)} className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors">
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

      {/* Modal CRUD */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => !isSubmitting && setShowModal(false)} />
          <div className="bg-dark-deep border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 p-6 md:p-8">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-cream-muted hover:text-cream"><X size={20} /></button>
            <h2 className="text-xl font-bold text-cream mb-6">{editId ? 'Edit Event' : 'Tambah Event Baru'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-xs text-cream-muted mb-2">Judul Event *</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field" placeholder="Contoh: Turnamen Mobile Legends" />
                </div>
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Tanggal *</label>
                  <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Status *</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="input-field bg-dark">
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-cream-muted mb-2">Hadiah (Opsional)</label>
                  <input type="text" value={formData.prize} onChange={e => setFormData({...formData, prize: e.target.value})} className="input-field" placeholder="Contoh: Juara 1: Rp 1.000.000" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-cream-muted mb-2">Link Pendaftaran (Opsional)</label>
                  <input type="url" value={formData.register_link} onChange={e => setFormData({...formData, register_link: e.target.value})} className="input-field" placeholder="Contoh: https://forms.gle/... atau WhatsApp" />
                  <p className="text-[10px] text-cream-muted mt-1">Gunakan link Google Form, WhatsApp, dll. Jangan buat link internal.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Deskripsi</label>
                  <textarea rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="input-field resize-none" placeholder="Ceritakan detail event..." />
                </div>
                <div>
                  <label className="block text-xs text-cream-muted mb-2">Syarat & Ketentuan</label>
                  <textarea rows="4" value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} className="input-field resize-none" placeholder="Tiap baris untuk 1 syarat..." />
                </div>
              </div>

              <div>
                <label className="block text-xs text-cream-muted mb-2">Poster Event (16:9 disarankan)</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 rounded-xl bg-dark border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-cream-muted" />}
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-cream-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber/20 file:text-amber hover:file:bg-amber/30 cursor-pointer" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline px-6 py-2.5 text-sm">Batal</button>
                <button type="submit" disabled={isSubmitting} className="btn-primary px-6 py-2.5 text-sm">{isSubmitting ? 'Menyimpan...' : 'Simpan Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminSidebar>
  );
};

export default AdminEvents;
