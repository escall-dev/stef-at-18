import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left column: Title & Divider */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/3 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
            A note from <span className="text-primary font-bold italic">Stef</span>&hellip;
          </h2>
          <div className="w-24 h-[2px] bg-primary mx-auto md:mx-0"></div>
        </motion.div>
        
        {/* Right column: Bio / Message */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3"
        >
          <div className="prose prose-lg prose-rose">
            <p className="text-gray-700 leading-relaxed font-sans font-light">
              Welcome to my 18th birthday celebration site! I am so thrilled to invite you 
              to share in this special milestone with me. As I step into this new chapter 
              of my life, nothing would mean more than celebrating it surrounded by the 
              people who have loved, supported, and guided me over the years.
            </p>
            <p className="text-gray-700 leading-relaxed font-sans font-light mt-4">
              Get ready for a night of wonderful memories, great food, and endless dancing. 
              Please review the details below and kindly RSVP so we can prepare for your 
              arrival. I can't wait to see you there!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
