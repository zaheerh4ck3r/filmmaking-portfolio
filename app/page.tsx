'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import OpeningScene from '@/components/opening-scene'
import CharacterIntro from '@/components/character-intro'
import Manifesto from '@/components/manifesto'
import ScriptsSection from '@/components/scripts-section'
import OngoingProjects from '@/components/ongoing-projects'
import PublishedWork from '@/components/published-work'
import Cuts from '@/components/cuts'
import Contact from '@/components/contact'
import Navigation from '@/components/navigation'

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false)
  const [scrollVelocity, setScrollVelocity] = useState(0)

  useEffect(() => {
    let lastScrollY = 0
    let lastTime = 0

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const timeDelta = currentTime - lastTime || 16

      const velocity = (currentScrollY - lastScrollY) / timeDelta
      setScrollVelocity(velocity)

      lastScrollY = currentScrollY
      lastTime = currentTime
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Create slight resistance to fast scrolling
  useEffect(() => {
    if (Math.abs(scrollVelocity) > 2) {
      // If scrolling too fast, add subtle friction effect
      const timer = setTimeout(() => {
        setScrollVelocity((v) => v * 0.95)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [scrollVelocity])

  return (
    <main className="w-full bg-background text-foreground overflow-x-hidden">
      <Navigation />
      {!hasOpened ? (
        <OpeningScene onComplete={() => setHasOpened(true)} />
      ) : (
        <div className="space-y-0">
          {/* Scene transitions with temporal separation */}
          <SectionWrapper delay={0}>
            <CharacterIntro />
          </SectionWrapper>

          <SectionWrapper delay={0.1}>
            <Manifesto />
          </SectionWrapper>

          <SectionWrapper delay={0.3}>
            <ScriptsSection />
          </SectionWrapper>

          <SectionWrapper delay={0.4}>
            <OngoingProjects />
          </SectionWrapper>

          <SectionWrapper delay={0.5}>
            <PublishedWork />
          </SectionWrapper>

          <SectionWrapper delay={0.6}>
            <Cuts />
          </SectionWrapper>

          <SectionWrapper delay={0.7}>
            <Contact />
          </SectionWrapper>
        </div>
      )}
    </main>
  )
}

// Wrapper component that creates temporal separation between sections
function SectionWrapper({
  children,
  delay,
}: {
  children: React.ReactNode
  delay: number
}) {
  const [isInView, setIsInView] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: 0,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
