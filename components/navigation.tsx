'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Scene {
  id: string
  label: string
  act: string
}

const scenes: Scene[] = [
  { id: 'character', label: 'Act One', act: 'The Inner Life' },
  { id: 'manifesto', label: 'Manifesto', act: 'Proposition' },
  { id: 'scripts', label: 'Act Two', act: 'Inner World' },
  { id: 'ongoing', label: 'Act Three', act: 'In Conflict' },
  { id: 'published', label: 'Act Four', act: 'The Premiere' },
  { id: 'cuts', label: 'Cuts', act: 'In Between' },
  { id: 'contact', label: 'Act Five', act: 'After Credits' },
]

export default function Navigation() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentAct, setCurrentAct] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // // Determine visibility (hide on scroll down, show on scroll up)
      // if (currentScrollY > lastScrollY && currentScrollY > 500) {
      //   setIsVisible(false)
      // } else {
      //   setIsVisible(true)
      // }

      setLastScrollY(currentScrollY)

      // Calculate progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? currentScrollY / docHeight : 0
      setScrollProgress(progress)

      // Determine current act based on scroll position
      const actIndex = Math.floor(progress * (scenes.length - 1))
      setCurrentAct(Math.min(actIndex, scenes.length - 1))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleSceneClick = (sceneId: string) => {
    const sectionMap: Record<string, string> = {
      character: '#character-intro',
      manifesto: '#manifesto-section',
      scripts: '#scripts-section',
      ongoing: '#ongoing-section',
      published: '#published-section',
      cuts: '#cuts-section',
      contact: '#contact-section',
    }

    const element = document.querySelector(sectionMap[sceneId])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="pointer-events-auto">
        {/* Top bar with title and time indicator */}
        <div className="px-8 md:px-16 py-6 backdrop-blur-sm bg-black/20">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
            {/* Title / Filmmaker */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="font-serif text-lg font-light hover:text-muted-foreground transition-colors duration-300"
              whileHover={{ scale: 0.98 }}
            >
              Zaheer
            </motion.a>

            {/* Cinematic progress indicator */}
            <div className="flex-1 hidden md:block">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {scenes[currentAct].act}
              </div>
              <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-foreground"
                  style={{ width: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.3, ease: 'linear' }}
                />
              </div>
            </div>

            {/* Scene indicator */}
            <div className="text-xs text-muted-foreground">
              {currentAct + 1} / {scenes.length}
            </div>
          </div>
        </div>

        {/* Scene markers (film reel style) */}
        <div className="px-8 md:px-16 pt-2 pb-4">
          <div className="max-w-6xl mx-auto flex items-center justify-center md:justify-end gap-3">
            {scenes.map((scene, index) => (
              <motion.button
                key={scene.id}
                onClick={() => handleSceneClick(scene.id)}
                className="relative w-8 h-8 flex items-center justify-center group pointer-events-auto"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Scene dot */}
                <motion.div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index <= currentAct ? 'bg-foreground' : 'bg-muted/50'
                  }`}
                  animate={{
                    scale: index === currentAct ? 1.5 : 1,
                    boxShadow:
                      index === currentAct
                        ? '0 0 12px rgba(245, 245, 220, 0.5)'
                        : '0 0 0px rgba(245, 245, 220, 0)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Hover label */}
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  initial={{ y: 4 }}
                  whileHover={{ y: 0 }}
                >
                  {scene.label}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
