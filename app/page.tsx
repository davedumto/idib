'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/components/home/Hero'
import FeaturedWork from '@/components/home/FeaturedWork'
import ServicesOverview from '@/components/home/ServicesOverview'
import Testimonials from '@/components/home/Testimonials'

const HomePage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, [])

  return (
    <div className="overflow-hidden">
      <Hero />
      <section
        ref={(el) => { sectionRefs.current[0] = el }}
        className="py-24 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Capturing Timeless Moments
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 font-light">
            I&apos;m Emma Rose, a professional photographer specializing in weddings,
            portraits, and commercial photography. With an artistic eye for
            detail and a passion for storytelling, I create authentic,
            emotion-filled images that will be cherished for generations.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-3 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
            About Me
          </Link>
        </div>
      </section>
      <FeaturedWork sectionRef={(el) => { sectionRefs.current[1] = el }} />
      <ServicesOverview sectionRef={(el) => { sectionRefs.current[2] = el }} />
      <Testimonials sectionRef={(el) => { sectionRefs.current[3] = el }} />
      <section
        ref={(el) => { sectionRefs.current[4] = el }}
        className="py-24 px-6 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ready to Book Your Session?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 font-light max-w-2xl mx-auto">
            Let&apos;s create something beautiful together. Check my availability and
            book your photography session online.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-opacity-80 transition-colors">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
