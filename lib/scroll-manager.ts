// Cinematic scroll manager for pacing and temporal control
export class ScrollManager {
  private scrollListeners: ((progress: number, velocity: number) => void)[] = []
  private lastScrollY = 0
  private lastScrollTime = 0
  private velocity = 0
  private isScrolling = false
  private scrollTimeout: NodeJS.Timeout | null = null

  constructor() {
    this.setupScrollListener()
  }

  private setupScrollListener() {
    let ticking = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const timeDelta = currentTime - this.lastScrollTime || 16

      // Calculate velocity (pixels per millisecond)
      this.velocity = (currentScrollY - this.lastScrollY) / Math.max(timeDelta, 1)

      // Calculate scroll progress (0-1)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? currentScrollY / docHeight : 0

      this.lastScrollY = currentScrollY
      this.lastScrollTime = currentTime
      this.isScrolling = true

      // Clear previous timeout
      if (this.scrollTimeout) clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false
        this.velocity = 0
      }, 1500)

      // Notify listeners
      if (!ticking) {
        requestAnimationFrame(() => {
          this.scrollListeners.forEach((listener) => listener(progress, this.velocity))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }

  // Subscribe to scroll events
  onScroll(callback: (progress: number, velocity: number) => void) {
    this.scrollListeners.push(callback)
    return () => {
      this.scrollListeners = this.scrollListeners.filter((l) => l !== callback)
    }
  }

  // Get current velocity
  getVelocity() {
    return this.velocity
  }

  // Check if actively scrolling
  getIsScrolling() {
    return this.isScrolling
  }

  // Smooth scroll with delay
  smoothScrollTo(target: number, duration: number = 1000) {
    const start = window.scrollY
    const distance = target - start
    const startTime = Date.now()

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const scroll = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = easeInOutCubic(progress)

      window.scrollTo(0, start + distance * easeProgress)

      if (progress < 1) {
        requestAnimationFrame(scroll)
      }
    }

    requestAnimationFrame(scroll)
  }
}

export const scrollManager = new ScrollManager()
