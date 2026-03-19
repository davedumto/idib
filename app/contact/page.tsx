'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { UserIcon, MailIcon, PhoneIcon, MessageSquareIcon, InstagramIcon, FacebookIcon, LinkedinIcon } from 'lucide-react'

const ContactPage = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }
    if (formRef.current && infoRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })
      gsap.fromTo(infoRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We'll get back to you as soon as possible.")
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Contact Me</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Have a question or want to work together? I&apos;d love to hear from you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div ref={formRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <UserIcon size={18} className="text-gray-400" />
                  </div>
                  <input type="text" className="w-full pl-10 py-3 border border-gray-300 focus:border-black outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MailIcon size={18} className="text-gray-400" />
                  </div>
                  <input type="email" className="w-full pl-10 py-3 border border-gray-300 focus:border-black outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <PhoneIcon size={18} className="text-gray-400" />
                  </div>
                  <input type="tel" className="w-full pl-10 py-3 border border-gray-300 focus:border-black outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <select className="w-full py-3 px-4 border border-gray-300 focus:border-black outline-none">
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="pricing">Pricing Information</option>
                  <option value="availability">Check Availability</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquareIcon size={18} className="text-gray-400" />
                  </div>
                  <textarea className="w-full pl-10 py-3 border border-gray-300 focus:border-black outline-none h-32" required></textarea>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-opacity-80 transition-colors">
                Send Message
              </button>
            </form>
          </div>
          <div ref={infoRef} className="space-y-8">
            <div>
              <h2 className="text-2xl font-light mb-6">Contact Information</h2>
              <div className="space-y-4">
                <p className="flex items-start">
                  <MailIcon size={18} className="mr-4 mt-1" />
                  <span>hello@emmarose.com</span>
                </p>
                <p className="flex items-start">
                  <PhoneIcon size={18} className="mr-4 mt-1" />
                  <span>+1 (555) 123-4567</span>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-6">Studio Location</h2>
              <p className="text-gray-600 mb-4">
                123 Photography Studio<br />
                SoHo, New York City<br />
                NY 10012, United States
              </p>
              <div className="aspect-[4/3] bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.8902123284697!2d-74.00340224832863!3d40.72371667932921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f7ca780b9%3A0x3dd789def3d0eeb3!2sSoHo%2C%20New%20York%2C%20NY%2010012!5e0!3m2!1sen!2sus!4v1661794387021!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Studio Location">
                </iframe>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-light mb-6">Connect With Me</h2>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors" aria-label="Instagram">
                  <InstagramIcon size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors" aria-label="Facebook">
                  <FacebookIcon size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors" aria-label="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
