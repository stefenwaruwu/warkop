import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  useEffect(() => { document.title = 'Kontak — Warkop BIntang'; }, []);

  const handleCall = () => {
    window.location.href = 'tel:+6282276177060';
  };

  return (
    <div className="min-h-screen bg-dark pt-20">
      {/* Header */}
      <section className="py-16 px-4 bg-dark-deep border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-amber text-xs font-semibold uppercase tracking-widest mb-4 bg-amber/10 px-4 py-1.5 rounded-full border border-amber/20">
            Kontak
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-playfair text-4xl md:text-5xl font-bold text-cream mb-4">
            Hubungi <span className="text-gradient">Kami</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-cream-muted max-w-md mx-auto">
            Ada pertanyaan, saran, atau ingin reservasi? Kami siap membantu.
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-cream">Informasi Kontak</h2>

            {[
              { icon: MapPin, label: 'Alamat', value: 'Jl. wiliam iskandar No. brapa, Kota Berttam', action: null },
              { icon: Phone, label: 'Telepon', value: '+62 822-7617-7060', action: 'tel:+6282276177060' },
              { icon: Mail, label: 'Email', value: 'stefennnw@gmail.com', action: 'mailto:stefennnw@gmail.com' },
              { icon: Clock, label: 'Jam Buka', value: 'Setiap Hari: 08.00 – tutup', action: null },
            ].map(({ icon: Icon, label, value, action }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber/30 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-amber/20 flex items-center justify-center shrink-0 group-hover:bg-amber/30 transition-colors">
                  <Icon size={18} className="text-amber" />
                </div>
                <div>
                  <p className="text-cream-muted text-xs mb-0.5">{label}</p>
                  {action ? (
                    <a href={action} className="text-cream font-medium hover:text-amber transition-colors">{value}</a>
                  ) : (
                    <p className="text-cream font-medium">{value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <div>
              <h3 className="text-cream font-semibold text-sm mb-3">Media Sosial</h3>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/stvenwaruwu?igsh=MWRnNDhqNXhvNXo3bQ==" target="_blank" rel="noopener noreferrer" id="contact-instagram"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cream-muted hover:text-amber hover:border-amber/30 transition-all text-sm">
                  <Instagram size={16} /> Instagram
                </a>
                <button onClick={handleCall} id="contact-call"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-cream-muted hover:text-amber hover:border-amber/30 transition-all text-sm">
                  <Phone size={16} /> Telepon
                </button>
              </div>
            </div>

            {/* Quick WA CTA */}
            <button
              onClick={handleCall}
              id="contact-call-cta"
              className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base"
            >
              <Phone size={20} />
              <span>Hubungi via Telepon</span>
            </button>
          </div>

          {/* Quick Message Form (static - sends to WA) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-dark-light border border-white/10 p-8"
          >
            <h2 className="font-playfair text-2xl font-bold text-cream mb-2">Kirim Pesan</h2>
            <p className="text-cream-muted text-sm mb-6">Isi form di bawah untuk mengirim pesan melalui email kami.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = e.target.name.value;
                const msg = e.target.message.value;
                const subject = encodeURIComponent(`Pesan dari ${name}`);
                const body = encodeURIComponent(msg);
                window.location.href = `mailto:stefennnw@gmail.com?subject=${subject}&body=${body}`;
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-cream-muted text-xs font-medium block mb-1.5">Nama</label>
                <input id="contact-name" name="name" type="text" required placeholder="Nama kamu" className="input-field" />
              </div>
              <div>
                <label className="text-cream-muted text-xs font-medium block mb-1.5">Email (opsional)</label>
                <input id="contact-email" name="email" type="email" placeholder="email@kamu.com" className="input-field" />
              </div>
              <div>
                <label className="text-cream-muted text-xs font-medium block mb-1.5">Pesan</label>
                <textarea id="contact-message" name="message" required rows={5} placeholder="Tulis pesanmu di sini..." className="input-field resize-none" />
              </div>
              <button type="submit" id="contact-submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={16} />
                <span>Kirim via Email</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
