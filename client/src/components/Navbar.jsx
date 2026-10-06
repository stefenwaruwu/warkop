import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Menu', path: '/menu' },
  { label: 'Info & Event', path: '/event' },
  { label: 'Galeri', path: '/gallery' },
  { label: 'Tentang', path: '/about' },
  { label: 'Kontak', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-lg shadow-dark border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-amber flex items-center justify-center shadow-amber group-hover:shadow-amber-lg transition-all duration-300">
                <Coffee size={18} className="text-dark" />
              </div>
              <span className="font-playfair text-xl font-bold text-cream group-hover:text-amber transition-colors duration-300">
                Warkop <span className="text-amber">BIntang</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-amber bg-amber/10'
                      : 'text-cream-muted hover:text-cream hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA and Cart */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/cart" className="text-cream-muted hover:text-cream">
                <div className="relative">
                  <ShoppingCart size={18} />
                  <span className="absolute -top-2 -right-3 bg-amber text-dark text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{totalCount}</span>
                </div>
              </Link>
              <Link to="/menu" className="btn-primary text-sm py-2 px-5">
                Pesan Sekarang
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              id="nav-mobile-toggle"
              className="md:hidden text-cream p-2 rounded-xl hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-dark/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-dark-deep border-l border-white/10 flex flex-col pt-20 px-6 pb-8">
              <div className="flex flex-col gap-1 mb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === link.path
                        ? 'text-amber bg-amber/10 border border-amber/20'
                        : 'text-cream-muted hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link to="/menu" className="btn-primary text-sm text-center">
                Pesan Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
