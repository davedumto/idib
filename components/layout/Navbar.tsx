'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { MenuIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu', { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' })
      gsap.fromTo(
        '.nav-link-mobile',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.2, duration: 0.4, ease: 'power2.out' }
      )
      document.body.style.overflow = 'hidden'
    } else {
      gsap.to('.mobile-menu', { x: '100%', duration: 0.5, ease: 'power3.in' })
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    gsap.fromTo(
      '.nav-link-desktop',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, delay: 0.5, duration: 0.4, ease: 'power2.out' }
    )
  }, [])

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-light tracking-widest">
          EMMA ROSE
        </Link>
        <nav className="hidden md:flex space-x-8">
          {['/', '/portfolio', '/about', '/services', '/contact'].map((path, index) => (
            <Link
              key={index}
              href={path}
              className={`nav-link-desktop text-sm uppercase tracking-wider hover:text-gray-500 transition-colors ${pathname === path ? 'font-medium' : 'font-light'}`}>
              {path === '/' ? 'Home' : path.substring(1)}
            </Link>
          ))}
          <Link
            href="/booking"
            className="nav-link-desktop text-sm px-5 py-2 border border-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
            Book Now
          </Link>
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}>
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      <div className="mobile-menu fixed inset-0 bg-white z-50 transform translate-x-full md:hidden flex flex-col justify-center items-center">
        <nav className="flex flex-col space-y-8 items-center">
          {['/', '/portfolio', '/about', '/services', '/contact', '/booking'].map((path, index) => (
            <Link
              key={index}
              href={path}
              className={`nav-link-mobile text-2xl uppercase tracking-wider hover:text-gray-500 transition-colors ${pathname === path ? 'font-medium' : 'font-light'}`}>
              {path === '/' ? 'Home' : path.substring(1)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
