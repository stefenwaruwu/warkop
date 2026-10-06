import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, ExternalLink, Trophy, FileText, Clock } from 'lucide-react';
import { getEventById } from '../services/api';

const StatusMap = { OPEN: 'status-open', SEGERA: 'status-segera', SELESAI: 'status-selesai' };
const StatusLabel = { OPEN: '● OPEN', SEGERA: '◐ SEGERA', SELESAI: '○ SELESAI' };

const formatDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';

const Countdown = ({ targetDate }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(time).map(([unit, val]) => (
        <div key={unit} className="text-center bg-white/5 border border-white/10 rounded-2xl px-5 py-4 min-w-[72px]">
          <div className="text-3xl font-bold text-amber font-playfair">{String(val).padStart(2, '0')}</div>
          <div className="text-cream-muted text-xs capitalize mt-1">{unit}</div>
        </div>
      ))}
    </div>
  );
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getEventById(id)
      .then(r => { setEvent(r.data); document.title = `${r.data.title} — Warkop BIntang`; })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-dark pt-20 flex items-center justify-center">
      <div className="text-cream-muted animate-pulse">Memuat event...</div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen bg-dark pt-20 flex flex-col items-center justify-center gap-4">
      <p className="text-cream-muted text-lg">Event tidak ditemukan</p>
      <Link to="/event" className="btn-outline text-sm">Kembali ke Event</Link>
    </div>
  );

  const imgSrc = event.image ? `/uploads/${event.image}` : `https://placehold.co/1200x600/2C1810/C97B36?text=${encodeURIComponent(event.title)}`;
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Hero Poster */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={imgSrc} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
          <span className={`${StatusMap[event.status]} mb-3 inline-block`}>{StatusLabel[event.status]}</span>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-cream">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back */}
        <Link to="/event" className="inline-flex items-center gap-2 text-cream-muted hover:text-amber transition-colors text-sm mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Kembali ke Event
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Date */}
            <div className="flex items-center gap-3 text-cream-muted">
              <Calendar size={18} className="text-amber" />
              <span className="text-sm">{formatDate(event.date)}</span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-cream font-semibold text-lg mb-3 flex items-center gap-2">
                <FileText size={18} className="text-amber" /> Tentang Event
              </h2>
              <p className="text-cream-muted leading-relaxed text-sm whitespace-pre-line">{event.description}</p>
            </div>

            {/* Syarat */}
            {event.requirements && (
              <div>
                <h2 className="text-cream font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-amber" /> Syarat & Ketentuan
                </h2>
                <div className="space-y-2">
                  {event.requirements.split('\n').filter(Boolean).map((req, i) => (
                    <div key={i} className="flex items-start gap-2 text-cream-muted text-sm">
                      <span className="text-amber mt-0.5 shrink-0">✓</span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Countdown */}
            {isUpcoming && event.status !== 'SELESAI' && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 text-cream-muted text-sm">
                  <Clock size={15} className="text-amber" />
                  <span>Countdown Event</span>
                </div>
                <Countdown targetDate={event.date} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Prize */}
            {event.prize && event.prize !== '-' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl bg-amber/10 border border-amber/30 p-5"
              >
                <h3 className="text-amber font-semibold flex items-center gap-2 mb-3">
                  <Trophy size={18} /> Hadiah
                </h3>
                <p className="text-cream text-sm leading-relaxed">{event.prize}</p>
              </motion.div>
            )}

            {/* Register CTA */}
            {event.status === 'OPEN' && event.register_link && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl bg-dark-light border border-white/10 p-5"
              >
                <h3 className="text-cream font-semibold mb-2 text-sm">Tertarik ikut?</h3>
                <p className="text-cream-muted text-xs mb-4">Pendaftaran masih dibuka. Segera daftarkan diri kamu!</p>
                <a
                  href={event.register_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`event-register-cta-${event.id}`}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
                >
                  <span>Daftar Sekarang</span>
                  <ExternalLink size={14} />
                </a>
              </motion.div>
            )}

            {event.status === 'SELESAI' && (
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center">
                <p className="text-cream-muted text-sm">Event ini telah selesai.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
