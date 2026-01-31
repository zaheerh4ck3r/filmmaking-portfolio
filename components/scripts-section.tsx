'use client'

import React from "react"

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

interface Script {
  id: number
  title: string
  logline: string
  theme: string
  question: string
  shotType: 'wide' | 'locked' | 'parallax' | 'fade'
  // shot type determines visual behavior
}

const scripts: Script[] = [
  {
    id: 1,
    title: "Hermes",
    logline: "Two strangers fall in love through accidentally swapped phones,until one phone starts receiving messages that predict real crimes, leading to a final message with her name on it.",
    theme: "Psychological thriller",
    question: "Is a person morally responsible for actions they are not conscious of?",
    shotType: 'wide', // Static wide shot
  },
    {
    id: 1,
    title: "Frankenland",
    logline: "A man, scarred by a childhood of neglect and betrayal, stands on the brink of murder after the only woman who ever loved him leaves, forcing him to confront the monster born of his pain and decide whether he will let it consume him.",
    theme: "Psychological thriller",
    question: "When we say the monster is protecting the child… what if the monster is the reason the child never survives?",
    shotType: 'wide', // Static wide shot
  },

]

export default function ScriptsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={ref}
      id="scripts-section"
      className="relative w-full bg-background text-foreground px-8 md:px-16 py-32"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(255,255,220,0.02) 0%, transparent 70%)',
            'radial-gradient(ellipse at 80% 50%, rgba(255,255,220,0.02) 0%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="max-w-5xl mx-auto space-y-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section header */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">Act Two</p>
          <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight">
            Inner World
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Works in development. 
          </p>
        </motion.div>

        {/* Scripts grid with 3D cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective"
          variants={containerVariants}
        >
          {scripts.map((script) => (
            <ScriptCard3D
              key={script.id}
              script={script}
              isExpanded={expandedId === script.id}
              onToggle={() =>
                setExpandedId(expandedId === script.id ? null : script.id)
              }
              mousePosition={mousePosition}
            />
          ))}
        </motion.div>

        {/* Closing text */}
        <motion.div className="pt-8 border-t border-muted space-y-4" variants={itemVariants}>
          <p className="text-muted-foreground leading-relaxed">
          "We all end up in the gutter, but some of us are looking at the stars." – The Great Gatsby (2013)          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ScriptCard3D({
  script,
  isExpanded,
  onToggle,
  mousePosition,
}: {
  script: Script
  isExpanded: boolean
  onToggle: () => void
  mousePosition: { x: number; y: number }
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 })

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateX = (mousePosition.y - centerY) * 0.02
    const rotateY = (mousePosition.x - centerX) * -0.02

    setCardPosition({ x: rotateX, y: rotateY })
  }

  const handleCardMouseLeave = () => {
    setCardPosition({ x: 0, y: 0 })
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      onClick={onToggle}
      className="relative group cursor-pointer h-full perspective"
      style={{
        perspective: '1200px',
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateX: cardPosition.x,
          rotateY: cardPosition.y,
          z: isExpanded ? 100 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: '1200px',
        }}
      >
        {/* Card background */}
        <motion.div
          className="absolute inset-0 bg-secondary rounded-none border border-muted -z-10 pointer-events-none"
          animate={{
            opacity: isExpanded ? 0.8 : 0.4,
            boxShadow: isExpanded
              ? '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,220,0.1)'
              : '0 8px 24px rgba(0,0,0,0.3)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Light pass effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(135deg, transparent 30%, rgba(255,255,220,0.1) 50%, transparent 70%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Card content */}
        <div className="relative p-8 h-full flex flex-col justify-between">
          {/* Title */}
          <motion.h3
            className="font-serif text-2xl md:text-3xl font-light leading-tight"
            animate={{
              scale: isExpanded ? 1.05 : 1,
              opacity: isExpanded ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {script.title}
          </motion.h3>

          {/* Logline - fades in on hover */}
          <motion.p
            className="text-foreground text-lg leading-relaxed italic mt-6"
            animate={{
              opacity: isExpanded ? 0.6 : 1,
              filter: isExpanded ? 'blur(0.5px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.3 }}
          >
            "{script.logline}"
          </motion.p>

          {/* Metadata */}
          <motion.div
            className="space-y-4 mt-8 pt-6 border-t border-muted/30"
            animate={{
              opacity: isExpanded ? 0.7 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground opacity-60">
                Theme
              </span>
              <p className="text-sm text-foreground mt-1">{script.theme}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground opacity-60">
                Central Question
              </span>
              <p className="text-sm text-foreground mt-1">{script.question}</p>
            </div>
          </motion.div>

          {/* Breathing pulse on card */}
          <motion.div
            className="absolute inset-0 rounded-none border border-foreground opacity-0 pointer-events-none"
            animate={{
              opacity: [0, 0.15, 0],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

function ScriptCard({
  script,
  isExpanded,
  onToggle,
}: {
  script: Script
  isExpanded: boolean
  onToggle: () => void
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div variants={itemVariants}>
      <motion.button
        onClick={onToggle}
        className="w-full text-left group"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="border-b border-muted pb-6 space-y-3"
          animate={{
            borderColor: isExpanded ? 'rgba(245, 245, 220, 1)' : 'rgba(64, 64, 64, 1)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Title */}
          <motion.h3
            className="font-serif text-2xl md:text-3xl font-light"
            animate={{
              color: isExpanded ? 'rgba(160, 160, 160, 1)' : 'rgba(245, 245, 220, 1)',
            }}
            transition={{ duration: 0.3 }}
          >
            {script.title}
          </motion.h3>

          {/* Logline */}
          <motion.p
            className="text-foreground text-lg leading-relaxed italic"
            animate={{
              opacity: isExpanded ? 0.7 : 1,
              filter: isExpanded ? 'blur(0.5px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.3 }}
          >
            "{script.logline}"
          </motion.p>

          {/* Theme and question */}
          <motion.div
            className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-2"
            animate={{
              opacity: isExpanded ? 0.8 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground opacity-60">
                Theme
              </span>
              <p className="text-foreground mt-1">{script.theme}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground opacity-60">
                Central Question
              </span>
              <p className="text-foreground mt-1">{script.question}</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.button>
    </motion.div>
  )
}
