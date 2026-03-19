'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckIcon } from 'lucide-react'

const ServicesPage = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const packageRefs = useRef<(HTMLDivElement | null)[]>([])

  const services = [
    {
      id: 1,
      title: 'Wedding Photography',
      description: 'Comprehensive coverage of your special day, from getting ready to the final dance.',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
      details: ['Pre-wedding consultation', 'Full-day coverage (up to 10 hours)', 'Two photographers', 'High-resolution digital images', 'Online gallery for sharing', 'Custom wedding album options'],
    },
    {
      id: 2,
      title: 'Portrait Sessions',
      description: 'Capture your personality and essence in beautifully composed portrait photography.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
      details: ['Pre-session consultation', '1-2 hour session', 'Multiple outfit changes', 'Indoor or outdoor locations', 'Professionally edited images', 'Digital delivery within 2 weeks'],
    },
    {
      id: 3,
      title: 'Commercial Photography',
      description: 'Elevate your brand with professional product and lifestyle photography.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
      details: ['Brand consultation', 'Product or lifestyle setup', 'Professional lighting', 'High-resolution images for print and web', 'Commercial usage rights', 'Quick turnaround times'],
    },
    {
      id: 4,
      title: 'Event Photography',
      description: 'Document your special events with candid and posed photography coverage.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
      details: ['Corporate events and conferences', 'Birthday and anniversary parties', 'Charity galas and fundraisers', 'Real-time editing for social media', 'Fast delivery of final images', 'Additional second photographer available'],
    },
  ]

  const packages = [
    {
      id: 1,
      title: 'Essential',
      price: '$499',
      description: 'Perfect for individual portraits or small events',
      features: ['2-hour session', 'One location', '50 edited digital images', 'Online gallery', 'Print release'],
      popular: false,
    },
    {
      id: 2,
      title: 'Premium',
      price: '$899',
      description: 'Ideal for engagement sessions or family portraits',
      features: ['4-hour session', 'Two locations', '100 edited digital images', 'Online gallery', 'Print release', '10 professional prints'],
      popular: true,
    },
    {
      id: 3,
      title: 'Luxury',
      price: '$1,999',
      description: 'Comprehensive coverage for weddings and special events',
      features: ['Full-day coverage (10 hours)', 'Two photographers', 'Unlimited edited digital images', 'Online gallery', 'Print release', 'Custom photo album', 'Engagement session included'],
      popular: false,
    },
  ]

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }
    serviceRefs.current.forEach((service, index) => {
      if (!service) return
      gsap.fromTo(
        service,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: service, start: 'top 80%' },
          delay: index * 0.2,
        }
      )
    })
    packageRefs.current.forEach((pkg, index) => {
      if (!pkg) return
      gsap.fromTo(
        pkg,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: pkg, start: 'top 80%' },
          delay: index * 0.2,
        }
      )
    })
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Professional photography services tailored to capture your special moments.
          </p>
        </div>
        <div className="space-y-24 mb-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { serviceRefs.current[index] = el }}
              className={`grid grid-cols-1 ${index % 2 === 0 ? 'md:grid-cols-[2fr_3fr]' : 'md:grid-cols-[3fr_2fr]'} gap-12 items-center`}>
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-light">{service.title}</h2>
                <p className="text-gray-600 font-light">{service.description}</p>
                <ul className="space-y-3">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon size={18} className="mr-2 text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-light">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="py-16 border-t border-gray-200">
          <h2 className="text-3xl font-light mb-12 text-center">Packages & Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                ref={(el) => { packageRefs.current[index] = el }}
                className={`border ${pkg.popular ? 'border-black' : 'border-gray-200'} p-8 relative`}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-black text-white text-xs uppercase tracking-wider py-1 px-3 transform -translate-y-1/2">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-light mb-2">{pkg.title}</h3>
                <div className="text-3xl font-light mb-4">{pkg.price}</div>
                <p className="text-gray-600 mb-6 font-light">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckIcon size={18} className="mr-2 text-black mt-1 flex-shrink-0" />
                      <span className="text-gray-700 font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/booking"
                  className={`inline-block w-full text-center py-3 text-sm uppercase tracking-wider ${pkg.popular ? 'bg-black text-white hover:bg-opacity-80' : 'border border-black hover:bg-black hover:text-white'} transition-colors`}>
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="py-16 border-t border-gray-200">
          <h2 className="text-3xl font-light mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="text-xl font-light mb-3">How far in advance should I book?</h3>
              <p className="text-gray-600 font-light">
                For weddings, I recommend booking 6-12 months in advance to secure your date. For portrait sessions and events, 2-3 months notice is usually sufficient, but availability varies seasonally.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-3">What is your cancellation policy?</h3>
              <p className="text-gray-600 font-light">
                A 50% non-refundable retainer is required to secure your date. Cancellations made 30+ days before your session may be eligible for rescheduling. Please refer to your contract for complete details.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-3">How long until I receive my photos?</h3>
              <p className="text-gray-600 font-light">
                Portrait sessions are typically delivered within 2 weeks. Weddings and larger events are delivered within 4-6 weeks. Rush delivery is available for an additional fee.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-3">Do you travel for sessions?</h3>
              <p className="text-gray-600 font-light">
                Yes! I serve the greater New York area without additional travel fees. For destinations beyond 50 miles, travel fees apply. I&apos;m also available for destination weddings worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage
