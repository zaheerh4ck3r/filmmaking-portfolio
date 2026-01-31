'use client'

import { useEffect, useRef } from 'react'

interface ScrollResistanceConfig {
  targetSectionId?: string
  maxVelocity?: number
  damping?: number
  onResistance?: (intensity: number) => void
}

export function useScrollResistance(config: ScrollResistanceConfig = {}) {
  const { maxVelocity = 1.5, damping = 0.98, onResistance } = config
  const velocityRef = useRef(0)
  const lastScrollYRef = useRef(0)
  const lastTimeRef = useRef(Date.now())

  useEffect(() => {
    let ticking = false
    let resistanceTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      const now = Date.now()
      const timeDelta = now - lastTimeRef.current
      const scrollDelta = window.scrollY - lastScrollYRef.current

      // Calculate scroll velocity (pixels per millisecond)
      const velocity = scrollDelta / Math.max(timeDelta, 16)

      // If scrolling too fast, apply resistance
      if (Math.abs(velocity) > maxVelocity) {
        const resistanceIntensity = Math.min(
          1,
          (Math.abs(velocity) - maxVelocity) / maxVelocity
        )

        onResistance?.(resistanceIntensity)

        // Clear previous timeout
        if (resistanceTimeout) clearTimeout(resistanceTimeout)
        resistanceTimeout = setTimeout(() => {
          onResistance?.(0)
        }, 600)
      } else {
        onResistance?.(0)
      }

      velocityRef.current = velocity
      lastScrollYRef.current = window.scrollY
      lastTimeRef.current = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (resistanceTimeout) clearTimeout(resistanceTimeout)
    }
  }, [maxVelocity, damping, onResistance])

  return {
    getVelocity: () => velocityRef.current,
  }
}
