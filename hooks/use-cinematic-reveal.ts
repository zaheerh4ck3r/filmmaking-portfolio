'use client';

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export const useCinematicReveal = (trigger: boolean = true) => {
  const ref = useRef(null)

  // Word-by-word reveal variants for headings
  const headingVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)', y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  // Block reveal variants for paragraphs
  const paragraphVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: custom * 0.15 + 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  }

  return {
    ref,
    headingVariants,
    paragraphVariants,
  }
}
