'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const SaleSchema = z.object({
    car_id: z.coerce.number().min(1, 'Car is required'),
    customer_id: z.coerce.number().min(1, 'Customer is required'),
    sale_price: z.coerce.number().min(1, 'Price is required'),
    sale_date: z.string().min(1, 'Date is required'),
    payment_method: z.string().min(1, 'Payment method is required'),
    notes: z.string().optional(),
})

export async function createSale(formData: FormData) {
    const supabase = await createClient()

    // Get current user profile
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

    if (!profile) {
        return { error: 'User profile not found' }
    }

    const rawData = {
        car_id: formData.get('car_id'),
        customer_id: formData.get('customer_id'),
        sale_price: formData.get('sale_price'),
        sale_date: formData.get('sale_date'),
        payment_method: formData.get('payment_method'),
        notes: formData.get('notes'),
    }

    const validatedFields = SaleSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors }
    }

    const { car_id, customer_id, sale_price, sale_date, payment_method } = validatedFields.data

    // 1. Create sale record
    const { error: saleError } = await supabase.from('sales').insert({
        car_id,
        customer_id,
        sale_price,
        sale_date,
        payment_method,
        handled_by: profile.id,
    })

    if (saleError) {
        console.error('Error creating sale:', saleError)
        return { error: 'Failed to create sale' }
    }

    // 2. Update car status to sold
    const { error: carError } = await supabase
        .from('cars')
        .update({ status: 'sold' })
        .eq('id', car_id)

    if (carError) {
        console.error('Error updating car status:', carError)
        // Should probably rollback sale or alert admin
        return { error: 'Sale created but failed to update car status' }
    }

    // 3. Close inquiry if tied to this car and customer (optional, but good for UX)
    // Logic: find open inquiry for this car/customer and set status to closed?
    // User asked to "convert" inquiry, so yeah.

    await supabase
        .from('inquiries')
        .update({ status: 'closed' })
        .eq('car_id', car_id)
        .eq('customer_id', customer_id)
        .in('status', ['new', 'contacted'])

    revalidatePath('/admin/sales')
    revalidatePath('/admin/cars')
    revalidatePath('/admin/inquiries')
    redirect('/admin/sales')
}
