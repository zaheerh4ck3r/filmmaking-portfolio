'use client'

/**
 * Cinematic Camera Movement Metaphors
 * Transform scroll behavior into camera language
 */

// A. Dolly-In Scroll - Slow zoom without zooming
export const dollyInVariants = {
  hidden: {
    scale: 1.02,
    filter: 'blur(1px)',
    opacity: 0.85,
  },
  visible: {
    scale: 1,
    filter: 'blur(0px)',
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// B. Rack Focus - Focus shift between elements
export const rackFocusVariants = {
  blurred: {
    opacity: 0.6,
    filter: 'blur(3px)',
  },
  focused: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

// C. Locked-Off Camera - Background frozen, only text moves
export const lockedOffVariants = {
  static: {
    position: 'relative',
    willChange: 'auto',
  },
  // Text scrolls through static background
  scrollingContent: {
    transition: {
      ease: 'linear',
    },
  },
}

// D. Handheld Imperfection - Micro jitter
export const handheldJitterVariants = (intensity: number = 0.3) => ({
  animate: {
    x: [0, -intensity, intensity, -intensity * 0.5, 0],
    y: [0, intensity * 0.5, -intensity, intensity, 0],
    rotate: [0, -0.1, 0.1, -0.05, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      repeatType: 'loop' as const,
      ease: 'easeInOut' as const,
    },
  },
})

// Composition: Rule of Thirds positions
export const ruleOfThirdsPositions = {
  topLeft: 'md:items-start md:justify-start',
  topCenter: 'md:items-start md:justify-center',
  topRight: 'md:items-start md:justify-end',
  
  centerLeft: 'md:items-center md:justify-start',
  center: 'md:items-center md:justify-center',
  centerRight: 'md:items-center md:justify-end',
  
  bottomLeft: 'md:items-end md:justify-start',
  bottomCenter: 'md:items-end md:justify-center',
  bottomRight: 'md:items-end md:justify-end',
}

// Editing: Match Cut via Meaning
export const matchCutVariants = {
  ending: {
    exit: {
      opacity: 0,
      transition: { duration: 0.6 },
    },
  },
  beginning: {
    enter: {
      opacity: 0,
      transition: { duration: 0 }, // Instant cut
    },
    enterDone: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  },
}

// Editing: Ellipsis - Remove expected transitions
export const ellipsisVariants = {
  silence: {
    opacity: 0,
    scale: 0.98,
  },
  waiting: {
    opacity: 0,
    pointerEvents: 'none',
    transition: { duration: 3 },
  },
  appear: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.5 },
  },
}

// Projection metaphors - grain flicker timing like projector
export const projectorFlickerVariants = {
  animate: {
    opacity: [1, 0.97, 1],
    transition: {
      duration: 0.15,
      repeat: Infinity,
      repeatInterval: 4000,
    },
  },
}
