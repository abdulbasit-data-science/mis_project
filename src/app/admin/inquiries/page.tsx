import { createClient } from '@/lib/supabase/server'
import AdminInquiriesClient from './AdminInquiriesClient'
import { Inquiry } from '@/types'

async function getInquiries() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('inquiries')
        .select(`
      *,
      car:cars (
        *,
        model:models (
          *,
          company:companies (*)
        )
      ),
      customer:customers (*)
    `)
        .order('created_at', { ascending: false })

    return data as Inquiry[]
}

export default async function AdminInquiriesPage() {
    const inquiries = await getInquiries()

    return <AdminInquiriesClient inquiries={inquiries || []} />
}
