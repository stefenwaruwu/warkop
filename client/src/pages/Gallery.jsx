import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Images, X } from 'lucide-react';
import { getGalleries } from '../services/api';

const categories = ['Semua', 'makanan', 'interior', 'kegiatan'];
const catLabel = { makanan: 'Makanan', interior: 'Interior', kegiatan: 'Kegiatan' };

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Galeri — Warkop BIntang';
    setLoading(true);
    getGalleries()
      .then(r => { setGalleries(r.data); setFiltered(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === 'Semua') setFiltered(galleries);
    else setFiltered(galleries.filter(g => g.category === activeCategory));
  }, [activeCategory, galleries]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Header */}
      <section className="py-16 px-4 bg-dark-deep border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-4 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20">
            Galeri
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
            Galeri <span className="text-gradient">BIntang</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-cream-muted max-w-lg mx-auto">
            Momen-momen berharga dari suasana, makanan, dan kegiatan di Warkop BIntang.
          </motion.p>
        </div>
      </section>

      {/* Filter */}
      <section className="sticky top-16 md:top-20 z-30 bg-dark/95 backdrop-blur-lg border-b border-white/5 py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              id={`gallery-filter-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-amber text-dark shadow-amber'
                  : 'bg-white/5 text-cream-muted hover:text-cream hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat === 'Semua' ? 'Semua' : catLabel[cat]}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`break-inside-avoid rounded-2xl bg-dark-light animate-pulse`} style={{ height: `${200 + (i % 3) * 60}px` }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Images size={48} className="text-cream-muted mx-auto mb-4 opacity-30" />
              <p className="text-cream-muted">Belum ada foto di kategori ini</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((item, i) => {
                const src = item.image
                  ? `/uploads/${item.image}`
                  : `https://placehold.co/400x${280 + (i % 4) * 60}/2C1810/C97B36?text=${encodeURIComponent(item.caption || 'BIntang')}`;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer mb-4"
                    onClick={() => setLightbox(item)}
                    id={`gallery-item-${item.id}`}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={src}
                        alt={item.caption || 'Gallery BIntang'}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-all duration-300 flex flex-col justify-end p-3">
                        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          {item.caption && (
                            <p className="text-white text-xs font-medium">{item.caption}</p>
                          )}
                          {item.category && (
                            <span className="text-amber text-xs capitalize">{catLabel[item.category] || item.category}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-cream-muted hover:text-cream p-2 rounded-xl hover:bg-white/10"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightbox.image ? `/uploads/${lightbox.image}` : `https://placehold.co/800x600/2C1810/C97B36?text=${encodeURIComponent(lightbox.caption || 'BIntang')}`}
              alt={lightbox.caption}
              className="max-h-[85vh] max-w-full object-contain"
            />
            {lightbox.caption && (
              <div className="bg-dark-light px-5 py-3">
                <p className="text-cream text-sm">{lightbox.caption}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
