'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ArrowDownIcon } from 'lucide-react'

const SLIDE_DURATION = 6

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const slides = [
    { image: 'https://images.unsplash.com/photo-1623788452350-4c8853663b54?q=80&w=1920&auto=format&fit=crop', title: 'Weddings' },
    { image: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=1920&auto=format&fit=crop', title: 'Portraits' },
    { image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=1920&auto=format&fit=crop', title: 'Commercial' },
  ]

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0.4, duration: 2, delay: 0.5, ease: 'power2.inOut' })
    gsap.fromTo(contentRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, delay: 1, ease: 'power3.out' })

    slideRefs.current.forEach((slide, index) => {
      gsap.to(slide, { opacity: index === 0 ? 1 : 0, duration: 0 })
    })

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION * 1000)

    return () => clearInterval(slideInterval)
  }, [])

  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (index === currentSlide) {
        gsap.to(slide, { opacity: 1, duration: 1.5, ease: 'power2.inOut' })
        gsap.fromTo(slide, { scale: 1 }, { scale: 1.05, duration: SLIDE_DURATION, ease: 'none' })
      } else {
        gsap.to(slide, { opacity: 0, duration: 1.5, ease: 'power2.inOut' })
      }
    })
  }, [currentSlide])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => { slideRefs.current[index] = el }}
          className="absolute inset-0 w-full h-full opacity-0">
          <img src={slide.image} alt={slide.title} className="object-cover w-full h-full" />
        </div>
      ))}
      <div ref={overlayRef} className="absolute inset-0 bg-black opacity-40 z-10" />
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-center">IDIB</h1>
        <p className="text-xl md:text-2xl font-light tracking-wide mb-10 text-center">PHOTOGRAPHY</p>
        <Link
          href="/portfolio"
          className="px-8 py-3 border border-white text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
          View Portfolio
        </Link>
      </div>
      <button
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-20 animate-bounce"
        aria-label="Scroll down">
        <ArrowDownIcon size={30} />
      </button>
      <div className="absolute bottom-10 right-10 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/40'}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
