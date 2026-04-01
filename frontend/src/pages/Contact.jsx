import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', message: 'Thank you! We\'ll get back to you soon.' });
        setForm({ name: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Unable to submit. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-ivory dark:bg-matte-black transition-colors duration-500">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs tracking-[0.5em] uppercase text-gold mb-4 font-sans"
        >
          Reach Out
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-serif text-charcoal dark:text-ivory"
        >
          Get in <span className="italic">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-charcoal/50 dark:text-ivory/40 font-light max-w-xl mx-auto"
        >
          Have a project in mind? We'd love to hear about your vision and help 
          bring it to life with our handcrafted terrazzo basins.
        </motion.p>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <FadeIn>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 dark:text-ivory/40 mb-3 font-sans">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full bg-transparent border-b border-beige dark:border-ivory/15 text-charcoal dark:text-ivory py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-charcoal/20 dark:placeholder:text-ivory/20 font-light"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 dark:text-ivory/40 mb-3 font-sans">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-transparent border-b border-beige dark:border-ivory/15 text-charcoal dark:text-ivory py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-charcoal/20 dark:placeholder:text-ivory/20 font-light"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase text-charcoal/50 dark:text-ivory/40 mb-3 font-sans">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full bg-transparent border-b border-beige dark:border-ivory/15 text-charcoal dark:text-ivory py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-charcoal/20 dark:placeholder:text-ivory/20 font-light resize-none"
                />
              </div>

              {/* Status */}
              {status.message && (
                <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-luxury bg-gold text-white px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold-dark transition-colors duration-400 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.2}>
            <div className="space-y-10">
              <div>
                <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 font-sans">Contact Information</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <HiOutlineMail className="text-gold mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-sm text-charcoal/40 dark:text-ivory/40 mb-1">Email</p>
                      <p className="text-charcoal dark:text-ivory font-light">hello@imirial.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <HiOutlinePhone className="text-gold mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-sm text-charcoal/40 dark:text-ivory/40 mb-1">Phone</p>
                      <p className="text-charcoal dark:text-ivory font-light">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <HiOutlineLocationMarker className="text-gold mt-1 shrink-0" size={18} />
                    <div>
                      <p className="text-sm text-charcoal/40 dark:text-ivory/40 mb-1">Studio</p>
                      <p className="text-charcoal dark:text-ivory font-light">
                        Studio 12, Design Quarter<br />
                        Mumbai, Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919664720452?text=Hello,%20I'm%20interested%20in%20IMIRIAL%20terrazzo%20basins"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-lg hover:bg-[#20BD5A] transition-colors w-fit"
              >
                <FaWhatsapp size={22} />
                <span className="text-sm tracking-wider">Chat on WhatsApp</span>
              </a>

              {/* Google Maps Placeholder */}
              <div className="rounded-lg overflow-hidden h-64 bg-cream dark:bg-darker border border-beige/50 dark:border-ivory/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IMIRIAL Studio Location"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
