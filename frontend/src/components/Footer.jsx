import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-charcoal dark:bg-matte-black text-ivory/70 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif tracking-[0.25em] text-ivory mb-4">IMIRIAL</h2>
            <p className="text-ivory/40 font-light leading-relaxed max-w-md text-sm">
              Crafting timeless terrazzo elegance for discerning spaces. Each basin is a 
              testament to artisanal mastery and architectural vision.
            </p>
            <div className="flex gap-5 mt-6">
              <a href="#" className="text-ivory/40 hover:text-gold transition-colors duration-300" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-ivory/40 hover:text-gold transition-colors duration-300" aria-label="Pinterest">
                <FaPinterest size={18} />
              </a>
              <a href="#" className="text-ivory/40 hover:text-gold transition-colors duration-300" aria-label="LinkedIn">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-ivory/50 mb-6">Navigate</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Products', 'Gallery', 'Contact'].map(item => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-sm text-ivory/40 hover:text-gold transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase text-ivory/50 mb-6">Contact</h3>
            <ul className="space-y-3 text-sm text-ivory/40">
              <li>hello@imirial.com</li>
              <li>+91 98765 43210</li>
              <li className="leading-relaxed">
                Studio 12, Design Quarter<br />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ivory/30 tracking-wider">
            © {new Date().getFullYear()} IMIRIAL. All rights reserved.
          </p>
          <p className="text-xs text-ivory/20 tracking-wider">
            Crafted with precision & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
