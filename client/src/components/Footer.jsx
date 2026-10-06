import { Link } from 'react-router-dom';
import { Coffee, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark-deep border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-amber flex items-center justify-center shadow-amber">
                <Coffee size={18} className="text-dark" />
              </div>
              <span className="font-playfair text-xl font-bold text-cream">
                Warkop <span className="text-amber">BIntang</span>
              </span>
            </div>
            <p className="text-cream-muted text-sm leading-relaxed mb-5">
              Bukan sekadar warkop. Tempat nongkrong modern dengan suasana khas nusantara, kopi pilihan, dan komunitas yang hangat.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/stvenwaruwu?igsh=MWRnNDhqNXhvNXo3bQ=="
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-cream-muted hover:text-amber hover:bg-amber/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              {/* WhatsApp redirect removed — using internal ordering system */}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Menu', path: '/menu' },
                { label: 'Info & Event', path: '/event' },
                { label: 'Galeri', path: '/gallery' },
                { label: 'Tentang', path: '/about' },
                { label: 'Kontak', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream-muted text-sm hover:text-amber transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Kategori */}
          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">Kategori Menu</h4>
            <ul className="space-y-2">
              {['Kopi', 'Non Kopi', 'Makanan Berat', 'Snack', 'Paket Nongkrong'].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/menu?category=${cat}`}
                    className="text-cream-muted text-sm hover:text-amber transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-amber mt-0.5 shrink-0" />
                <span className="text-cream-muted text-sm">Jl. Wiliam Iskandar No. Berapa, Kota Berttam</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-amber shrink-0" />
                <a href="tel:+6282276177060" className="text-cream-muted text-sm hover:text-amber transition-colors">
                  082276177060
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-amber shrink-0" />
                <a href="mailto:hello@berttam.id" className="text-cream-muted text-sm hover:text-amber transition-colors">
                  hello@berttam.id
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-xl bg-amber/10 border border-amber/20">
              <p className="text-amber text-xs font-medium">Jam Buka</p>
              <p className="text-cream-muted text-xs mt-1">Setiap Hari: 08.00 – 24.00 WIB</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-cream-muted text-xs">
            © {new Date().getFullYear()} Warkop BIntang. All rights reserved.
          </p>
          <p className="text-cream-muted text-xs">
            Made with ☕ by{' '}
            <span className="text-amber font-medium">BIntang Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
