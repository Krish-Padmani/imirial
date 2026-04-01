import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { galleryImages } from '../data/products';
import LightboxModal from '../components/LightboxModal';

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
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
          Visual Stories
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-serif text-charcoal dark:text-ivory"
        >
          The <span className="italic">Gallery</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-charcoal/50 dark:text-ivory/40 font-light max-w-xl mx-auto"
        >
          A curated visual journey through our terrazzo creations, installations, 
          and the spaces they transform.
        </motion.p>
      </section>

      {/* Masonry Grid */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="masonry-grid">
          {galleryImages.map((img, i) => (
            <FadeIn key={img.id} delay={i * 0.08} className="masonry-grid-item">
              <div
                className="img-zoom rounded-lg overflow-hidden cursor-pointer relative group"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover ${
                    img.height === 'tall' ? 'h-96 md:h-[28rem]' : img.height === 'medium' ? 'h-72 md:h-80' : 'h-56 md:h-64'
                  }`}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 border border-white/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <LightboxModal
        images={galleryImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setCurrentIndex(prev => Math.min(prev + 1, galleryImages.length - 1))}
        onPrev={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
      />
    </div>
  );
}
