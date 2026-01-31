'use client'

import { useState } from "react"

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

interface Work {
  id: number
  title: string
  year: string
  type: string
  description: string
  details: string
}

const works: Work[] = [
  {
    id: 1,
    title: "Child Series",
    year: "2025",
    type: "Reels, Instagram",
    description: "Children share their views on life",
    details: "You can watch them on my insta."
  },

]

export default function PublishedWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })
  const [scrollIntensity, setScrollIntensity] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  // Track scroll intensity to slow viewer down
  useEffect(() => {
    let lastScrollY = 0
    let lastTime = 0
    let intensityFade = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const timeDelta = currentTime - lastTime || 16

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const isInPublishedSection = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

        if (isInPublishedSection) {
          const velocity = Math.abs(currentScrollY - lastScrollY) / timeDelta
          intensityFade = Math.max(0, velocity - 0.5)
          setScrollIntensity(Math.min(intensityFade, 1))
        }
      }

      lastScrollY = currentScrollY
      lastTime = currentTime
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={ref}
      id="published-section"
      className="relative w-full bg-background text-foreground px-8 md:px-16 py-32 overflow-hidden"
    >
      {/* Dimming overlay when scrolling too fast - creates "forced stillness" */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-20"
        animate={{
          background: `rgba(0, 0, 0, ${scrollIntensity * 0.2})`,
          backdropFilter: scrollIntensity > 0.3 ? 'blur(1px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="max-w-4xl mx-auto space-y-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          opacity: motion.useTransform ? 1 : 1,
        }}
      >
        {/* Section header */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Act Four</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
            The Premiere
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Work released into the world. It is no longer ours.
          </p>
        </motion.div>

        {/* Published works */}
        <motion.div className="space-y-16" variants={containerVariants}>
          {works.map((work) => (
            <WorkItem key={work.id} work={work} isInView={isInView} />
          ))}
        </motion.div>

        {/* Closing note */}
        <motion.div className="pt-12 space-y-4 border-t border-muted" variants={itemVariants}>
          <p className="text-muted-foreground leading-relaxed">
        "The world is changed by your example, not by your opinion." – Wonder Woman (2017)
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function WorkItem({ work, isInView }: { work: any; isInView: boolean }) {
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.article
      className="space-y-6 border-b border-muted pb-16 last:border-b-0 relative"
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Premiere glow effect on hover */}
      <motion.div
        className="absolute -inset-4 rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.05 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(245,245,220,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="relative">
        {/* Header */}
        <motion.div className="space-y-3">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <motion.h3
                className="font-serif text-4xl md:text-5xl font-light leading-tight mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {work.title}
              </motion.h3>
              <motion.p
                className="text-sm uppercase tracking-widest text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {work.year} / {work.type}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="space-y-4 max-w-3xl mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg leading-relaxed text-foreground italic">
            {work.description}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            {work.details}
          </p>
        </motion.div>

        {/* Meta links with hover */}
        <motion.div
          className="flex gap-6 text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
        <motion.a
          href="https://www.instagram.com/thezaheershow"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          whileHover={{ color: 'rgba(245,245,220,1)' }}
          transition={{ duration: 0.2 }}
        >
          View Work
        </motion.a>

          {/* <motion.a
            href="#"
            className="underline"
            whileHover={{ color: 'rgba(245,245,220,1)' }}
            transition={{ duration: 0.2 }}
          >
            Exhibition / Credits
          </motion.a> */}
        </motion.div>
      </div>
    </motion.article>
  )
}
