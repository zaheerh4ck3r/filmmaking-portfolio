/**
 * Reusable animation variants for consistent UI elements
 * Used across multiple components for dolly-in and other effects
 */

export const itemVariants = {
  hidden: {
    scale: 1.02,
    filter: 'blur(1px)',
    opacity: 0.9,
    y: 16,
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

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

export const dividerVariants = {
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
