'use client'

import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { CalendarIcon, ClockIcon, UserIcon, MailIcon, PhoneIcon, MessageSquareIcon } from 'lucide-react'

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const services = [
    { id: 'wedding', name: 'Wedding Photography', price: '$1,999+' },
    { id: 'portrait', name: 'Portrait Session', price: '$499+' },
    { id: 'commercial', name: 'Commercial Photography', price: '$899+' },
    { id: 'event', name: 'Event Coverage', price: '$699+' },
  ]

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date()
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }
  const availableDates = generateDates()

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setTimeout(() => setStep(2), 300)
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setTimeout(() => setStep(3), 300)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setTimeout(() => setStep(4), 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for booking! We'll contact you shortly to confirm your appointment.")
  }

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        '.step-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [step])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Book a Session</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-light">
            Schedule your photography session in just a few simple steps.
          </p>
        </div>
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= stepNumber ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {stepNumber}
                </div>
                <span className={`text-sm ${step >= stepNumber ? 'text-black' : 'text-gray-500'}`}>
                  {stepNumber === 1 && 'Service'}
                  {stepNumber === 2 && 'Date'}
                  {stepNumber === 3 && 'Time'}
                  {stepNumber === 4 && 'Details'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-gray-200 mt-4">
            <div
              className="absolute h-full bg-black transition-all duration-500 ease-in-out"
              style={{ width: `${(step - 1) * 33.33}%` }}
            />
          </div>
        </div>
        <div ref={formRef} className="max-w-4xl mx-auto bg-white p-8 shadow-sm">
          {step === 1 && (
            <div className="step-content">
              <h2 className="text-2xl font-light mb-6">Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`border p-6 cursor-pointer transition-all ${selectedService === service.id ? 'border-black' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => handleServiceSelect(service.id)}>
                    <h3 className="text-xl font-light mb-2">{service.name}</h3>
                    <p className="text-gray-600 font-light">Starting at {service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="step-content">
              <div className="flex items-center mb-6">
                <button onClick={() => setStep(1)} className="text-gray-500 mr-4 hover:text-black">← Back</button>
                <h2 className="text-2xl font-light">Select a Date</h2>
              </div>
              <div className="flex items-center mb-4">
                <CalendarIcon size={20} className="mr-2" />
                <span className="text-gray-600">
                  Available dates for {services.find((s) => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableDates.map((date, index) => (
                  <div
                    key={index}
                    className={`border p-4 text-center cursor-pointer transition-all ${selectedDate && date.toDateString() === selectedDate.toDateString() ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => handleDateSelect(date)}>
                    <div className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="text-lg">{date.getDate()}</div>
                    <div className="text-sm text-gray-500">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="step-content">
              <div className="flex items-center mb-6">
                <button onClick={() => setStep(2)} className="text-gray-500 mr-4 hover:text-black">← Back</button>
                <h2 className="text-2xl font-light">Select a Time</h2>
              </div>
              <div className="flex items-center mb-4">
                <ClockIcon size={20} className="mr-2" />
                <span className="text-gray-600">Available times for {formatDate(selectedDate!)}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time, index) => (
                  <div
                    key={index}
                    className={`border p-4 text-center cursor-pointer transition-all ${selectedTime === time ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => handleTimeSelect(time)}>
                    <div className="text-lg">{time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="step-content">
              <div className="flex items-center mb-6">
                <button onClick={() => setStep(3)} className="text-gray-500 mr-4 hover:text-black">← Back</button>
                <h2 className="text-2xl font-light">Your Information</h2>
              </div>
              <div className="bg-gray-50 p-4 mb-6">
                <h3 className="font-medium mb-2">Booking Summary</h3>
                <p className="text-gray-600">
                  {services.find((s) => s.id === selectedService)?.name}
                  <br />
                  {selectedDate && formatDate(selectedDate)} at {selectedTime}
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                      <input type="tel" className="w-full pl-10 py-3 border border-gray-300 focus:border-black outline-none" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Event Location (if applicable)</label>
                    <input type="text" className="w-full py-3 px-4 border border-gray-300 focus:border-black outline-none" />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Additional Information</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquareIcon size={18} className="text-gray-400" />
                    </div>
                    <textarea
                      className="w-full pl-10 py-3 border border-gray-300 focus:border-black outline-none h-32"
                      placeholder="Tell us more about your event or any specific requirements...">
                    </textarea>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" required />
                    <span className="text-gray-700">I agree to the terms and conditions</span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-opacity-80 transition-colors">
                  Complete Booking
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingPage
