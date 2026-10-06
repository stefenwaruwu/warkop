import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';

const StatusMap = {
  OPEN: 'status-open',
  SEGERA: 'status-segera',
  SELESAI: 'status-selesai',
};

const StatusLabel = {
  OPEN: '● OPEN',
  SEGERA: '◐ SEGERA',
  SELESAI: '○ SELESAI',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

const EventCard = ({ event, index = 0 }) => {
  const imgSrc = event.image
    ? `/uploads/${event.image}`
    : `https://placehold.co/600x400/2C1810/C97B36?text=${encodeURIComponent(event.title)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group overflow-hidden"
    >
      {/* Poster */}
      <div className="relative overflow-hidden h-56">
        <img
          src={imgSrc}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={StatusMap[event.status] || 'status-segera'}>
            {StatusLabel[event.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-cream-muted text-xs mb-2">
          <Calendar size={13} className="text-amber" />
          <span>{formatDate(event.date)}</span>
        </div>

        <h3 className="font-playfair text-lg font-semibold text-cream mb-2 line-clamp-2 group-hover:text-amber transition-colors duration-300">
          {event.title}
        </h3>

        <p className="text-cream-muted text-xs leading-relaxed line-clamp-2 mb-4">
          {event.description}
        </p>

        {event.prize && (
          <div className="mb-4 px-3 py-2 rounded-xl bg-amber/10 border border-amber/20">
            <p className="text-amber text-xs font-semibold">🏆 {event.prize}</p>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            to={`/event/${event.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 btn-outline text-xs py-2"
            id={`event-detail-${event.id}`}
          >
            <span>Detail</span>
            <ArrowRight size={13} />
          </Link>
          {event.status === 'OPEN' && event.register_link && (
            <a
              href={event.register_link}
              target="_blank"
              rel="noopener noreferrer"
              id={`event-register-${event.id}`}
              className="flex-1 flex items-center justify-center gap-1.5 btn-primary text-xs py-2"
            >
              <span>Daftar</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
