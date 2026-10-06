import { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { getMenus, getEvents, getGalleries } from '../../services/api';
import { Utensils, CalendarDays, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ menus: 0, events: 0, galleries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard — Admin Panel';
    Promise.all([getMenus(), getEvents(), getGalleries()])
      .then(([m, e, g]) => {
        setStats({ menus: m.data.length, events: e.data.length, galleries: g.data.length });
      })
      .catch(err => console.error('Error fetching stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Total Menu', value: stats.menus, icon: Utensils, color: 'text-amber', bg: 'bg-amber/20' },
    { label: 'Total Event', value: stats.events, icon: CalendarDays, color: 'text-emerald-500', bg: 'bg-emerald-500/20' },
    { label: 'Foto Galeri', value: stats.galleries, icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-500/20' },
  ];

  return (
    <AdminSidebar>
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="font-playfair text-3xl font-bold text-cream mb-2">Dashboard Overview</h1>
          <p className="text-cream-muted text-sm">Selamat datang di Panel Admin Warkop BIntang</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-dark-light border border-white/10 rounded-2xl p-6 flex items-center gap-5"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
                <stat.icon size={28} className={stat.color} />
              </div>
              <div>
                <p className="text-cream-muted text-sm mb-1">{stat.label}</p>
                {loading ? (
                  <div className="h-8 w-16 bg-white/5 rounded animate-pulse" />
                ) : (
                  <p className="text-3xl font-bold text-cream font-playfair">{stat.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-dark-light border border-white/10 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-cream mb-3">Siap berkreasi hari ini?</h2>
          <p className="text-cream-muted text-sm leading-relaxed">
            Gunakan menu di sidebar kiri untuk mulai mengelola konten website. Anda dapat menambah menu baru, mengumumkan event komunitas, dan mengunggah foto keseruan warkop.
          </p>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminDashboard;
