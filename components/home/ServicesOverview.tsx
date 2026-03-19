'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

interface ServicesOverviewProps {
  sectionRef: (el: HTMLElement | null) => void
}

const ServicesOverview: React.FC<ServicesOverviewProps> = ({ sectionRef }) => {
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    {
      id: 1,
      title: 'Wedding Photography',
      description: 'Capturing your special day with a blend of candid moments and artistic portraits.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Portrait Sessions',
      description: 'Individual, couples, and family portraits that highlight your unique personality.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Commercial Photography',
      description: 'High-quality product and brand photography to elevate your business.',
      image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=800&auto=format&fit=crop',
    },
  ]

  useEffect(() => {
    gsap.fromTo(
      serviceRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: serviceRefs.current[0],
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-3 text-center">Services</h2>
        <p className="text-gray-600 text-center mb-12 font-light max-w-xl mx-auto">
          Professional photography services tailored to your specific needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { serviceRefs.current[index] = el }}
              className="flex flex-col">
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-light mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6 font-light flex-grow">{service.description}</p>
              <Link
                href="/services"
                className="text-sm uppercase tracking-wider border-b border-black pb-1 inline-block hover:text-gray-500 transition-colors">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesOverview
