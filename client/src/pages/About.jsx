import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Heart, Users, Star, Zap, MapPin } from 'lucide-react';

const values = [
  { icon: Coffee, title: 'Kualitas Kopi', desc: 'Biji kopi robusta dan arabika dipilih langsung dari petani lokal terbaik nusantara.' },
  { icon: Heart, title: 'Kehangatan', desc: 'Kami percaya bahwa tempat nongkrong yang baik dimulai dari atmosfer yang hangat dan ramah.' },
  { icon: Users, title: 'Komunitas', desc: 'Lebih dari warkop — kami adalah ruang berkumpulnya orang-orang kreatif dan komunitas lokal.' },
  { icon: Zap, title: 'Inovasi', desc: 'Terus berinovasi menghadirkan menu baru, event seru, dan pengalaman berbeda setiap harinya.' },
];

const team = [
  { name: 'OWI', role: 'Founder & Owner', emoji: '👨‍💼' },
  { name: 'OWO', role: 'Head Barista', emoji: '☕' },
  { name: 'BRAN', role: 'Event Manager', emoji: '🎯' },
];

const About = () => {
  useEffect(() => { document.title = 'Tentang — Warkop BIntang'; }, []);

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Header */}
      <section className="py-20 px-4 bg-dark-deep border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber/5 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-4 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20">
            Tentang Kami
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-6">
            Cerita di Balik<br /><span className="text-gradient">Warkop BIntang</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-cream-muted max-w-2xl mx-auto leading-relaxed">
            Lahir dari mimpi sederhana: menciptakan tempat di mana semua orang bisa bersantai, ngobrol, dan menemukan komunitas mereka sambil menikmati kopi terbaik.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-cream mb-6">
              Bukan Sekadar Warung Kopi
            </h2>
            <div className="space-y-4 text-cream-muted leading-relaxed">
              <p>Warkop BIntang pertama kali dibuka pada tahun 2022 dengan visi yang sederhana namun kuat: menjadi lebih dari sekadar tempat minum kopi. Kami ingin hadir sebagai pusat komunitas yang hangat, di mana setiap orang merasa diterima.</p>
              <p>Nama "BIntang" terinspirasi dari kata "bertam" dalam bahasa lokal yang berarti "berkumpul bersama." Inilah esensi kami — tempat di mana orang-orang datang bukan hanya untuk kopi, tetapi untuk koneksi.</p>
              <p>Dari satu gerobak kopi kecil di pojok jalan, kini Warkop BIntang telah berkembang menjadi destinasi nongkrong favorit dengan ratusan pelanggan setia setiap harinya.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative overflow-hidden rounded-[36px] shadow-[0_40px_120px_rgba(201,123,54,0.15)]">
              <img
                src="/images/warkop.jpg"
                alt="Interior Warkop BIntang"
                className="w-full h-full min-h-[420px] object-cover rounded-[36px] border border-white/10 transition-transform duration-700 hover:scale-[1.02]" />
              <div className="absolute bottom-6 left-6 bg-dark/90 border border-amber/20 rounded-3xl p-5 backdrop-blur-md">
                <p className="text-amber text-3xl font-playfair font-bold">Warkop BIntang</p>
                <p className="text-cream-muted text-sm mt-1 max-w-xs">Rasakan suasana modern dan hangat yang dirancang khusus untuk para pecinta kopi dan komunitas.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-dark-deep">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-3 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20">Nilai Kami</span>
            <h2 className="section-title">Yang Kami Jaga</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber/30 transition-colors">
                  <Icon size={24} className="text-amber" />
                </div>
                <h3 className="font-playfair text-lg font-semibold text-cream mb-2">{title}</h3>
                <p className="text-cream-muted text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-3 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20">Tim Kami</span>
            <h2 className="section-title">Orang-orang di Balik BIntang</h2>
            <div className="section-divider" />
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {team.map(({ name, role, emoji }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="card p-8 text-center w-56 group"
              >
                <div className="w-20 h-20 rounded-full bg-amber/20 flex items-center justify-center mx-auto mb-4 text-4xl group-hover:scale-110 transition-transform">
                  {emoji}
                </div>
                <h3 className="font-playfair text-lg font-semibold text-cream">{name}</h3>
                <p className="text-amber text-xs mt-1">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 px-4 bg-amber">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2022', label: 'Tahun Berdiri' },
              { value: '50+', label: 'Menu Tersedia' },
              { value: '2K+', label: 'Pelanggan Setia' },
              { value: '10+', label: 'Event per Bulan' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-dark font-playfair">{stat.value}</div>
                <div className="text-dark/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
