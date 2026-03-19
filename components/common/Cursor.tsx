'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power3.out' })
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'none' })
    }

    const onMouseEnter = () => gsap.to(cursor, { scale: 1.5, opacity: 0.7, duration: 0.3 })
    const onMouseLeave = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })

    document.addEventListener('mousemove', onMouseMove)

    const links = document.querySelectorAll('a, button')
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnter)
      link.addEventListener('mouseleave', onMouseLeave)
    })

    if (window.innerWidth > 768) {
      cursor.style.display = 'block'
      cursorDot.style.display = 'block'
      document.body.style.cursor = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnter)
        link.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  if (typeof window === 'undefined') return null

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden fixed pointer-events-none w-8 h-8 rounded-full border border-black z-50 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={cursorDotRef}
        className="hidden fixed pointer-events-none w-1 h-1 bg-black rounded-full z-50 transform -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}

export default Cursor
