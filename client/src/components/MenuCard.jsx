import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const BadgeMap = {
  'Best Seller': 'badge-best-seller',
  'New': 'badge-new',
  'Promo': 'badge-promo',
};

const formatPrice = (price) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const MenuCard = ({ item, index = 0 }) => {
  const imgSrc = item.image
    ? `/uploads/${item.image}`
    : `https://placehold.co/400x300/2C1810/C97B36?text=${encodeURIComponent(item.name)}`;

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="card group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={imgSrc}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {item.badge && item.badge !== '' && (
          <div className="absolute top-3 left-3">
            <span className={BadgeMap[item.badge] || 'badge-new'}>{item.badge}</span>
          </div>
        )}

        {/* Category */}
        <div className="absolute top-3 right-3">
          <span className="bg-dark/70 backdrop-blur-sm text-cream-muted text-xs px-2 py-0.5 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-playfair text-lg font-semibold text-cream mb-1 line-clamp-1 group-hover:text-amber transition-colors duration-300">
          {item.name}
        </h3>
        {item.description && (
          <p className="text-cream-muted text-xs leading-relaxed mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-amber font-bold text-lg">{formatPrice(item.price)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex items-center gap-1.5 bg-amber/10 hover:bg-amber text-amber hover:text-dark text-xs font-semibold px-3 py-2 rounded-full transition-all duration-300"
            aria-label={`Pesan ${item.name}`}
          >
            <ShoppingBag size={13} />
            <span>Pesan</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
