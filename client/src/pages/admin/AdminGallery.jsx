import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { getGalleries, createGallery, deleteGallery } from '../../services/api';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';

const categories = ['interior', 'makanan', 'kegiatan'];

const AdminGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({ caption: '', category: 'interior' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchGalleries = () => {
    setLoading(true);
    getGalleries()
      .then(r => setGalleries(r.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = 'Kelola Galeri — Admin Panel';
    fetchGalleries();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert('Silakan pilih foto terlebih dahulu');

    setUploading(true);
    const data = new FormData();
    data.append('image', imageFile);
    data.append('caption', formData.caption);
    data.append('category', formData.category);

    try {
      await createGallery(data);
      // Reset form
      setFormData({ caption: '', category: 'interior' });
      setImageFile(null);
      setImagePreview(null);
      document.getElementById('gallery-file-input').value = '';
      fetchGalleries();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengupload foto');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus foto ini dari galeri?')) {
      try {
        await deleteGallery(id);
        fetchGalleries();
      } catch (err) {
        alert('Gagal menghapus foto');
      }
    }
  };

  return (
    <AdminSidebar>
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-playfair text-2xl font-bold text-cream mb-1">Kelola Galeri</h1>
          <p className="text-cream-muted text-sm">Upload foto suasana, makanan, atau kegiatan ke halaman Galeri</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Upload */}
          <div className="lg:col-span-1">
            <div className="bg-dark-light border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-cream mb-4 flex items-center gap-2">
                <Upload size={18} className="text-amber" /> Upload Foto
              </h2>
              
              <form onSubmit={handleUpload} className="space-y-4">
                {/* Image Preview Box */}
                <div 
                  className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-white/20 bg-dark/50 flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer"
                  onClick={() => document.getElementById('gallery-file-input').click()}
                >
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-dark/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium bg-dark-deep/80 px-3 py-1.5 rounded-lg">Ganti Foto</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon size={32} className="text-cream-muted mx-auto mb-2" />
                      <p className="text-cream-muted text-xs">Klik untuk memilih foto (JPG, PNG)</p>
                    </div>
                  )}
                </div>
                <input id="gallery-file-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

                <div>
                  <label className="block text-xs text-cream-muted mb-1.5">Caption (Opsional)</label>
                  <input type="text" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="input-field py-2 text-sm" placeholder="Contoh: Suasana malam minggu" />
                </div>
                <div>
                  <label className="block text-xs text-cream-muted mb-1.5">Kategori</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="input-field py-2 text-sm bg-dark">
                    {categories.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                  </select>
                </div>

                <button type="submit" disabled={uploading || !imageFile} className="btn-primary w-full py-2.5 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <Upload size={16} /> {uploading ? 'Mengupload...' : 'Upload ke Galeri'}
                </button>
              </form>
            </div>
          </div>

          {/* Grid Foto */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-dark-light rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : galleries.length === 0 ? (
              <div className="text-center py-20 bg-dark-light/50 border border-white/5 rounded-2xl">
                <ImageIcon size={48} className="text-cream-muted/30 mx-auto mb-3" />
                <p className="text-cream-muted">Galeri masih kosong</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleries.map(item => (
                  <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden bg-dark">
                    {item.image ? (
                      <img src={`/uploads/${item.image}`} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-amber/5 text-amber/40">No Image</div>
                    )}
                    
                    {/* Overlay info & actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                      <div className="flex justify-end">
                        <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors backdrop-blur-sm">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium truncate mb-1">{item.caption || '-'}</p>
                        <span className="inline-block px-2 py-0.5 rounded border border-white/20 bg-white/10 text-white/70 text-[10px] capitalize backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminGallery;
