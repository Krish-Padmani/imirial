import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function LightboxModal({ images, currentIndex, isOpen, onClose, onNext, onPrev }) {
  if (!isOpen || !images || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-lg"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <HiOutlineX size={20} />
          </button>

          {/* Previous */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <HiChevronLeft size={24} />
            </button>
          )}

          {/* Next */}
          {currentIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <HiChevronRight size={24} />
            </button>
          )}

          {/* Image */}
          <motion.img
            key={currentIndex}
            src={current.src}
            alt={current.alt}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-[0.3em]">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
