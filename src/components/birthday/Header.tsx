import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="w-full py-6 px-8 flex justify-center bg-white/40 backdrop-blur-md border-b border-white/50 sticky top-0 z-50 shadow-sm">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-2xl md:text-3xl font-serif tracking-widest text-primary uppercase font-semibold">
          Stef @ 18
        </h1>
      </motion.div>
    </header>
  )
}
