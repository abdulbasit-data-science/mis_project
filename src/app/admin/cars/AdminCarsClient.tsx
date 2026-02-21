'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import Image from 'next/image'
import { deleteCar } from '@/actions/cars'
import { useRouter } from 'next/navigation'
import { Car } from '@/types'

export default function AdminCarsClient({ cars }: { cars: Car[] }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const [searchTerm, setSearchTerm] = useState('')

    const filteredCars = cars.filter(car => {
        const carName = `${car.year} ${car.model?.company?.name} ${car.model?.name} ${car.color} ${car.fuel_type}`.toLowerCase()
        return carName.includes(searchTerm.toLowerCase())
    })

    const handleDelete = async (id: number, carName: string) => {
        if (!confirm(`Are you sure you want to delete ${carName}? This action cannot be undone.`)) {
            return
        }

        setDeletingId(id)
        startTransition(async () => {
            const result = await deleteCar(id)
            if (result.error) {
                alert(`Failed to delete car: ${result.error}`)
            } else {
                router.refresh()
            }
            setDeletingId(null)
        })
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Inventory Management</h1>
                    <p className="text-slate-500">Add, edit and manage your showroom vehicles</p>
                </div>
                <div className="flex w-full md:w-auto gap-4">
                    <div className="relative flex-1 md:w-64">
                        <Plus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-45" size={18} />
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <Link href="/admin/cars/new">
                        <Button className="flex items-center gap-2 whitespace-nowrap">
                            <Plus size={20} />
                            Add New Car
                        </Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardContent className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Vehicle</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Price</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Mileage</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Added Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredCars.map((car) => {
                                    const carName = `${car.year} ${car.model?.company?.name} ${car.model?.name}`
                                    const isDeleting = deletingId === car.id

                                    return (
                                        <tr key={car.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 relative rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                                                        {car.images?.[0] ? (
                                                            <Image
                                                                src={car.images[0].image_url}
                                                                alt=""
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-slate-400">
                                                                <Plus size={16} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{car.year} {car.model?.name}</p>
                                                        <p className="text-xs text-slate-500 uppercase font-medium">{car.model?.company?.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${car.status === 'available' ? 'bg-green-100 text-green-700' :
                                                    car.status === 'reserved' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {car.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {formatCurrency(car.price)}
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">
                                                {car.mileage.toLocaleString()} km
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-sm">
                                                {formatDate(car.created_at)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/cars/${car.id}`} target="_blank">
                                                        <Button variant="ghost" size="sm" className="p-2 h-9 w-9">
                                                            <ExternalLink size={16} />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/cars/edit/${car.id}`}>
                                                        <Button variant="outline" size="sm" className="p-2 h-9 w-9">
                                                            <Edit size={16} />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="p-2 h-9 w-9 text-red-600 hover:bg-red-50 hover:border-red-200"
                                                        onClick={() => handleDelete(car.id, carName)}
                                                        disabled={isDeleting || isPending}
                                                    >
                                                        {isDeleting ? (
                                                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
