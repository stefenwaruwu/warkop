import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import MenuCard from '../components/MenuCard';
import { getMenus } from '../services/api';

const categories = ['Semua', 'Kopi', 'Non Kopi', 'Makanan Berat', 'Snack', 'Paket Nongkrong'];

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Menu — Warkop BIntang';
    setLoading(true);
    getMenus()
      .then(r => { setMenus(r.data); setFiltered(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = menus;
    if (activeCategory !== 'Semua') {
      result = result.filter(m => m.category === activeCategory);
    }
    if (search.trim()) {
      result = result.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.description && m.description.toLowerCase().includes(search.toLowerCase()))
      );
    }
    setFiltered(result);
  }, [activeCategory, search, menus]);

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Header */}
      <section className="py-16 px-4 bg-dark-deep border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-4 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20"
          >
            Menu Kami
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4"
          >
            Menu <span className="text-gradient">Warkop BIntang</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cream-muted max-w-lg mx-auto"
          >
            Temukan menu favorit kamu — dari kopi robusta bold hingga camilan nusantara yang nagih.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-dark/95 backdrop-blur-lg border-b border-white/5 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-muted" />
            <input
              id="menu-search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari menu..."
              className="input-field pl-10 py-2.5 text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream-muted hover:text-cream"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 w-full md:w-auto scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                id={`category-${cat.replace(' ', '-').toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-amber text-dark shadow-amber'
                    : 'bg-white/5 text-cream-muted hover:text-cream hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-dark-light h-72 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Filter size={48} className="text-cream-muted mx-auto mb-4 opacity-30" />
              <p className="text-cream-muted text-lg">Menu tidak ditemukan</p>
              <p className="text-cream-muted text-sm mt-1">Coba kata kunci atau kategori lain</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('Semua'); }}
                className="btn-outline mt-6 text-sm"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <p className="text-cream-muted text-sm mb-6">
                Menampilkan <span className="text-amber font-semibold">{filtered.length}</span> menu
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((item, i) => (
                  <MenuCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;
