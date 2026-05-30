import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        {/* Left: Title */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="lg:w-[30%] shrink-0 pt-4"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight text-center lg:text-left">
            A note from{' '}
            <span className="text-primary font-bold italic underline">Stef</span>
            &hellip;
          </h2>
          <div className="w-24 h-[2px] bg-primary mx-auto lg:mx-0" />
        </motion.div>

        {/* Center: Note Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-[35%] shrink-0 pt-4"
        >
          <p className="text-gray-900 leading-loose font-serif font-medium text-2xl text-justify mb-6">
            Good evening everyone!
          </p>
          <p className="text-gray-900 leading-loose font-serif font-medium text-2xl text-justify mb-6">
            Welcome to my 18th birthday celebration. Thank you all for being here today
            and for taking the time to celebrate this special day with me.
          </p>
          <p className="text-gray-900 leading-loose font-serif font-medium text-2xl text-justify">
            I hope you enjoy the food, the games, and the program we prepared. Thank you
            for being part of this special chapter of my life. Thank you and have fun!
          </p>
        </motion.div>

        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-[35%] shrink-0 flex justify-center lg:justify-end"
        >
          <img
            src="/stef.png"
            alt="Stef"
            className="h-[480px] lg:h-[580px] w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  )
}





