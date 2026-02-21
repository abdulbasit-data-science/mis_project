'use server'

import { createClient } from '@/lib/supabase/server'

export async function getCompanies() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('name')

    if (error) {
        console.error('Error fetching companies:', error)
        return []
    }

    return data
}

export async function getModelsByCompany(companyId: number) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('company_id', companyId)
        .order('name')

    if (error) {
        console.error('Error fetching models:', error)
        return []
    }

    return data
}

export async function getAllModels() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('models')
        .select(`
            *,
            company:companies(*)
        `)
        .order('name')

    if (error) {
        console.error('Error fetching models:', error)
        return []
    }

    return data
}
