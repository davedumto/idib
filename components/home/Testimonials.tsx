'use client'

import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

interface TestimonialsProps {
  sectionRef: (el: HTMLElement | null) => void
}

const Testimonials: React.FC<TestimonialsProps> = ({ sectionRef }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([])

  const testimonials = [
    {
      id: 1,
      name: 'Sarah & Michael',
      type: 'Wedding Clients',
      quote: "Emma captured our wedding day perfectly. Her calm presence and artistic eye resulted in photos that truly tell the story of our special day. We couldn't be happier!",
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=100&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Jennifer Thompson',
      type: 'Portrait Client',
      quote: 'Working with Emma was such a joy! She made me feel completely comfortable in front of the camera, and the resulting portraits exceeded all my expectations.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Artisan Crafts',
      type: 'Commercial Client',
      quote: "Emma's product photography transformed our online presence. Her attention to detail and understanding of our brand aesthetic was exactly what we needed.",
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop',
    },
  ]

  useEffect(() => {
    testimonialRefs.current.forEach((testimonial, index) => {
      gsap.to(testimonial, { opacity: index === activeIndex ? 1 : 0, x: index === activeIndex ? 0 : 50, duration: 0 })
    })
  }, [])

  useEffect(() => {
    testimonialRefs.current.forEach((testimonial, index) => {
      if (index === activeIndex) {
        gsap.to(testimonial, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' })
      } else {
        gsap.to(testimonial, { opacity: 0, x: 50, duration: 0.8, ease: 'power3.out' })
      }
    })

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, testimonials.length])

  return (
    <section ref={sectionRef} className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-light mb-3 text-center">Client Words</h2>
        <p className="text-gray-600 text-center mb-12 font-light">
          What my clients are saying about their experience.
        </p>
        <div className="relative min-h-[200px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => { testimonialRefs.current[index] = el }}
              className="absolute inset-0 flex flex-col items-center text-center opacity-0">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
              <blockquote className="text-lg md:text-xl italic font-light mb-6 max-w-2xl">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <cite className="not-italic">
                <span className="font-medium">{testimonial.name}</span>
                <span className="text-gray-500 ml-2">— {testimonial.type}</span>
              </cite>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? 'bg-black' : 'bg-gray-300'}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
