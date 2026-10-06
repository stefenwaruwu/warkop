import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Star, Zap } from 'lucide-react';
import AnnouncementBar from '../components/AnnouncementBar';
import MenuCard from '../components/MenuCard';
import EventCard from '../components/EventCard';
import { getMenus, getEvents, getGalleries } from '../services/api';

const SectionHeader = ({ tag, title, subtitle }) => (
  <div className="text-center mb-12">
    {tag && (
      <span className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-3 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20">
        {tag}
      </span>
    )}
    <h2 className="section-title">{title}</h2>
    <div className="section-divider" />
    {subtitle && <p className="section-subtitle max-w-xl mx-auto">{subtitle}</p>}
  </div>
);

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    getMenus().then(r => setMenus(r.data.slice(0, 6))).catch(() => {});
    getEvents().then(r => setEvents(r.data.slice(0, 3))).catch(() => {});
    getGalleries().then(r => setGalleries(r.data.slice(0, 6))).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      {/* Announcement Bar */}
      <div className="pt-16 md:pt-20">
        <AnnouncementBar />
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0e0a 0%, #2C1810 40%, #3d2416 70%, #1a0e0a 100%)',
        }}
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber/10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-amber/5 blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/5 blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,123,54,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,123,54,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 text-amber text-xs font-semibold px-5 py-2 rounded-full mb-8"
          >
            <Zap size={13} />
            <span>Warkop Komunitas Modern Nusantara</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight mb-4"
          >
            Bukan Sekadar
            <br />
            <span className="text-gradient">Warkop.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-cream-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tempat nongkrong modern dengan kopi pilihan, suasana hangat khas nusantara, dan komunitas yang menyenangkan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/menu" id="hero-cta-menu" className="btn-primary text-base px-8 py-3.5 flex items-center justify-center gap-2">
              <span>Lihat Menu</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/event" id="hero-cta-event" className="btn-outline text-base px-8 py-3.5 flex items-center justify-center gap-2">
              <span>Info & Event</span>
              <Zap size={16} />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center justify-center gap-8 mt-16 text-center"
          >
            {[
              { value: '50+', label: 'Menu Pilihan' },
              { value: '2K+', label: 'Pelanggan Setia' },
              { value: '10+', label: 'Event Per Bulan' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-3xl font-bold text-gradient font-playfair">{stat.value}</div>
                <div className="text-cream-muted text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-cream-muted text-xs">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-0.5 h-8 bg-gradient-to-b from-amber to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── MENU FAVORIT ─────────────────────────────────── */}
      <section id="menu-favorit" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Menu Pilihan"
            title="Menu Favorit BIntang"
            subtitle="Dari kopi robusta pilihan hingga camilan nusantara, semua ada di sini."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menus.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu" className="btn-outline inline-flex items-center gap-2">
              <span>Lihat Semua Menu</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── EVENT TERBARU ─────────────────────────────────── */}
      <section id="event-terbaru" className="py-24 px-4 bg-dark-deep">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Komunitas"
            title="Event & Pengumuman"
            subtitle="Ikuti lomba, kegiatan komunitas, dan promo eksklusif dari Warkop BIntang."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/event" className="btn-outline inline-flex items-center gap-2">
              <span>Lihat Semua Event</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALERI PREVIEW ──────────────────────────────── */}
      <section id="galeri-preview" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            tag="Galeri"
            title="Suasana BIntang"
            subtitle="Sekilas pandang tentang keindahan dan kehangatan Warkop BIntang."
          />
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {galleries.map((item, i) => {
              const src = item.image
                ? `/uploads/${item.image}`
                : `https://placehold.co/400x${300 + (i % 3) * 80}/2C1810/C97B36?text=${encodeURIComponent(item.caption || 'BIntang')}`;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={src}
                      alt={item.caption || 'Gallery'}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300 flex items-end p-3">
                      <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-outline inline-flex items-center gap-2">
              <span>Lihat Semua Foto</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TENTANG SINGKAT ─────────────────────────────── */}
      <section id="tentang-singkat" className="py-24 px-4 bg-dark-deep">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-3 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20">
                Tentang Kami
              </span>
              <h2 className="section-title text-left mb-4">
                Lebih dari Sekadar Tempat Ngopi
              </h2>
              <p className="text-cream-muted leading-relaxed mb-6">
                Warkop BIntang lahir dari semangat untuk menciptakan ruang komunitas yang hangat — tempat di mana semua orang bisa bersantai, berkreasi, dan berkembang bersama. Kami memadukan cita rasa kopi nusantara dengan suasana modern yang nyaman.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Star, label: 'Kualitas Premium', desc: 'Biji kopi pilihan robusta & arabika' },
                  { icon: MapPin, label: 'Lokasi Strategis', desc: 'Mudah dijangkau dari mana saja' },
                  { icon: Clock, label: 'Buka Setiap Hari', desc: '08.00 – 24.00 WIB' },
                  { icon: Zap, label: 'Komunitas Aktif', desc: 'Event & turnamen rutin' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-amber/20 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-amber" />
                    </div>
                    <div>
                      <p className="text-cream text-xs font-semibold">{label}</p>
                      <p className="text-cream-muted text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                <span>Selengkapnya</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-amber-lg">
                <img
                  src="https://placehold.co/600x500/3d2416/C97B36?text=Warkop+BIntang"
                  alt="Suasana Warkop BIntang"
                  className="w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-dark-light border border-white/10 rounded-2xl p-4 shadow-dark">
                <p className="text-amber font-bold text-2xl font-playfair">4.9 ⭐</p>
                <p className="text-cream-muted text-xs">Rating Pelanggan</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOKASI ─────────────────────────────────────── */}
      <section id="lokasi" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader tag="Lokasi" title="Temukan Kami" subtitle="Kunjungi langsung atau hubungi kami untuk reservasi atau informasi." />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden h-64 bg-dark-light border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={40} className="text-amber mx-auto mb-3" />
                <p className="text-cream font-semibold">Jl. Nusantara No. 88</p>
                <p className="text-cream-muted text-sm">Kota Berttam</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Alamat', value: 'Jl. Nusantara No. 88, Kota Berttam' },
                { icon: Clock, label: 'Jam Buka', value: 'Setiap Hari: 08.00 – 24.00 WIB' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-amber/20 flex items-center justify-center">
                    <Icon size={18} className="text-amber" />
                  </div>
                  <div>
                    <p className="text-cream-muted text-xs">{label}</p>
                    <p className="text-cream font-medium text-sm">{value}</p>
                  </div>
                </div>
              ))}
              <Link to="/contact" className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
                <span>Hubungi Kami</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
