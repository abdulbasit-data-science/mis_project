'use server'

import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()

    const [
        { count: totalCars },
        { count: soldCars },
        { count: totalInquiries },
        { data: salesData }
    ] = await Promise.all([
        supabase.from('cars').select('*', { count: 'exact', head: true }),
        supabase.from('cars').select('*', { count: 'exact', head: true }).eq('status', 'sold'),
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('sales').select('sale_price, sale_date')
    ])

    const totalRevenue = salesData?.reduce((acc, sale) => acc + Number(sale.sale_price), 0) || 0

    return {
        totalCars: totalCars || 0,
        soldCars: soldCars || 0,
        totalInquiries: totalInquiries || 0,
        totalRevenue
    }
}

export async function getMonthlyRevenue() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('sales')
        .select('sale_price, sale_date')
        .order('sale_date', { ascending: true })

    if (error) return []

    // Group by month
    const monthlyData: { [key: string]: number } = {}
    data.forEach((sale) => {
        const month = new Date(sale.sale_date).toLocaleDateString('en-US', { month: 'short' })
        monthlyData[month] = (monthlyData[month] || 0) + Number(sale.sale_price)
    })

    return Object.entries(monthlyData).map(([name, total]) => ({ name, total }))
}
