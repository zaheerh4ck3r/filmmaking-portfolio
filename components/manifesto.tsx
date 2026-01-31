'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

export default function Manifesto() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-50px' })

  const manifestoLines = [
"Robert Frost. said:",
"\"Two roads diverged in a wood and I,",
"I took the one less travelled by,",
"And that has made all the difference\"",
"So I am taking the road less travelled by."
  ]

  // Locked-off camera effect: background static, text scrolls through
  return (
    <section
      ref={ref}
      id="manifesto-section"
      className="relative w-full bg-background text-foreground px-8 md:px-16 py-32 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Locked background - does NOT move */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Static vignette frame */}
        <div className="absolute inset-0 border-8 border-muted/10" />
        
        {/* Frame lines - like locked camera tripod shot */}
        <div className="absolute inset-1/3 border border-muted/5" />
      </motion.div>

      {/* Scrolling content through locked frame */}
      <motion.div
        className="relative z-10 max-w-2xl space-y-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        <div className="space-y-8">
          {manifestoLines.map((line, idx) => (
            <motion.p
              key={idx}
              className={`${
                line === ''
                  ? 'h-4'
                  : 'font-serif text-3xl md:text-4xl font-light leading-relaxed text-foreground'
              }`}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + idx * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Breathing pause after manifesto */}
        <motion.div
          className="pt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + manifestoLines.length * 0.15 + 0.4,
          }}
        >
          <div className="h-px w-12 bg-muted/30" />
        </motion.div>
      </motion.div>
    </section>
  )
}
