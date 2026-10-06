import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Coffee, LayoutDashboard, Utensils, CalendarDays, Image as ImageIcon, LogOut, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';

const AdminSidebar = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('berttam_token');
    localStorage.removeItem('berttam_user');
    navigate('/login');
  };

  const navs = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Kelola Menu', path: '/menu', icon: Utensils },
    { label: 'Kelola Event', path: '/events', icon: CalendarDays },
    { label: 'Kelola Galeri', path: '/gallery', icon: ImageIcon },
    { label: 'Pesanan', path: '/orders', icon: MenuIcon },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 mb-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center shadow-amber">
            <Coffee size={16} className="text-dark" />
          </div>
          <span className="font-playfair text-xl font-bold text-cream">Admin<span className="text-amber">Panel</span></span>
        </Link>
      </div>
      <div className="flex-1 px-4 space-y-2">
        {navs.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setMobileOpen(false)}
            className={`admin-sidebar-link ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span className="font-medium text-sm">{label}</span>
          </Link>
        ))}
      </div>
      <div className="p-4 mt-auto border-t border-white/5">
        <button
          onClick={handleLogout}
          className="admin-sidebar-link w-full text-rose-500 hover:text-rose-400 hover:bg-rose-500/10"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Keluar</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-dark flex">
      <aside className="hidden md:flex w-64 bg-dark-deep border-r border-white/5 flex-col fixed inset-y-0 z-20">
        <SidebarContent />
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-dark-deep border-b border-white/5 z-20 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center">
            <Coffee size={16} className="text-dark" />
          </div>
          <span className="font-playfair text-lg font-bold text-cream">Admin Panel</span>
        </Link>
        <button onClick={() => setMobileOpen(true)} className="text-cream p-2">
          <MenuIcon size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-dark-deep border-r border-white/5 flex flex-col h-full">
            <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-cream p-2">
              <X size={24} />
            </button>
            <div className="pt-16 flex flex-col h-full">
              <SidebarContent />
            </div>
          </aside>
        </div>
      )}

      <main className="flex-1 md:ml-64 w-full">
        <div className="pt-16 md:pt-0 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminSidebar;
