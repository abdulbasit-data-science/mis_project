import { createClient } from '@supabase/supabase-js'

// Load environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing required environment variables:')
    console.error('   - NEXT_PUBLIC_SUPABASE_URL')
    console.error('   - SUPABASE_SERVICE_ROLE_KEY')
    console.error('\nPlease check your .env.local file.')
    process.exit(1)
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function seedDatabase() {
    console.log('🌱 Starting database seed...\n')

    try {
        // 1. Insert Companies
        console.log('📦 Seeding companies...')
        const { data: companies, error: companiesError } = await supabase
            .from('companies')
            .upsert([
                { name: 'Mercedes-Benz' },
                { name: 'BMW' },
                { name: 'Audi' },
                { name: 'Tesla' },
                { name: 'Porsche' },
                { name: 'Land Rover' },
                { name: 'Ferrari' },
                { name: 'Lamborghini' },
                { name: 'Rolls-Royce' },
            ], { onConflict: 'name' })
            .select()

        if (companiesError) {
            console.error('❌ Failed to seed companies:', companiesError)
            return
        }
        console.log(`✅ Seeded ${companies.length} companies\n`)

        // 2. Insert Models
        console.log('🚗 Seeding models...')
        const modelsToInsert = [
            { name: 'S-Class S580', company_id: companies.find((c: any) => c.name === 'Mercedes-Benz')?.id },
            { name: 'G-Wagon G63', company_id: companies.find((c: any) => c.name === 'Mercedes-Benz')?.id },
            { name: 'M5 Competition', company_id: companies.find((c: any) => c.name === 'BMW')?.id },
            { name: 'i7 xDrive60', company_id: companies.find((c: any) => c.name === 'BMW')?.id },
            { name: 'RS6 Avant', company_id: companies.find((c: any) => c.name === 'Audi')?.id },
            { name: 'Model S Plaid', company_id: companies.find((c: any) => c.name === 'Tesla')?.id },
            { name: '911 Turbo S', company_id: companies.find((c: any) => c.name === 'Porsche')?.id },
            { name: 'Range Rover Autobiography', company_id: companies.find((c: any) => c.name === 'Land Rover')?.id },
            { name: 'SF90 Stradale', company_id: companies.find((c: any) => c.name === 'Ferrari')?.id },
            { name: 'Urus Performante', company_id: companies.find((c: any) => c.name === 'Lamborghini')?.id },
            { name: 'Phantom VIII', company_id: companies.find((c: any) => c.name === 'Rolls-Royce')?.id },
        ].filter(m => m.company_id)

        const { data: models, error: modelsError } = await supabase
            .from('models')
            .insert(modelsToInsert)
            .select()

        if (modelsError) {
            console.error('❌ Failed to seed models:', modelsError)
            return
        }
        console.log(`✅ Seeded ${models.length} models\n`)

        // 3. Insert Cars
        console.log('🏎️  Seeding cars...')
        const carsToInsert = [
            {
                model_id: models.find((m: any) => m.name === 'S-Class S580')?.id,
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
                model_id: models.find((m: any) => m.name === 'G-Wagon G63')?.id,
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
                model_id: models.find((m: any) => m.name === '911 Turbo S')?.id,
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
                model_id: models.find((m: any) => m.name === 'Model S Plaid')?.id,
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
                model_id: models.find((m: any) => m.name === 'Range Rover Autobiography')?.id,
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
                model_id: models.find((m: any) => m.name === 'SF90 Stradale')?.id,
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
                model_id: models.find((m: any) => m.name === 'Phantom VIII')?.id,
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
                model_id: models.find((m: any) => m.name === 'Urus Performante')?.id,
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

        const { data: cars, error: carsError } = await supabase
            .from('cars')
            .insert(carsToInsert)
            .select()

        if (carsError) {
            console.error('❌ Failed to seed cars:', carsError)
            return
        }
        console.log(`✅ Seeded ${cars.length} cars\n`)

        // 4. Insert Car Images
        console.log('🖼️  Seeding car images...')
        const imageUrls = [
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1626241315629-bc1df7185202?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&q=80&w=1200',
            'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200'
        ]

        const imagesToInsert = cars.map((car: any, index: number) => ({
            car_id: car.id,
            image_url: imageUrls[index % imageUrls.length],
            is_cover: true
        }))

        const { data: images, error: imagesError } = await supabase
            .from('car_images')
            .insert(imagesToInsert)
            .select()

        if (imagesError) {
            console.error('❌ Failed to seed images:', imagesError)
            return
        }
        console.log(`✅ Seeded ${images?.length || imagesToInsert.length} car images\n`)

        console.log('🎉 Database seeded successfully!\n')
        console.log('📊 Summary:')
        console.log(`   - ${companies.length} companies`)
        console.log(`   - ${models.length} models`)
        console.log(`   - ${cars.length} cars`)
        console.log(`   - ${images?.length || imagesToInsert.length} images`)

    } catch (error) {
        console.error('❌ Unexpected error during seeding:', error)
        process.exit(1)
    }
}

// Run the seed function
seedDatabase()
