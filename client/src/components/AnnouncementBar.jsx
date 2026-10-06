import { Flame } from 'lucide-react';

const announcements = [
  '🔥 Turnamen Mobile Legends Warkop BIntang — Daftar Sekarang!',
  '☕ Promo Paket Nongkrong Duo — Hemat 20% Setiap Malam',
  '📸 Lomba Foto Kuliner #BIntangMoments — Hadiah Voucher 300K!',
  '🎉 Warkop BIntang buka setiap hari 08.00 – 24.00 WIB',
  '🏆 Total Hadiah Turnamen ML Season 1: Rp 2.550.000',
];

const AnnouncementBar = () => {
  return (
    <div className="bg-amber text-dark overflow-hidden py-2 z-40 relative">
      <div className="flex items-center">
        <div className="flex items-center gap-1.5 bg-dark text-amber px-4 py-0.5 shrink-0 z-10">
          <Flame size={13} />
          <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Hot</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex gap-16 whitespace-nowrap">
            {[...announcements, ...announcements].map((text, i) => (
              <span key={i} className="text-xs font-semibold shrink-0">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
