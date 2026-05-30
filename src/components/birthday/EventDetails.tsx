import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react'

export default function EventDetails() {
  const details = [
    {
      icon: <Calendar className="w-8 h-8 text-primary" strokeWidth={1.5} />,
      title: 'Date',
      value: 'May 30, 2026',
      sub: 'Saturday Evening'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" strokeWidth={1.5} />,
      title: 'Time',
      value: '6:00 PM - 9:00 PM',
      sub: 'Party time'
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" strokeWidth={1.5} />,
      title: 'Venue',
      value: 'Umbria Mall Jollibee',
      sub: 'Biñan, Laguna'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" strokeWidth={1.5} />,
      title: 'Dress Code',
      value: 'Formal',
      sub: 'Blush, Rose Gold, or Black'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto bg-white/40 rounded-3xl my-12 shadow-sm border border-white/50">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-gray-900 mb-4"
        >
          Event Details
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-16 h-[2px] bg-primary mx-auto"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {details.map((item, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            className="glass-panel p-8 rounded-[2rem] flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="mb-6 p-4 rounded-full bg-secondary/30">
              {item.icon}
            </div>
            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-800 font-sans font-medium mb-1">
              {item.value}
            </p>
            <p className="text-sm text-gray-500 font-sans font-light">
              {item.sub}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
