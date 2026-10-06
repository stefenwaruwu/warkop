import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trophy, Megaphone } from 'lucide-react';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/api';

const statusFilters = ['Semua', 'OPEN', 'SEGERA', 'SELESAI'];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeStatus, setActiveStatus] = useState('Semua');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Info & Event — Warkop BIntang';
    setLoading(true);
    getEvents()
      .then(r => { setEvents(r.data); setFiltered(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeStatus === 'Semua') {
      setFiltered(events);
    } else {
      setFiltered(events.filter(e => e.status === activeStatus));
    }
  }, [activeStatus, events]);

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
            Komunitas
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4"
          >
            Info &amp; <span className="text-gradient">Event</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-cream-muted max-w-lg mx-auto"
          >
            Pengumuman lomba, kegiatan komunitas, promo, dan informasi terbaru dari Warkop BIntang.
          </motion.p>
        </div>
      </section>

      {/* Info Banner */}
      <section className="px-4 py-6 bg-amber/10 border-y border-amber/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-3 md:mr-auto">
            <div className="w-10 h-10 rounded-xl bg-amber/20 flex items-center justify-center shrink-0">
              <Megaphone size={18} className="text-amber" />
            </div>
            <div>
              <p className="text-cream font-semibold text-sm">Mau ikut event?</p>
              <p className="text-cream-muted text-xs">Klik tombol "Daftar" pada event yang masih OPEN untuk mendaftar melalui Google Form atau hubungi penyelenggara.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Status Filter */}
      <section className="sticky top-16 md:top-20 z-30 bg-dark/95 backdrop-blur-lg border-b border-white/5 py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {statusFilters.map(status => (
            <button
              key={status}
              id={`status-filter-${status.toLowerCase()}`}
              onClick={() => setActiveStatus(status)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeStatus === status
                  ? 'bg-amber text-dark shadow-amber'
                  : 'bg-white/5 text-cream-muted hover:text-cream hover:bg-white/10 border border-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl bg-dark-light h-96 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Calendar size={48} className="text-cream-muted mx-auto mb-4 opacity-30" />
              <p className="text-cream-muted text-lg">Tidak ada event untuk filter ini</p>
              <button
                onClick={() => setActiveStatus('Semua')}
                className="btn-outline mt-6 text-sm"
              >
                Tampilkan Semua
              </button>
            </div>
          ) : (
            <>
              <p className="text-cream-muted text-sm mb-6">
                <span className="text-amber font-semibold">{filtered.length}</span> event ditemukan
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
