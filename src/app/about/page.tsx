import { CarFront, ShieldCheck, Award, Users, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="bg-slate-900 p-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter hover:text-amber-500 transition-colors">
                        <CarFront size={32} className="text-amber-500" />
                        <span>AUTOELITE</span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-32 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
                        alt="Modern Building"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 text-center">
                    <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
                        LEGACY OF <br />
                        <span className="text-amber-500">EXCELLENCE</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium">
                        Since 2010, AutoElite has been the premier destination for discerning collectors and automotive enthusiasts.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">OUR STORY</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Founded with a passion for exceptional engineering and timeless design, AutoElite began as a boutique gallery in Gujranwala. Today, we stand as a global leader in the luxury automotive sector, offering a hand-curated selection of the world's most prestigious vehicles.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our philosophy is simple: we don't just sell cars; we facilitate the pursuit of perfection. Every vehicle in our inventory is a masterpiece of performance and luxury, vetted by our master technicians to meet our uncompromising standards.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div>
                                    <h4 className="text-4xl font-black text-amber-500">15+</h4>
                                    <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Years of Excellence</p>
                                </div>
                                <div>
                                    <h4 className="text-4xl font-black text-amber-500">5k+</h4>
                                    <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Cars Delivered</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000"
                                alt="Classic Car"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">OUR CORE VALUES</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-colors">
                                <ShieldCheck size={32} className="text-amber-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">INTEGRITY</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Transparent dealings and honest valuations are the foundation of every client relationship we build.</p>
                        </div>
                        <div className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-colors">
                                <Award size={32} className="text-amber-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">QUALITY</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Only the finest vehicles pass our intensive 250-point inspection process, ensuring peak performance.</p>
                        </div>
                        <div className="bg-white p-12 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-colors">
                                <Users size={32} className="text-amber-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">PERSONAL SERVICE</h3>
                            <p className="text-slate-500 font-medium leading-relaxed">Bespoke experiences tailored to your unique requirements, from sourcing to worldwide delivery.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
