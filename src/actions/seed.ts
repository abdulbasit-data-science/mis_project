'use server'

import { createAdminClient } from '@/lib/supabase/server'

export async function seedDatabase() {
    const supabase = await createAdminClient()

    // 1. Companies
    const { data: companies } = await supabase.from('companies').upsert([
        { name: 'Mercedes-Benz', country: 'Germany' },
        { name: 'BMW', country: 'Germany' },
        { name: 'Audi', country: 'Germany' },
        { name: 'Tesla', country: 'USA' },
        { name: 'Porsche', country: 'Germany' },
        { name: 'Land Rover', country: 'UK' },
        { name: 'Ferrari', country: 'Italy' },
        { name: 'Lamborghini', country: 'Italy' },
        { name: 'Rolls-Royce', country: 'UK' },
    ], { onConflict: 'name' }).select()

    if (!companies) return { error: 'Failed to seed companies' }

    // 2. Models
    const modelsToInsert = [
        { name: 'S-Class S580', company_id: companies.find(c => c.name === 'Mercedes-Benz')?.id },
        { name: 'G-Wagon G63', company_id: companies.find(c => c.name === 'Mercedes-Benz')?.id },
        { name: 'M5 Competition', company_id: companies.find(c => c.name === 'BMW')?.id },
        { name: 'i7 xDrive60', company_id: companies.find(c => c.name === 'BMW')?.id },
        { name: 'RS6 Avant', company_id: companies.find(c => c.name === 'Audi')?.id },
        { name: 'Model S Plaid', company_id: companies.find(c => c.name === 'Tesla')?.id },
        { name: '911 Turbo S', company_id: companies.find(c => c.name === 'Porsche')?.id },
        { name: 'Range Rover Autobiography', company_id: companies.find(c => c.name === 'Land Rover')?.id },
        { name: 'SF90 Stradale', company_id: companies.find(c => c.name === 'Ferrari')?.id },
        { name: 'Urus Performante', company_id: companies.find(c => c.name === 'Lamborghini')?.id },
        { name: 'Phantom VIII', company_id: companies.find(c => c.name === 'Rolls-Royce')?.id },
    ].filter(m => m.company_id)

    const { data: models } = await supabase.from('models').upsert(modelsToInsert, { onConflict: 'name' }).select()

    if (!models) return { error: 'Failed to seed models' }

    // 3. Cars
    const carsToInsert = [
        {
            model_id: models.find(m => m.name === 'S-Class S580')?.id,
            year: 2024,
            price: 125000,
            mileage: 0,
            fuel_type: 'Hybrid',
            transmission: 'Automatic',
            color: 'Obsidian Black',
            status: 'available',
            description: 'The pinnacle of luxury. Brand new 2024 Mercedes-Benz S580 with executive rear seating and MBUX high-end entertainment.'
        },
        {
            model_id: models.find(m => m.name === 'G-Wagon G63')?.id,
            year: 2023,
            price: 210000,
            mileage: 1200,
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            color: 'Arabian Grey',
            status: 'available',
            description: 'The legend continues. Powerful G63 AMG in stunning Arabian Grey. Fully loaded with night package and forged wheels.'
        },
        {
            model_id: models.find(m => m.name === '911 Turbo S')?.id,
            year: 2024,
            price: 245000,
            mileage: 50,
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            color: 'Guards Red',
            status: 'reserved',
            description: 'The ultimate daily supercar. 2024 Porsche 911 Turbo S. 0-60 in 2.6 seconds. Finished in classic Guards Red.'
        },
        {
            model_id: models.find(m => m.name === 'Model S Plaid')?.id,
            year: 2023,
            price: 89000,
            mileage: 5000,
            fuel_type: 'Electric',
            transmission: 'Automatic',
            color: 'Ultra Red',
            status: 'available',
            description: 'The fastest accelerating car in production today. Model S Plaid with yoke steering and carbon ceramic brakes.'
        },
        {
            model_id: models.find(m => m.name === 'Range Rover Autobiography')?.id,
            year: 2024,
            price: 185000,
            mileage: 0,
            fuel_type: 'Diesel',
            transmission: 'Automatic',
            color: 'Santorini Black',
            status: 'available',
            description: 'New Range Rover Autobiography. Exceptional refinement and capability. Sustainable luxury at its best.'
        },
        {
            model_id: models.find(m => m.name === 'SF90 Stradale')?.id,
            year: 2023,
            price: 625000,
            mileage: 150,
            fuel_type: 'Hybrid',
            transmission: 'Automatic',
            color: 'Rosso Corsa',
            status: 'available',
            description: 'Ferrari SF90 Stradale. 1000CV hybrid power. The most advanced Ferrari ever made. Finished in historic Rosso Corsa.'
        },
        {
            model_id: models.find(m => m.name === 'Phantom VIII')?.id,
            year: 2024,
            price: 550000,
            mileage: 10,
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            color: 'Starlight Blue',
            status: 'available',
            description: 'Rolls-Royce Phantom. The quietest motor car in the world. Features the iconic Starlight Headliner and bespoke gallery.'
        },
        {
            model_id: models.find(m => m.name === 'Urus Performante')?.id,
            year: 2023,
            price: 315000,
            mileage: 800,
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            color: 'Giallo Auge',
            status: 'available',
            description: 'Lamborghini Urus Performante. Raising the bar on SUV performance. Lightweight carbon fiber components throughout.'
        }
    ].filter(c => c.model_id)

    const { data: cars } = await supabase.from('cars').upsert(carsToInsert, { onConflict: 'description' }).select()

    if (!cars) return { error: 'Failed to seed cars' }

    // 4. Car Images (Mock URLs)
    const imagesToInsert = cars.map((car, index) => ({
        car_id: car.id,
        image_url: `https://images.unsplash.com/photo-${[
            '1583121274602-3e2820c69888',
            '1520031441872-265e4ff70366',
            '1503376780353-7e6692767b70',
            '1617788138017-80ad40651399',
            '1626241315629-bc1df7185202',
            '1592198084033-aade902d1aae',
            '1631214524020-7e18db9a8f92',
            '1621135802920-133df287f89c'
        ][index % 8]}?auto=format&fit=crop&q=80&w=1200`,
        is_cover: true
    }))

    await supabase.from('car_images').upsert(imagesToInsert, { onConflict: 'image_url' })

    return { success: true }
}
