'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

interface Cut {
  id: number
  idea: string
  note: string
}

const cuts: Cut[] = [
  {
    id: 1,
    idea: 'Podcast with Bilawal Bhutto Zardari, and Anwar Masood.',
    note: 'Have not yet been able to contact them.',
  }
]

export default function Cuts() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, x: -12 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.9,
        delay: custom * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <section
      ref={ref}
      id="cuts-section"
      className="relative w-full bg-background text-foreground px-8 md:px-16 py-32"
    >
      {/* Subtle fade background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,220,0.03) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto space-y-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section header */}
        <motion.div className="space-y-4" custom={0} variants={itemVariants}>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">In Between</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light leading-tight">Cuts</h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
            What I am still trying to make.
          </p>
        </motion.div>

        {/* Cuts list */}
        <motion.div className="space-y-8" variants={containerVariants}>
          {cuts.map((cut, idx) => (
            <motion.div
              key={cut.id}
              custom={idx + 1}
              variants={itemVariants}
              className="relative pl-6 border-l-2 border-muted/40 hover:border-muted/80 transition-colors duration-300"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full bg-muted/60 hover:bg-foreground transition-colors duration-300 -translate-x-1/2"
                whileHover={{ scale: 1.3 }}
              />

              <motion.div
                className="space-y-2"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-lg font-light text-foreground">
                  {cut.idea}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cut.note}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing reflection */}
        <motion.div
          className="pt-8 border-t border-muted/30 space-y-3"
          custom={cuts.length + 1}
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground italic leading-relaxed">
"Sometimes the right path is not the easiest one." – Pocahontas (1995)
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
