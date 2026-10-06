import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Lock, User, ArrowRight } from 'lucide-react';
import { login } from '../../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login — Warkop BIntang';
    const token = localStorage.getItem('berttam_token');
    if (token) navigate('/admin');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(formData);
      localStorage.setItem('berttam_token', res.data.token);
      localStorage.setItem('berttam_user', JSON.stringify(res.data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-amber/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-dark-deep border border-white/10 rounded-3xl p-8 md:p-10 shadow-amber-lg relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber/20 flex items-center justify-center mx-auto mb-4">
            <Coffee size={32} className="text-amber" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-cream mb-2">Admin Panel</h1>
          <p className="text-cream-muted text-sm">Masuk untuk mengelola Warkop BIntang</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-cream-muted text-xs font-medium block mb-2">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-muted" />
              <input
                id="admin-login-username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="input-field pl-11"
                placeholder="Masukkan username"
              />
            </div>
          </div>

          <div>
            <label className="text-cream-muted text-xs font-medium block mb-2">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-muted" />
              <input
                id="admin-login-password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field pl-11"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            id="admin-login-submit"
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                <span>Masuk</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-cream-muted">
          <p>Hanya untuk pengelola Warkop BIntang.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
