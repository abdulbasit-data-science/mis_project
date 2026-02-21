'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createInquiry(formData: FormData) {
    const supabase = await createClient()

    const carId = formData.get('car_id')
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const city = formData.get('city') as string
    const message = formData.get('message') as string

    // 1. Create or get customer
    const { data: customer, error: customerError } = await supabase
        .from('customers')
        .upsert({ email, name, phone, city }, { onConflict: 'email' })
        .select('id')
        .single()

    if (customerError) {
        return { error: 'Failed to register customer details' }
    }

    // 2. Create inquiry
    const { error: inquiryError } = await supabase
        .from('inquiries')
        .insert({
            car_id: carId ? Number(carId) : null,
            customer_id: customer.id,
            message,
            status: 'new'
        })

    if (inquiryError) {
        return { error: 'Failed to send inquiry' }
    }

    revalidatePath('/admin/inquiries')
    return { success: true }
}

export async function updateInquiryStatus(id: number, status: 'new' | 'contacted' | 'closed') {
    const supabase = await createClient()

    const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)

    if (error) {
        console.error('Error updating inquiry:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/inquiries')
    return { success: true }
}

export async function deleteInquiry(id: number) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting inquiry:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/inquiries')
    return { success: true }
}
