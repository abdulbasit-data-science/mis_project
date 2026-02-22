'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
    {
        id: 1,
        title: 'Precision Engineering',
        description: 'Experience the pinnacle of automotive performance and design.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000',
        tag: 'Performance'
    },
    {
        id: 2,
        title: 'Luxury Redefined',
        description: 'Bespoke interiors crafted with the finest materials for ultimate comfort.',
        image: 'https://images.unsplash.com/photo-1493238531238-700c829ec35b?auto=format&fit=crop&q=80&w=2000',
        tag: 'Luxury'
    },
    {
        id: 3,
        title: 'Future of Driving',
        description: 'Cutting-edge technology meets sustainable power in our electric collection.',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad95e?auto=format&fit=crop&q=80&w=2000',
        tag: 'Innovation'
    }
]

export default function Slideshow() {
    const [current, setCurrent] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    const next = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, [])

    const prev = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    useEffect(() => {
        if (!isAutoPlaying) return
        const interval = setInterval(next, 5000)
        return () => clearInterval(interval)
    }, [next, isAutoPlaying])

    return (
        <section className="relative w-full h-screen overflow-hidden bg-slate-900 group">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className={`object-cover transition-transform duration-[5000ms] ease-linear ${index === current ? 'scale-110' : 'scale-100'
                            }`}
                        priority={index === 0}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex items-center">
                        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
                            <div className={`max-w-2xl transform transition-all duration-1000 delay-300 ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                <span className="inline-block px-4 py-1.5 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-500 rounded-full text-xs font-black tracking-[0.2em] uppercase mb-6">
                                    {slide.tag}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
                                    {slide.title}
                                </h2>
                                <p className="text-xl text-slate-200 mb-10 font-medium leading-relaxed">
                                    {slide.description}
                                </p>
                                <button className="px-10 py-5 bg-amber-500 text-slate-900 font-black rounded-2xl hover:bg-white transition-all shadow-2xl hover:scale-105">
                                    EXPLORE SERIES
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Particles/Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrent(index)
                            setIsAutoPlaying(false)
                        }}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === current ? 'w-12 bg-amber-500' : 'w-3 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-20">
                <button
                    onClick={() => {
                        prev()
                        setIsAutoPlaying(false)
                    }}
                    className="p-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-amber-500 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 -translate-x-10 group-hover:translate-x-0"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    onClick={() => {
                        next()
                        setIsAutoPlaying(false)
                    }}
                    className="p-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-amber-500 hover:text-slate-900 transition-all opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-amber-500 z-30 transition-all duration-300 ease-linear shadow-[0_0_10px_#f59e0b]" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
        </section>
    )
}
