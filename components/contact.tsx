'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.4,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        delay: custom * 0.3 + 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: custom * 0.15 + 0.1,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <section
      ref={ref}
      id="contact-section"
      className="relative w-full bg-background text-foreground px-8 md:px-16 py-32 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle radial background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,220,0.05) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="max-w-2xl space-y-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section header */}
        <motion.div className="space-y-4" custom={0} variants={itemVariants}>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Act Five</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
            After Credits
          </h2>
        </motion.div>

        {/* Invitation */}
        <motion.div className="space-y-8" variants={containerVariants} custom={1}>
          <motion.p className="text-lg leading-relaxed text-muted-foreground" custom={1} variants={itemVariants}>
            You can reach out to me.
          </motion.p>

          <motion.div
            className="space-y-4 border-l-2 border-muted pl-6 relative"
            variants={itemVariants}
            whileHover={{ paddingLeft: '28px' }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-foreground via-foreground to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <p className="font-serif text-2xl font-light">Get in Touch</p>

            <motion.div className="space-y-2" variants={containerVariants}>
              <motion.p className="text-foreground" variants={linkVariants}>
                <motion.a
                  href="mailto:zaheerh4ck3r@gmail.com"
                  className="underline"
                  whileHover={{ color: 'rgba(160, 160, 160, 1)' }}
                  transition={{ duration: 0.2 }}
                >
                  zaheerh4ck3r@gmail.com
                </motion.a>
              </motion.p>

              <motion.div className="space-y-1 text-sm text-muted-foreground" variants={containerVariants}>
                <motion.p variants={linkVariants}>
                  <motion.a
                    href="https://instagram.com/thezaheershow"
                    className="underline"
                    whileHover={{ color: 'rgba(245, 245, 220, 1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    Instagram
                  </motion.a>
                </motion.p>

              <motion.p custom={0} variants={linkVariants}>
                <motion.a
                  href="mailto:zaheerh4ck3r@gmail.com"
                  className="underline"
                  whileHover={{ color: 'rgba(160, 160, 160, 1)' }}
                  transition={{ duration: 0.3 }}
                >
                  zaheerh4ck3r@gmail.com
                </motion.a>
              </motion.p>

              <motion.div className="space-y-1 text-sm text-muted-foreground" variants={containerVariants}>
                <motion.p custom={1} variants={linkVariants}>
                  {/* <motion.a
                    href="https://instagram.com"
                    className="underline"
                    whileHover={{ color: 'rgba(245, 245, 220, 1)' }}
                    transition={{ duration: 0.3 }}
                  >
                    Instagram
                  </motion.a> */}
                </motion.p>
                <motion.p custom={3} variants={linkVariants}>
                  <motion.a
                    href="https://linkedin.com/in/zaheerh4ck3r"
                    className="underline"
                    whileHover={{ color: 'rgba(245, 245, 220, 1)' }}
                    transition={{ duration: 0.3 }}
                  >
                    LinkedIn
                  </motion.a>
                </motion.p>
              </motion.div>
            </motion.div>
            </motion.div>
          </motion.div>


        </motion.div>

        {/* Post-Credit Statement */}
        <motion.div
          className="pt-16 space-y-6 border-t border-muted/20"
          custom={5}
          variants={itemVariants}
        >
          <motion.p
            className="text-sm text-muted-foreground leading-relaxed italic"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 1.8 }}
          >
          "Hope is a good thing, maybe the best of things, and no good thing ever dies." – The Shawshank Redemption (1994)
          </motion.p>

          <motion.div
            className="pt-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 2.4 }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Zaheer Jahangir
            </p>
            <p className="text-xs text-muted-foreground">
              © 2026. All work remains in perpetual development.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
