import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import products, { galleryImages } from '../data/products';

function FadeInSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = products.slice(0, 3);

  return (
    <div className="bg-ivory dark:bg-matte-black transition-colors duration-500">
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
            alt="Luxury terrazzo basin"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gold text-xs tracking-[0.5em] uppercase mb-6 font-sans"
          >
            Handcrafted Luxury
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight max-w-4xl"
          >
            Crafting Timeless<br />
            <span className="italic text-gold/90">Terrazzo</span> Elegance
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10"
          >
            <Link
              to="/products"
              className="btn-luxury inline-block bg-gold/90 hover:bg-gold text-white px-10 py-4 text-xs tracking-[0.3em] uppercase transition-all duration-400 rounded-sm"
            >
              Explore Collection
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 64] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-full h-4 bg-gold absolute top-0"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Curated Selection</p>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal dark:text-ivory">
            Featured Pieces
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product, i) => (
            <FadeInSection key={product.id} delay={i * 0.15}>
              <Link to="/products" className="group block">
                <div className="img-zoom aspect-[3/4] rounded-lg overflow-hidden bg-cream dark:bg-darker mb-5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white/0 group-hover:text-white text-xs tracking-[0.3em] uppercase transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      View Details
                    </span>
                  </div>
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-1 font-sans">{product.subtitle}</p>
                <h3 className="text-xl font-serif text-charcoal dark:text-ivory group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>
              </Link>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="text-center mt-16">
          <Link
            to="/products"
            className="inline-block border border-gold text-gold px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold hover:text-white transition-all duration-400 rounded-sm"
          >
            View All Products
          </Link>
        </FadeInSection>
      </section>

      {/* ============ BRAND STORY ============ */}
      <section className="py-24 md:py-32 bg-cream dark:bg-darker transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeInSection>
            <div className="img-zoom aspect-[4/5] rounded-lg overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
                alt="Terrazzo craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 font-sans">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal dark:text-ivory mb-8 leading-tight">
              Where Art Meets<br />
              <span className="italic">Function</span>
            </h2>
            <p className="text-charcoal/60 dark:text-ivory/50 font-light leading-[1.9] mb-6">
              Born from a passion for material authenticity, IMIRIAL reimagines the ancient art of 
              terrazzo for contemporary living. Our artisans blend carefully sourced marble chips, 
              natural stone, and premium pigments to create basins that are as unique as fingerprints.
            </p>
            <p className="text-charcoal/60 dark:text-ivory/50 font-light leading-[1.9] mb-10">
              Each piece undergoes weeks of meticulous handcrafting — from the initial pour to the 
              final polish — ensuring that every IMIRIAL basin carries the warmth of human touch 
              and the precision of dedicated craftsmanship.
            </p>
            <Link
              to="/about"
              className="inline-block text-gold text-xs tracking-[0.3em] uppercase border-b border-gold/30 pb-1 hover:border-gold transition-colors duration-300"
            >
              Discover Our Journey →
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* ============ GALLERY PREVIEW ============ */}
      <section className="py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <FadeInSection className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Visual Journey</p>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal dark:text-ivory">
            The Gallery
          </h2>
        </FadeInSection>

        <div className="masonry-grid">
          {galleryImages.slice(0, 6).map((img, i) => (
            <FadeInSection key={img.id} delay={i * 0.1} className="masonry-grid-item">
              <div className="img-zoom rounded-lg overflow-hidden relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover ${
                    img.height === 'tall' ? 'h-96' : img.height === 'medium' ? 'h-72' : 'h-56'
                  }`}
                />
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="text-center mt-16">
          <Link
            to="/gallery"
            className="inline-block border border-gold text-gold px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold hover:text-white transition-all duration-400 rounded-sm"
          >
            Explore Full Gallery
          </Link>
        </FadeInSection>
      </section>

      {/* ============ PREMIUM CTA ============ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Luxury interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <FadeInSection className="relative z-10 text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 font-sans">Begin Your Journey</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 max-w-3xl mx-auto leading-tight">
            Transform Your Space with<br />
            <span className="italic text-gold">Timeless Elegance</span>
          </h2>
          <p className="text-white/50 font-light max-w-xl mx-auto mb-10">
            Let us craft the perfect terrazzo basin for your vision. Every piece is made to order, 
            ensuring exclusivity that matches your taste.
          </p>
          <Link
            to="/contact"
            className="btn-luxury inline-block bg-gold text-white px-12 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold-dark transition-colors duration-400 rounded-sm"
          >
            Get in Touch
          </Link>
        </FadeInSection>
      </section>
    </div>
  );
}
