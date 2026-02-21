import { CarFront, Phone, Mail, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
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

            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 italic">GET IN <br /><span className="text-amber-500">TOUCH</span></h1>
                            <p className="text-xl text-slate-500 mb-12 font-medium">Our specialists are available for private consultations and viewings.</p>

                            <div className="space-y-8">
                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone className="text-amber-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Phone</h4>
                                        <p className="text-xl font-bold text-slate-900">+1 (800) AUTO-ELITE</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail className="text-amber-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Email</h4>
                                        <p className="text-xl font-bold text-slate-900">concierge@autoelite.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="text-amber-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Location</h4>
                                        <p className="text-xl font-bold text-slate-900">Gujranwala</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                                        <Clock className="text-amber-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-1">Hours</h4>
                                        <p className="text-xl font-bold text-slate-900">Mon - Sat: 9:00 AM - 8:00 PM</p>
                                        <p className="text-slate-500 italic">Sunday by appointment only</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-12 rounded-[3rem] text-white shadow-2xl">
                            <h3 className="text-3xl font-black mb-8">Send a Message</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">First Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Last Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Message</label>
                                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
                                </div>
                                <button className="w-full py-5 bg-amber-500 text-slate-900 font-black rounded-2xl hover:bg-white transition-all shadow-xl">
                                    SEND INQUIRY
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
