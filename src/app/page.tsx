import { getCars } from '@/actions/cars'
import CarCard from '@/components/CarCard'
import { Search, CarFront, Star, ShieldCheck, Zap, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function HomePage() {
  const cars = await getCars()
  const featuredCars = cars.slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Navbar */}
      <nav className="absolute top-0 w-full z-50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
          <Link href="/" className="flex items-center gap-2 text-2xl md:text-3xl font-black tracking-tighter hover:text-amber-500 transition-colors">
            <CarFront size={36} className="text-amber-500" />
            <span>AUTOELITE</span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link href="/cars" className="font-bold hover:text-amber-500 transition-colors tracking-tight">INVENTORY</Link>
            <Link href="/services" className="font-bold hover:text-amber-500 transition-colors tracking-tight">SERVICES</Link>
            <Link href="/about" className="font-bold hover:text-amber-500 transition-colors tracking-tight">OUR STORY</Link>

          </div>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-white z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-car-parked-in-a-garage-34537-large.mp4" type="video/mp4" />
        </video>

        <div className="relative z-20 text-center text-white px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20">
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-black tracking-[0.2em] uppercase">The Ultimate Driving Experience</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            ELEGANCE IN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">MOTION</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Curated selection of the world's most prestigious vehicles.
            Where luxury meets performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cars" className="px-10 py-5 bg-amber-500 text-slate-900 font-black rounded-2xl hover:bg-white transition-all shadow-2xl hover:scale-105">
              EXPLORE INVENTORY
            </Link>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white font-black rounded-2xl hover:bg-white/20 transition-all">
              BOOK CONSULTATION
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Professional Features */}
      <section className="py-32 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6 group">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 transition-colors">
              <ShieldCheck size={32} className="text-slate-900 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">CERTIFIED QUALITY</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Every vehicle undergoes a rigorous 250-point inspection by our master technicians to ensure peak performance.</p>
          </div>
          <div className="space-y-6 group">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 transition-colors">
              <Zap size={32} className="text-slate-900 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">INSTANT APPROVAL</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Bespoke financing solutions with competitive rates. We handle all paperwork to get you on the road faster.</p>
          </div>
          <div className="space-y-6 group">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 transition-colors">
              <Star size={32} className="text-slate-900 group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-black tracking-tight">VIP SERVICE</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Personal concierge service for maintenance, detailing, and worldwide door-to-door delivery.</p>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4">The Selection</span>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">FEATURED COLLECTION</h2>
            </div>
            <Link href="/cars" className="group flex items-center gap-3 text-lg font-black tracking-tight border-b-2 border-slate-900 pb-1">
              VIEW ALL INVENTORY
              <Zap size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCars.length > 0 ? (
              featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-400 py-10">No vehicles currently spotlighted.</p>
            )}
          </div>
        </div>
      </section>

      {/* Premium CTA / About Section */}
      <section className="relative h-[80vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Car Interior"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-white">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">BEYOND <br />DRIVING</h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-medium leading-relaxed">
              At AutoElite, we don't just sell cars. We curate a lifestyle for those who demand excellence in every detail.
            </p>
            <Link href="/about" className="inline-block px-12 py-6 bg-white text-slate-900 font-black rounded-2xl hover:bg-amber-500 transition-all">
              DISCOVER OUR STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 text-3xl font-black tracking-tighter text-slate-900 mb-8">
                <CarFront size={36} className="text-amber-500" />
                <span>AUTOELITE</span>
              </Link>
              <p className="text-slate-500 font-medium leading-relaxed">The premier destination for luxury and exotic vehicles. Redefining the standard of automotive excellence since 2010.</p>
            </div>

            <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-sm">Navigation</h4>
              <ul className="space-y-4 text-slate-600 font-bold">
                <li><Link href="/cars" className="hover:text-amber-500 transition-colors">Inventory</Link></li>
                <li><Link href="/services" className="hover:text-amber-500 transition-colors">Services</Link></li>
                <li><Link href="/about" className="hover:text-amber-500 transition-colors">Our Story</Link></li>
                <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-sm">Information</h4>
              <ul className="space-y-4 text-slate-600 font-bold">
                <li><Link href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-amber-500 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-amber-500 transition-colors">Financing</Link></li>
                <li><Link href="#" className="hover:text-amber-500 transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-black uppercase tracking-widest text-sm">Connect</h4>
              <div className="space-y-4 text-slate-600 font-bold">
                <p className="flex items-center gap-3"><Phone size={18} className="text-amber-500" /> +92  AUTO-ELITE</p>
                <p className="flex items-center gap-3"><Mail size={18} className="text-amber-500" /> info@autoelite.com</p>
                <p className="flex items-center gap-3 leading-relaxed"><MapPin size={18} className="text-amber-500" /> Gujranwala </p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 font-bold text-sm">
            <p>© 2026 AUTOELITE CARS. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-slate-900 transition-colors">INSTAGRAM</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">TWITTER</Link>
              <Link href="#" className="hover:text-slate-900 transition-colors">FACEBOOK</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
