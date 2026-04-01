import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

const values = [
  {
    number: '01',
    title: 'Material Integrity',
    desc: 'We source only the finest natural marble chips and stone aggregates, ensuring each basin tells an authentic geological story.'
  },
  {
    number: '02',
    title: 'Artisan Mastery',
    desc: 'Our craftsmen bring decades of experience, hand-pouring and polishing each piece to achieve unparalleled surface quality.'
  },
  {
    number: '03',
    title: 'Design Philosophy',
    desc: 'Every curve and contour is deliberated upon — we believe a basin should be as visually arresting as the finest sculpture.'
  },
  {
    number: '04',
    title: 'Lasting Legacy',
    desc: 'Built to endure generations, IMIRIAL basins are sealed and treated to resist stains, chips, and the passage of time.'
  },
];

export default function About() {
  return (
    <div className="bg-ivory dark:bg-matte-black transition-colors duration-500">
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"
          alt="Craftsmanship"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-ivory dark:to-matte-black" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gold text-xs tracking-[0.5em] uppercase mb-4 font-sans"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl font-serif text-white"
            >
              The Art of <span className="italic">Making</span>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-6 font-sans">The Beginning</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal dark:text-ivory mb-8 leading-tight">
              Born from a Love<br />
              for <span className="italic">Raw Materials</span>
            </h2>
            <p className="text-charcoal/60 dark:text-ivory/50 font-light leading-[1.9] mb-6">
              IMIRIAL was founded in the belief that the most ordinary material — fragments 
              of marble, chips of granite, dust of stone — could be transformed into objects 
              of extraordinary beauty. What began as a small studio experiment has evolved 
              into a luxury brand trusted by the world's most discerning architects and 
              interior designers.
            </p>
            <p className="text-charcoal/60 dark:text-ivory/50 font-light leading-[1.9]">
              Our name, derived from "Imperial" with a personal twist, speaks to our ambition: 
              to create terrazzo pieces worthy of the most magnificent spaces, yet intimate 
              enough to feel like personal treasures.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="img-zoom aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
                alt="IMIRIAL studio"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 bg-cream dark:bg-darker transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">The Process</p>
            <h2 className="text-4xl md:text-5xl font-serif text-charcoal dark:text-ivory">
              From Earth to <span className="italic">Elegance</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Selection', desc: 'Premium marble and stone chips are carefully chosen for color, size, and character. Each batch is tested for purity and aesthetic harmony.', img: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80' },
              { step: '02', title: 'Casting', desc: 'Our artisans hand-pour the terrazzo mixture into custom molds, ensuring even distribution and eliminating air pockets for structural integrity.', img: 'https://images.unsplash.com/photo-1629079448105-e0b4a94f46fd?w=600&q=80' },
              { step: '03', title: 'Finishing', desc: 'Days of grinding and polishing reveal the hidden beauty within. A final protective seal ensures lasting durability and a luxurious matte finish.', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80' },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="img-zoom aspect-[3/4] rounded-lg overflow-hidden mb-6">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-gold/30 font-serif text-3xl font-light">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-serif text-charcoal dark:text-ivory mb-2">{item.title}</h3>
                    <p className="text-charcoal/50 dark:text-ivory/40 text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn className="text-center mb-20">
          <p className="text-xs tracking-[0.4em] uppercase text-gold mb-4 font-sans">What We Stand For</p>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal dark:text-ivory">
            Our Core <span className="italic">Values</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {values.map((val, i) => (
            <FadeIn key={val.number} delay={i * 0.1}>
              <div className="flex gap-6 group">
                <span className="text-5xl font-serif text-gold/20 group-hover:text-gold/40 transition-colors duration-500 shrink-0">
                  {val.number}
                </span>
                <div className="pt-2">
                  <h3 className="text-xl font-serif text-charcoal dark:text-ivory mb-3">{val.title}</h3>
                  <p className="text-charcoal/50 dark:text-ivory/40 text-sm font-light leading-relaxed">{val.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-charcoal dark:bg-darker">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { num: '500+', label: 'Basins Crafted' },
            { num: '12+', label: 'Years of Mastery' },
            { num: '200+', label: 'Happy Clients' },
            { num: '100%', label: 'Handcrafted' },
          ].map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
              <p className="text-3xl md:text-4xl font-serif text-gold mb-2">{stat.num}</p>
              <p className="text-ivory/40 text-xs tracking-[0.2em] uppercase">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
