import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import products from '../data/products';
import ProductModal from '../components/ProductModal';

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

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          The Collection
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-serif text-charcoal dark:text-ivory"
        >
          Our <span className="italic">Products</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-charcoal/50 dark:text-ivory/40 font-light max-w-xl mx-auto"
        >
          Each basin is a unique work of art, handcrafted from premium terrazzo to bring 
          timeless elegance to your space.
        </motion.p>
      </section>

      {/* Product Grid */}
      <section className="pb-24 md:pb-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.1}>
              <div
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="img-zoom aspect-[3/4] rounded-lg overflow-hidden bg-cream dark:bg-darker mb-5 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                      <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1">{product.material}</p>
                      <p className="text-white font-serif text-lg">{product.price}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-gold/70 mb-1 font-sans">
                  {product.subtitle}
                </p>
                <h3 className="text-xl font-serif text-charcoal dark:text-ivory group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-20 bg-cream dark:bg-darker text-center px-6">
        <FadeIn>
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">Bespoke</p>
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal dark:text-ivory mb-6">
            Can't find your perfect match?
          </h2>
          <p className="text-charcoal/50 dark:text-ivory/40 font-light max-w-lg mx-auto mb-8">
            We offer custom terrazzo basin designs tailored to your exact specifications. 
            Share your vision, and we'll bring it to life.
          </p>
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi, I'd like to discuss a custom terrazzo basin design."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury inline-block bg-gold text-white px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold-dark transition-colors duration-400 rounded-sm"
          >
            Request Custom Design
          </a>
        </FadeIn>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
