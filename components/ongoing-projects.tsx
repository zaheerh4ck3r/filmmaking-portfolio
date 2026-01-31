'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

interface Project {
  id: number
  title: string
  date: string
  excerpt: string
  status: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "The child Series, Finale",
    date: "Dec, 2026 - Present",
    excerpt: "A reel",
    status: "In development"
  },
  {
    id: 2,
    title: "Thand Gosht",
    date: "Jan, 2026 - Present",
    excerpt: "An adaption of manto's afsana \"Thanda Gosht\" ",
    status: "In development"
  },
    {
    id: 3,
    title: "The Music Series",
    date: "Feb, 2026 - Present",
    excerpt: "A reel series discussing various topics on music. ",
    status: "In development"
  },

]

export default function OngoingProjects() {
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
    hidden: { opacity: 0, x: -20, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        delay: custom * 0.2 + 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return (
    <section
      ref={ref}
      className="relative w-full bg-secondary text-foreground px-8 md:px-16 py-32"
    >
      {/* Animated timeline line */}
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-muted to-transparent"
        style={{ transform: 'translateX(-50%)' }}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      <motion.div
        className="max-w-4xl mx-auto space-y-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section header */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Act Three</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
            In Production
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            All this stuff is being made right now.
          </p>
        </motion.div>

        {/* Projects */}
        <motion.div className="space-y-12" variants={containerVariants}>
          {projects.map((project) => (
<motion.article
  key={project.id}
  className="flex items-start gap-4" // flex layout with gap
  variants={itemVariants}
  whileHover={{ x: 8 }}
  transition={{ duration: 0.3 }}
>
  {/* Timeline dot */}
  <motion.div
    className="flex-shrink-0 w-3 h-3 rounded-full bg-foreground mt-2"
    initial={{ scale: 0 }}
    animate={isInView ? { scale: 1 } : { scale: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
  />

  {/* Content */}
  <div className="flex-1 space-y-2">
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <motion.h3
        className="font-serif text-3xl md:text-4xl font-light leading-tight flex-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {project.title}
      </motion.h3>
      <motion.span
        className="text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap pt-1"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {project.date}
      </motion.span>
    </div>
    <motion.p
      className="text-xs uppercase tracking-widest text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {project.status}
    </motion.p>
    <motion.p
      className="text-lg leading-relaxed text-foreground max-w-3xl"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {project.excerpt}
    </motion.p>
    <motion.div
      className="pt-6 border-b border-muted opacity-50"
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.6, delay: 0.6, originX: 0 }}
    />
  </div>
</motion.article>
          ))}
        </motion.div>

        {/* Closing note */}
        <motion.div className="pt-8 space-y-4" variants={itemVariants}>
          <p className="text-muted-foreground leading-relaxed italic">
            "Every great film begins with an idea… and someone brave enough to chase it." - Hugo (2011)
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
