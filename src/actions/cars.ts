'use server'

import { createClient } from '@/lib/supabase/server'
import { Car } from '@/types'

export async function getCars(filters?: {
    companyId?: number
    modelId?: number
    minPrice?: number
    maxPrice?: number
    year?: number
    search?: string
}) {
    const supabase = createClient()

    let query = supabase
        .from('cars')
        .select(`
      *,
      model:models (
        *,
        company:companies (*)
      ),
      images:car_images (*)
    `)
        .order('created_at', { ascending: false })

    if (filters?.companyId) {
        // Need to handle model filter through company_id
        // This is a bit tricky with Supabase if we don't have company_id in cars table
        // But we can filter on models table
    }

    if (filters?.minPrice) {
        query = query.gte('price', filters.minPrice)
    }
    if (filters?.maxPrice) {
        query = query.lte('price', filters.maxPrice)
    }
    if (filters?.year) {
        query = query.eq('year', filters.year)
    }
    if (filters?.search) {
        // Search in model name or company name might require a join query
        // Simplified for now
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching cars:', error)
        return []
    }

    return data as Car[]
}

export async function getCarById(id: number) {
    const supabase = createClient()

    const { data, error } = await supabase
        .from('cars')
        .select(`
      *,
      model:models (
        *,
        company:companies (*)
      ),
      images:car_images (*)
    `)
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching car:', error)
        return null
    }

    return data as Car
}
