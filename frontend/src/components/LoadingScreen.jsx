import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-matte-black"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-serif text-gold tracking-[0.3em] font-light"
                initial={{ letterSpacing: '0.5em', opacity: 0 }}
                animate={{ letterSpacing: '0.3em', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                IMIRIAL
              </motion.h1>
              <motion.div
                className="mt-6 h-[1px] bg-gold mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.p
                className="mt-4 text-gold/50 text-xs tracking-[0.4em] uppercase font-sans"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Terrazzo Excellence
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
