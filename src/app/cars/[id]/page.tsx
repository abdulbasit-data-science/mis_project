import { getCarById } from '@/actions/cars'
import { formatCurrency } from '@/lib/utils'
import Image from 'next/image'
import InquiryForm from '@/components/InquiryForm'
import { Fuel, Gauge, Settings2, Calendar, Palette, CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const car = await getCarById(Number(id))

    if (!car) {
        notFound()
    }

    const carName = `${car.year} ${car.model?.company?.name} ${car.model?.name}`

    return (
        <div className="bg-slate-50 min-h-screen">
            <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors font-medium">
                    <ArrowLeft size={20} />
                    <span>Back to Inventory</span>
                </Link>
            </nav>

            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                            <Image
                                src={car.images?.[0]?.image_url || '/placeholder-car.jpg'}
                                alt={carName}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-6 left-6">
                                <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg ${car.status === 'available' ? 'bg-green-500 text-white' :
                                    car.status === 'reserved' ? 'bg-amber-500 text-white' :
                                        'bg-red-500 text-white'
                                    }`}>
                                    {car.status}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {car.images?.slice(1, 5).map((img, idx) => (
                                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md bg-slate-200 cursor-pointer hover:ring-2 hover:ring-amber-500 transition-all">
                                    <Image src={img.image_url} alt="" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-2">{car.model?.company?.name}</p>
                                <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">{carName}</h1>
                            </div>
                            <p className="text-4xl font-black text-slate-900">{formatCurrency(car.price)}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Calendar size={24} /></div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Year</p>
                                    <p className="font-bold text-slate-900">{car.year}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Gauge size={24} /></div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Mileage</p>
                                    <p className="font-bold text-slate-900">{car.mileage.toLocaleString()} km</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Fuel size={24} /></div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Fuel Type</p>
                                    <p className="font-bold text-slate-900">{car.fuel_type}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Settings2 size={24} /></div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Transm.</p>
                                    <p className="font-bold text-slate-900">{car.transmission}</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                                Description
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                                {car.description || 'No description available for this vehicle.'}
                            </p>
                        </div>

                        <div className="py-8 space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                                Specifications
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Color', value: car.color, icon: Palette },
                                    { label: 'Transmission', value: car.transmission, icon: Settings2 },
                                    { label: 'Fuel Type', value: car.fuel_type, icon: Fuel },
                                    { label: 'Availability', value: car.status, icon: CheckCircle2 },
                                ].map((spec) => (
                                    <div key={spec.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <spec.icon size={18} />
                                            <span className="text-sm font-medium">{spec.label}</span>
                                        </div>
                                        <span className="font-bold text-slate-900 capitalize">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <InquiryForm carId={car.id} carName={carName} />
                    </div>
                </div>
            </main>
        </div>
    )
}
