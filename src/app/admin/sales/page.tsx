import { createClient } from '@/lib/supabase/server'
import { Sale } from '@/types'
import AdminSalesClient from './AdminSalesClient'

async function getSales() {
    const supabase = await createClient()
    const { data } = await supabase
        .from('sales')
        .select(`
      *,
      car:cars (
        *,
        model:models (
          *,
          company:companies (*)
        )
      ),
      customer:customers (*),
      profile:profiles (*)
    `)
        .order('sale_date', { ascending: false })

    return data as Sale[]
}

export default async function AdminSalesPage() {
    const sales = await getSales()

    return <AdminSalesClient sales={sales} />
}
