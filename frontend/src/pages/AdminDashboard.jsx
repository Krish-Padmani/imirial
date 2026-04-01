import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTrash, HiOutlineLogout, HiOutlinePhone, HiOutlineUser, HiOutlineChatAlt2 } from 'react-icons/hi';

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('imirial-admin-token');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/enquiries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('imirial-admin-token');
        navigate('/admin');
        return;
      }
      const data = await res.json();
      setEnquiries(data);
    } catch {
      setError('Failed to load enquiries.');
    }
    setLoading(false);
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/enquiry/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEnquiries(prev => prev.filter(e => e._id !== id));
      }
    } catch {
      alert('Failed to delete.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('imirial-admin-token');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-matte-black text-ivory">
      {/* Header */}
      <div className="border-b border-ivory/10 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif tracking-[0.2em] text-gold">IMIRIAL</h1>
            <p className="text-ivory/30 text-xs tracking-[0.2em] uppercase mt-1">Admin Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-ivory/40 hover:text-red-400 text-xs tracking-[0.2em] uppercase transition-colors"
          >
            <HiOutlineLogout size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-darker rounded-xl p-6 border border-ivory/5">
            <p className="text-ivory/30 text-xs tracking-[0.2em] uppercase mb-2">Total Enquiries</p>
            <p className="text-3xl font-serif text-gold">{enquiries.length}</p>
          </div>
          <div className="bg-darker rounded-xl p-6 border border-ivory/5">
            <p className="text-ivory/30 text-xs tracking-[0.2em] uppercase mb-2">This Month</p>
            <p className="text-3xl font-serif text-gold">
              {enquiries.filter(e => {
                const d = new Date(e.createdAt);
                const now = new Date();
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              }).length}
            </p>
          </div>
          <div className="bg-darker rounded-xl p-6 border border-ivory/5">
            <p className="text-ivory/30 text-xs tracking-[0.2em] uppercase mb-2">Today</p>
            <p className="text-3xl font-serif text-gold">
              {enquiries.filter(e => {
                const d = new Date(e.createdAt);
                const now = new Date();
                return d.toDateString() === now.toDateString();
              }).length}
            </p>
          </div>
        </div>

        {/* Enquiries List */}
        <div>
          <h2 className="text-sm tracking-[0.2em] uppercase text-ivory/50 mb-6">All Enquiries</h2>

          {loading && <p className="text-ivory/30 text-sm">Loading...</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {!loading && enquiries.length === 0 && (
            <p className="text-ivory/30 text-sm">No enquiries yet.</p>
          )}

          <AnimatePresence>
            <div className="space-y-4">
              {enquiries.map((eq, i) => (
                <motion.div
                  key={eq._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-darker rounded-xl p-6 border border-ivory/5 hover:border-gold/20 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <HiOutlineUser className="text-gold shrink-0" size={16} />
                        <span className="text-ivory font-medium">{eq.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <HiOutlinePhone className="text-gold/60 shrink-0" size={16} />
                        <span className="text-ivory/60 text-sm">{eq.phone}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <HiOutlineChatAlt2 className="text-gold/60 shrink-0 mt-0.5" size={16} />
                        <p className="text-ivory/50 text-sm leading-relaxed">{eq.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-ivory/20 text-xs">
                        {new Date(eq.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                      <button
                        onClick={() => deleteEnquiry(eq._id)}
                        className="p-2 text-ivory/20 hover:text-red-400 transition-colors"
                        aria-label="Delete enquiry"
                      >
                        <HiOutlineTrash size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
