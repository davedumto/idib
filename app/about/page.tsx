'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { InstagramIcon, CameraIcon, HeartIcon } from 'lucide-react'

const AboutPage = () => {
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (imageRef.current && contentRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      )
    }
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-4">About Me</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Get to know the person behind the lens and my approach to
            photography.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div ref={imageRef} className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
                alt="IDIB, Photographer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-6 right-6 flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>
          <div ref={contentRef} className="flex flex-col justify-center">
            <h2 className="text-3xl font-light mb-6">Hello, I&apos;m Emma</h2>
            <div className="space-y-4 text-gray-700 font-light">
              <p>
                I&apos;m a professional photographer based in New York City with over
                8 years of experience capturing life&apos;s most precious moments. My
                journey into photography began during my travels across Europe,
                where I fell in love with documenting the beauty of everyday
                moments.
              </p>
              <p>
                My approach to photography focuses on authentic storytelling and
                creating a comfortable environment for my clients. I believe
                that the best photos happen when people feel at ease and can
                express themselves naturally.
              </p>
              <p>
                When I&apos;m not behind the camera, you can find me exploring hiking
                trails, experimenting with new cooking recipes, or curled up
                with a good book and my cat, Luna.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-block px-8 py-3 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
        <div ref={statsRef} className="py-16 border-t border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="stat-item">
              <div className="flex justify-center mb-4">
                <CameraIcon size={30} />
              </div>
              <h3 className="text-4xl font-light mb-2">500+</h3>
              <p className="text-gray-600">Photo Sessions</p>
            </div>
            <div className="stat-item">
              <div className="flex justify-center mb-4">
                <HeartIcon size={30} />
              </div>
              <h3 className="text-4xl font-light mb-2">150+</h3>
              <p className="text-gray-600">Happy Couples</p>
            </div>
            <div className="stat-item">
              <div className="flex justify-center mb-4">
                <InstagramIcon size={30} />
              </div>
              <h3 className="text-4xl font-light mb-2">25K+</h3>
              <p className="text-gray-600">Instagram Followers</p>
            </div>
          </div>
        </div>
        <div className="py-16">
          <h2 className="text-3xl font-light mb-12 text-center">
            My Photography Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
                <span className="text-2xl font-light">2015</span>
              </div>
              <h3 className="text-xl font-light mb-2">Started Photography</h3>
              <p className="text-gray-600 font-light">
                Began my journey with travel photography across Europe
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
                <span className="text-2xl font-light">2018</span>
              </div>
              <h3 className="text-xl font-light mb-2">Opened Studio</h3>
              <p className="text-gray-600 font-light">
                Launched my professional studio in downtown New York
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
                <span className="text-2xl font-light">2023</span>
              </div>
              <h3 className="text-xl font-light mb-2">Award-Winning</h3>
              <p className="text-gray-600 font-light">
                Recognized with multiple industry awards for wedding photography
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
