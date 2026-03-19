'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

interface FeaturedWorkProps {
  sectionRef: (el: HTMLElement | null) => void
}

const FeaturedWork: React.FC<FeaturedWorkProps> = ({ sectionRef }) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const featuredProjects = [
    { id: 1, title: 'Coastal Wedding', category: 'Wedding', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600&auto=format&fit=crop' },
    { id: 2, title: 'Urban Portraits', category: 'Portrait', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop' },
    { id: 3, title: 'Fashion Editorial', category: 'Commercial', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=600&auto=format&fit=crop' },
    { id: 4, title: 'Family Session', category: 'Portrait', image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=600&auto=format&fit=crop' },
    { id: 5, title: 'Product Photography', category: 'Commercial', image: 'https://images.unsplash.com/photo-1580974928064-f0aeef70895a?q=80&w=600&auto=format&fit=crop' },
    { id: 6, title: 'Mountain Elopement', category: 'Wedding', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop' },
  ]

  useEffect(() => {
    gsap.fromTo(
      imageRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRefs.current[0],
          start: 'top 80%',
        },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-3 text-center">Featured Work</h2>
        <p className="text-gray-600 text-center mb-12 font-light max-w-xl mx-auto">
          A curated selection of my recent projects across various photography styles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { imageRefs.current[index] = el }}
              className="group relative overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-start p-6">
                <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-xl font-light">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-block px-8 py-3 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
            View All Work
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork
