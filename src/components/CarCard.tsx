import Link from 'next/link'
import Image from 'next/image'
import { Car } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { Fuel, Gauge, Settings2 } from 'lucide-react'

export default function CarCard({ car }: { car: Car }) {
    const coverImage = car.images?.find((img) => img.is_cover)?.image_url || car.images?.[0]?.image_url || '/placeholder-car.jpg'

    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300">
            <Link href={`/cars/${car.id}`} className="block relative h-64 overflow-hidden">
                <Image
                    src={coverImage}
                    alt={`${car.year} ${car.model?.company?.name} ${car.model?.name}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${car.status === 'available' ? 'bg-green-100 text-green-700' :
                            car.status === 'reserved' ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                        }`}>
                        {car.status}
                    </span>
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm font-medium text-amber-600 uppercase tracking-wide">{car.model?.company?.name}</p>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">
                            {car.year} {car.model?.name}
                        </h3>
                    </div>
                    <p className="text-xl font-extrabold text-slate-900">{formatCurrency(car.price)}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100 my-4">
                    <div className="flex flex-col items-center gap-1">
                        <Fuel size={18} className="text-slate-400" />
                        <span className="text-xs text-slate-500">{car.fuel_type}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Gauge size={18} className="text-slate-400" />
                        <span className="text-xs text-slate-500">{car.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Settings2 size={18} className="text-slate-400" />
                        <span className="text-xs text-slate-500">{car.transmission}</span>
                    </div>
                </div>

                <Link
                    href={`/cars/${car.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    )
}
