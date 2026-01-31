'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { dollyInVariants, rackFocusVariants } from '@/lib/camera-movements'
import { itemVariants } from '@/lib/item-variants'

export default function CharacterIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  // Dolly-in effect: scale from 1.02 to 1.0, blur to sharp
  const dollyItemVariants = {
    hidden: { 
      scale: 1.02, 
      filter: 'blur(1px)', 
      opacity: 0.9, 
      y: 16 
    },
    visible: (custom: number) => ({
      scale: 1,
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: custom * 0.25 + 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
        delay: 0.6,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-background text-foreground flex items-center justify-center px-8 md:px-16 py-32"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,220,0.02) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-3xl space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section marker - dolly in effect */}
        <motion.div className="space-y-2" custom={0} variants={dollyItemVariants}>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Act One</p>
          <motion.div
            className="h-px bg-muted-foreground origin-left"
            style={{ width: '48px' }}
            variants={dividerVariants}
          />
        </motion.div>

        {/* Main heading with dolly-in */}
        <motion.h1
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-tight"
          custom={1}
          variants={dollyItemVariants}
        >
          Zaheer's Introduction.
        </motion.h1>

        {/* Intro text paragraphs with rack focus effect */}
        <div className="space-y-6">
          <motion.p
            className="text-lg leading-relaxed text-foreground"
            custom={2}
            variants={dollyItemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            I love making films.
          </motion.p>

          <motion.p
            className="text-lg leading-relaxed text-muted-foreground"
            custom={3}
            variants={dollyItemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            I believe, No matter what anybody tells you, ideas and words
          </motion.p>

          <motion.p
            className="text-lg leading-relaxed text-muted-foreground"
            custom={4}
            variants={dollyItemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            CAN CHANGE THE WORLD!!!.
          </motion.p>
        </div>

        {/* Visual divider with manifest line - locked off feel */}
        <motion.div className="pt-8 space-y-1" custom={5} variants={dollyItemVariants}>
          <motion.div className="h-px w-full bg-muted opacity-30" />
          <motion.div className="h-px w-full bg-muted opacity-20" />
        </motion.div>
      </motion.div>
    </section>
  )
}
