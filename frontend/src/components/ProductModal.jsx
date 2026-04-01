import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';

export default function ProductModal({ product, isOpen, onClose }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-dark rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal dark:text-ivory hover:text-gold transition-colors"
              aria-label="Close modal"
            >
              <HiOutlineX size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square bg-cream dark:bg-darker">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-xs tracking-[0.3em] uppercase text-gold mb-3 font-sans">
                  {product.subtitle}
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-ivory mb-4">
                  {product.name}
                </h2>
                <p className="text-charcoal/60 dark:text-ivory/50 font-light leading-relaxed mb-8 text-sm">
                  {product.description}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-beige dark:border-ivory/10">
                    <span className="text-xs tracking-[0.2em] uppercase text-charcoal/40 dark:text-ivory/40">Material</span>
                    <span className="text-sm text-charcoal dark:text-ivory">{product.material}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-beige dark:border-ivory/10">
                    <span className="text-xs tracking-[0.2em] uppercase text-charcoal/40 dark:text-ivory/40">Dimensions</span>
                    <span className="text-sm text-charcoal dark:text-ivory">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-beige dark:border-ivory/10">
                    <span className="text-xs tracking-[0.2em] uppercase text-charcoal/40 dark:text-ivory/40">Price</span>
                    <span className="text-sm font-medium text-gold">{product.price}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in the ${product.name} basin.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors rounded-sm"
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
