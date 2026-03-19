'use client'

import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showLightbox, setShowLightbox] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const categories = ['all', 'wedding', 'portrait', 'commercial', 'event']
  const portfolioItems = [
    { id: 1, title: 'Beach Wedding Ceremony', category: 'wedding', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Studio Portrait Session', category: 'portrait', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Luxury Watch Campaign', category: 'commercial', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'Corporate Conference', category: 'event', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop' },
    { id: 5, title: 'Bridal Portraits', category: 'wedding', image: 'https://images.unsplash.com/photo-1583939411023-14606be50503?q=80&w=800&auto=format&fit=crop' },
    { id: 6, title: 'Outdoor Family Session', category: 'portrait', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop' },
    { id: 7, title: 'Fashion Editorial', category: 'commercial', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop' },
    { id: 8, title: 'Live Music Performance', category: 'event', image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop' },
    { id: 9, title: 'Wedding Reception Details', category: 'wedding', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop' },
    { id: 10, title: 'Professional Headshots', category: 'portrait', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' },
    { id: 11, title: 'Product Lifestyle', category: 'commercial', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop' },
    { id: 12, title: 'Charity Gala', category: 'event', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop' },
  ]

  const filteredItems =
    activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  useEffect(() => {
    gsap.fromTo(
      '.portfolio-header',
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    gsap.fromTo(
      '.category-button',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  useEffect(() => {
    if (galleryRef.current) {
      gsap.fromTo(
        imageRefs.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      )
    }
  }, [activeCategory])

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    setShowLightbox(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setShowLightbox(false)
    document.body.style.overflow = 'auto'
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return
    if (direction === 'prev') {
      setSelectedImage((prev) => (prev === null || prev === 0 ? filteredItems.length - 1 : prev - 1))
    } else {
      setSelectedImage((prev) => (prev === null || prev === filteredItems.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto">
        <div className="portfolio-header text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Portfolio</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Explore my diverse collection of photography work across various
            styles and occasions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-button px-4 py-2 text-sm uppercase tracking-wider transition-colors ${activeCategory === category ? 'bg-black text-white' : 'bg-white text-black border border-gray-200 hover:border-black'}`}
              onClick={() => setActiveCategory(category)}>
              {category}
            </button>
          ))}
        </div>
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { imageRefs.current[index] = el }}
              className="group cursor-pointer overflow-hidden"
              onClick={() => openLightbox(index)}>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-light">{item.title}</h3>
                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
        {showLightbox && selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}>
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={closeLightbox}
              aria-label="Close lightbox">
              ✕
            </button>
            <button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev') }}
              aria-label="Previous image">
              ‹
            </button>
            <div
              className="max-w-5xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}>
              <img
                src={filteredItems[selectedImage].image}
                alt={filteredItems[selectedImage].title}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
                <h3 className="text-lg font-light">{filteredItems[selectedImage].title}</h3>
                <p className="text-sm capitalize">{filteredItems[selectedImage].category}</p>
              </div>
            </div>
            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next') }}
              aria-label="Next image">
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioPage
