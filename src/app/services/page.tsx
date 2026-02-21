import { CarFront, Zap, ShieldCheck, Star, BadgeDollarSign, Truck, Sparkles, Wrench } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
    const services = [
        {
            title: "Bespoke Financing",
            description: "Tailored financial solutions with competitive rates from our network of premium lenders.",
            icon: BadgeDollarSign,
            color: "bg-blue-50 text-blue-600"
        },
        {
            title: "Worldwide Delivery",
            description: "Secure, enclosed transportation of your vehicle to any destination globally, door-to-door.",
            icon: Truck,
            color: "bg-purple-50 text-purple-600"
        },
        {
            title: "Master Maintenance",
            description: "Specialized servicing by factory-trained technicians using state-of-the-art diagnostic equipment.",
            icon: Wrench,
            color: "bg-green-50 text-green-600"
        },
        {
            title: "Concierge Sourcing",
            description: "Unparalleled access to rare and limited-production vehicles through our extensive private network.",
            icon: Sparkles,
            color: "bg-amber-50 text-amber-600"
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navbar */}
            <nav className="bg-slate-900 p-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter hover:text-amber-500 transition-colors">
                        <CarFront size={32} className="text-amber-500" />
                        <span>AUTOELITE</span>
                    </Link>
                </div>
            </nav>

            {/* Header */}
            <section className="bg-white py-32 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
                    <span className="text-amber-600 font-bold uppercase tracking-[0.3em] text-sm mb-6 block">Uncompromising Care</span>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8">PREMIUM SERVICES</h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Beyond the transaction, we offer a comprehensive suite of services designed to simplify ownership and enhance the driving experience.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col items-center text-center group">
                                <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <service.icon size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detail Section */}
            <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">WHY CHOOSE OUR <br /><span className="text-amber-500">EXPERT CARE?</span></h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <ShieldCheck className="text-amber-500 shrink-0" size={28} />
                                    <div>
                                        <h4 className="text-xl font-bold">Absolute Protection</h4>
                                        <p className="text-slate-400">Comprehensive insurance and secure handling during every phase of service or transport.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Star className="text-amber-500 shrink-0" size={28} />
                                    <div>
                                        <h4 className="text-xl font-bold">White Glove Experience</h4>
                                        <p className="text-slate-400">Personalized attention from a dedicated concierge who manages every detail for you.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Zap className="text-amber-500 shrink-0" size={28} />
                                    <div>
                                        <h4 className="text-xl font-bold">Priority Resolution</h4>
                                        <p className="text-slate-400">Fast-tracked scheduling and rapid response times for all our elite clients.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] space-y-8">
                            <h3 className="text-3xl font-black">Need a Consultation?</h3>
                            <p className="text-slate-300">Speak with our specialists today about your bespoke requirements.</p>
                            <button className="w-full py-6 bg-amber-500 text-slate-900 font-black rounded-2xl hover:bg-white transition-all shadow-xl">
                                SCHEDULE ADVISORY
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
