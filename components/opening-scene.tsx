'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface OpeningSceneProps {
  onComplete: () => void
}

export default function OpeningScene({ onComplete }: OpeningSceneProps) {
  const [isExiting, setIsExiting] = useState(false)
  // const words = ["We", "always", "believe", "that", "once", "we", "reach", "there,", "we'll", "start", "living."]
  const textVariants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(16px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.4,
        delay: i * 0.24,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
    exit: {
      opacity: 0,
      y: -32,
      transition: { duration: 1.0, ease: 'easeInOut' },
    },
  }

  useEffect(() => {
    // Logline: 2.5s
    // Silence: 1.5s
    // Quote: ~4s (11 words at 0.22s delay each)
    // Exit fade: 1.2s
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(onComplete, 800)
    }, 3200)

    return () => clearTimeout(timer)
  }, [onComplete])

  // Logline text
  const loglineVariants = {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8 },
    },
  }

  // Staggered quote reveal - slower, more contemplative
  const quoteVariants = {
    hidden: { opacity: 0, y: 32, filter: 'blur(16px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        delay: i * 0.24,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
    exit: {
      opacity: 0,
      y: -32,
      transition: { duration: 1.0, ease: 'easeInOut' },
    },
  }

  const quoteWords = [
    '"Oh,',
    'how',
    'Shakespeare',
    'would',
    'have',
    'loved',
    'cinema"'
  ]

  return (
    <motion.div
      className="fixed inset-0 w-full h-screen bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Subtle animated background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,220,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Opening stack - Logline, Silence, Quote */}
      <div className="relative z-10 max-w-2xl px-8 text-center space-y-16 flex flex-col items-center justify-center h-screen">
        {/* Logline - what this is */}
        <motion.div
          variants={loglineVariants}
          initial="hidden"
          animate={isExiting ? 'exit' : 'visible'}
          className="space-y-2"
        >
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-muted-foreground">
            An engineer's journey who is trying to make films.
          </p>
        </motion.div>

        {/* Silence (no element, just space) */}
        <div className="h-12" />

        {/* Quote - why it exists */}
        <motion.div
          className="space-y-3"
          animate={isExiting ? 'exit' : 'visible'}
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {quoteWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                custom={i}
                variants={quoteVariants}
                initial="hidden"
                animate={isExiting ? 'exit' : 'visible'}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide text-foreground"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom fade with subtle animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Subtle corner light */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-0"
        animate={{
          opacity: [0, 0.02, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,220,0.1) 0%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
