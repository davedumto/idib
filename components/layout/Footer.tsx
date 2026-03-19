'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { InstagramIcon, FacebookIcon, LinkedinIcon } from 'lucide-react'

const Footer = () => {
  useEffect(() => {
    gsap.from('.footer-content', {
      scrollTrigger: {
        trigger: '.footer',
        start: 'top bottom',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
  }, [])

  return (
    <footer className="footer bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-light tracking-widest">
              EMMA ROSE
            </Link>
            <p className="text-gray-600 font-light max-w-xs">
              Capturing life&apos;s most precious moments with an artistic eye and timeless elegance.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider font-medium">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors">Home</Link>
              <Link href="/portfolio" className="text-gray-600 hover:text-black transition-colors">Portfolio</Link>
              <Link href="/about" className="text-gray-600 hover:text-black transition-colors">About</Link>
              <Link href="/services" className="text-gray-600 hover:text-black transition-colors">Services</Link>
              <Link href="/booking" className="text-gray-600 hover:text-black transition-colors">Booking</Link>
              <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider font-medium">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition-colors" aria-label="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
            </div>
            <p className="text-gray-600 font-light">
              Email: hello@emmarose.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm font-light">
          <p>© {new Date().getFullYear()} Emma Rose Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
