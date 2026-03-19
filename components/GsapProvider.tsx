'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function GsapProvider() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('body', { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
  }, [])
  return null
}
