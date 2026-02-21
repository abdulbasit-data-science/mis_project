import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SaleForm from './SaleForm'

export default async function NewSalePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const supabase = await createClient()

    // check current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // Parse query params
    const carId = params.car_id ? parseInt(params.car_id as string) : undefined
    const customerId = params.customer_id ? parseInt(params.customer_id as string) : undefined

    // Fetch cars (available or the specific one even if reserved/sold if we are editing? 
    // For a new sale, we generally want available cars, but if we are converting an inquiry 
    // for a specific car, we should definitely include it.)
    const { data: cars } = await supabase
        .from('cars')
        .select(`
            *,
            model:models (
                name,
                company:companies (name)
            )
        `)
        .order('created_at', { ascending: false })

    // Fetch customers
    const { data: customers } = await supabase
        .from('customers')
        .select('*')
        .order('name', { ascending: true })

    // If specific car request, find it to get price
    let defaultPrice = undefined
    if (carId && cars) {
        const selectedCar = cars.find(c => c.id === carId)
        if (selectedCar) {
            defaultPrice = selectedCar.price
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">New Sale</h1>
                <p className="text-slate-500">Record a new vehicle sale transaction</p>
            </div>

            <SaleForm
                cars={cars || []}
                customers={customers || []}
                defaultCarId={carId}
                defaultCustomerId={customerId}
                defaultPrice={defaultPrice}
            />
        </div>
    )
}
