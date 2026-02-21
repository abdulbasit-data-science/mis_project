'use server'

import { createClient } from '@/lib/supabase/server'
import { Car } from '@/types'
import { revalidatePath } from 'next/cache'

export async function getCars(filters?: {
    companyId?: number
    modelId?: number
    minPrice?: number
    maxPrice?: number
    year?: number
    search?: string
}) {
    const supabase = await createClient()

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

    let cars = data as Car[]

    if (filters?.search) {
        const searchLower = filters.search.toLowerCase()
        cars = cars.filter(car => {
            const modelName = car.model?.name?.toLowerCase() || ''
            const companyName = car.model?.company?.name?.toLowerCase() || ''
            const description = car.description?.toLowerCase() || ''
            const year = car.year.toString()

            return modelName.includes(searchLower) ||
                companyName.includes(searchLower) ||
                description.includes(searchLower) ||
                year.includes(searchLower)
        })
    }

    return cars
}

export async function getCarById(id: number) {
    const supabase = await createClient()

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

export async function deleteCar(id: number) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting car:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/cars')
    revalidatePath('/cars')

    return { success: true }
}

export async function createCar(formData: FormData) {
    const supabase = await createClient()

    let modelId = Number(formData.get('model_id'))
    const isNewModel = formData.get('is_new_model') === 'true'
    const isNewCompany = formData.get('is_new_company') === 'true'

    // 0. Handle New Company/Brand Creation
    let companyId = Number(formData.get('company_id'))
    if (isNewCompany) {
        const newCompanyName = formData.get('new_company_name') as string
        const { data: newCompany, error: companyError } = await supabase
            .from('companies')
            .insert({ name: newCompanyName })
            .select()
            .single()

        if (companyError) {
            console.error('Error creating company:', companyError)
            return { error: `Failed to create brand: ${companyError.message}` }
        }
        companyId = newCompany.id
    }

    // 0.1 Handle New Model Creation
    if (isNewModel) {
        const newModelName = formData.get('new_model_name') as string

        const { data: newModel, error: modelError } = await supabase
            .from('models')
            .insert({ name: newModelName, company_id: companyId })
            .select()
            .single()

        if (modelError) {
            console.error('Error creating model:', modelError)
            return { error: `Failed to create model: ${modelError.message}` }
        }
        modelId = newModel.id
    }

    // 1. Extract car data
    const carData = {
        model_id: modelId,
        year: Number(formData.get('year')),
        price: Number(formData.get('price')),
        mileage: Number(formData.get('mileage')),
        fuel_type: formData.get('fuel_type') as string,
        transmission: formData.get('transmission') as string,
        color: formData.get('color') as string,
        status: formData.get('status') as string,
        description: formData.get('description') as string,
    }

    // 2. Insert car record
    const { data: car, error: carError } = await supabase
        .from('cars')
        .insert(carData)
        .select()
        .single()

    if (carError) {
        console.error('Error creating car:', carError)
        return { error: carError.message }
    }

    // 3. Handle Image Uploads
    const files = formData.getAll('images') as File[]
    const validFiles = files.filter(file => file.size > 0 && file.name !== 'undefined')

    if (validFiles.length > 0) {
        const uploadPromises = validFiles.map(async (file, index) => {
            const fileExt = file.name.split('.').pop()
            const fileName = `${car.id}-${crypto.randomUUID()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('car-images')
                .upload(filePath, file)

            if (uploadError) {
                console.error('Error uploading image:', uploadError)
                return null
            }

            const { data: { publicUrl } } = supabase.storage
                .from('car-images')
                .getPublicUrl(filePath)

            return {
                car_id: car.id,
                image_url: publicUrl,
                is_cover: index === 0 // First image is cover
            }
        })

        const uploadedImages = (await Promise.all(uploadPromises)).filter(img => img !== null)

        if (uploadedImages.length > 0) {
            const { error: imageError } = await supabase
                .from('car_images')
                .insert(uploadedImages)

            if (imageError) {
                console.error('Error saving car images:', imageError)
            }
        }
    }

    revalidatePath('/admin/cars')
    revalidatePath('/cars')

    return { success: true, data: car }
}

export async function updateCar(id: number, formData: FormData) {
    const supabase = await createClient()

    let modelId = Number(formData.get('model_id'))
    const isNewModel = formData.get('is_new_model') === 'true'
    const isNewCompany = formData.get('is_new_company') === 'true'

    // 0. Handle New Company/Brand Creation
    let companyId = Number(formData.get('company_id'))
    if (isNewCompany) {
        const newCompanyName = formData.get('new_company_name') as string
        const { data: newCompany, error: companyError } = await supabase
            .from('companies')
            .insert({ name: newCompanyName })
            .select()
            .single()

        if (companyError) {
            console.error('Error creating company:', companyError)
            return { error: `Failed to create brand: ${companyError.message}` }
        }
        companyId = newCompany.id
    }

    // 0.1 Handle New Model Creation
    if (isNewModel) {
        const newModelName = formData.get('new_model_name') as string

        const { data: newModel, error: modelError } = await supabase
            .from('models')
            .insert({ name: newModelName, company_id: companyId })
            .select()
            .single()

        if (modelError) {
            console.error('Error creating model:', modelError)
            return { error: `Failed to create model: ${modelError.message}` }
        }
        modelId = newModel.id
    }

    // 1. Extract and update car data
    const carData: any = {
        year: Number(formData.get('year')),
        price: Number(formData.get('price')),
        mileage: Number(formData.get('mileage')),
        fuel_type: formData.get('fuel_type') as string,
        transmission: formData.get('transmission') as string,
        color: formData.get('color') as string,
        status: formData.get('status') as string,
        description: formData.get('description') as string,
    }

    // Only update model_id if we have a valid one (either from form or newly created)
    if (modelId) {
        carData.model_id = modelId
    }

    const { data: car, error: carError } = await supabase
        .from('cars')
        .update(carData)
        .eq('id', id)
        .select()
        .single()

    if (carError) {
        console.error('Error updating car:', carError)
        return { error: carError.message }
    }

    // 2. Handle New Image Uploads
    const files = formData.getAll('images') as File[]
    const validFiles = files.filter(file => file.size > 0 && file.name !== 'undefined')

    if (validFiles.length > 0) {
        // Upload new images
        const uploadPromises = validFiles.map(async (file) => {
            const fileExt = file.name.split('.').pop()
            const fileName = `${id}-${crypto.randomUUID()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('car-images')
                .upload(filePath, file)

            if (uploadError) {
                console.error('Error uploading image:', uploadError)
                return null
            }

            const { data: { publicUrl } } = supabase.storage
                .from('car-images')
                .getPublicUrl(filePath)

            return {
                car_id: id,
                image_url: publicUrl,
                is_cover: false // New uploads are not cover by default unless specific logic
            }
        })

        const uploadedImages = (await Promise.all(uploadPromises)).filter(img => img !== null)

        if (uploadedImages.length > 0) {
            const { error: imageError } = await supabase
                .from('car_images')
                .insert(uploadedImages)

            if (imageError) {
                console.error('Error saving new car images:', imageError)
            }
        }
    }

    revalidatePath('/admin/cars')
    revalidatePath('/cars')

    return { success: true, data: car }
}
