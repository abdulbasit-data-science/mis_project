'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { createSale } from '@/actions/sales'
import { Car, Customer } from '@/types'

// Define a type for Customer if it's imported correctly
interface SaleFormProps {
    cars: any[] // Using any for now to avoid strict type issues with joins
    customers: any[]
    defaultCarId?: number
    defaultCustomerId?: number
    defaultPrice?: number
}

export default function SaleForm({ cars, customers, defaultCarId, defaultCustomerId, defaultPrice }: SaleFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await createSale(formData)
            if (result?.error) {
                if (typeof result.error === 'string') {
                    setError(result.error)
                } else {
                    // map errors to fields if possible, or just stringify
                    setError(JSON.stringify(result.error))
                }
            } else {
                router.push('/admin/sales')
            }
        } catch (err) {
            setError('An unexpected error occurred')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    // Filter to only include available cars or the pre-selected car
    const relevantCars = cars.filter(c => c.status === 'available' || c.id === defaultCarId)

    return (
        <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="car_id" className="block text-sm font-medium text-slate-700">Vehicle</label>
                    <select
                        id="car_id"
                        name="car_id"
                        defaultValue={defaultCarId || ''}
                        required
                        className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                        <option value="">Select a vehicle</option>
                        {relevantCars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.year} {car.model?.name} - {car.color} ({car.status})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="customer_id" className="block text-sm font-medium text-slate-700">Customer</label>
                    <select
                        id="customer_id"
                        name="customer_id"
                        defaultValue={defaultCustomerId || ''}
                        required
                        className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                        <option value="">Select a customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name} ({customer.phone})
                            </option>
                        ))}
                    </select>
                </div>

                <Input
                    label="Sale Price"
                    id="sale_price"
                    name="sale_price"
                    type="number"
                    defaultValue={defaultPrice || ''}
                    placeholder="Enter sale amount"
                    required
                />

                <Input
                    label="Sale Date"
                    id="sale_date"
                    name="sale_date"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    required
                />

                <div className="space-y-2">
                    <label htmlFor="payment_method" className="block text-sm font-medium text-slate-700">Payment Method</label>
                    <select
                        id="payment_method"
                        name="payment_method"
                        defaultValue="Cash"
                        required
                        className="w-full h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Check">Check</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes (Optional)</label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Any additional details about the sale..."
                />
            </div>

            <div className="flex gap-4 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                <Button type="submit" isLoading={isLoading}>Complete Sale</Button>
            </div>
        </form>
    )
}
