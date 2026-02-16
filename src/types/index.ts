export type UserRole = 'admin' | 'staff'

export interface Profile {
    id: string
    name: string
    role: UserRole
    created_at: string
}

export interface Company {
    id: number
    name: string
    created_at: string
}

export interface Model {
    id: number
    company_id: number
    name: string
    created_at: string
    company?: Company
}

export interface Car {
    id: number
    model_id: number
    year: number
    price: number
    mileage: number
    fuel_type: string
    transmission: string
    color: string
    status: 'available' | 'reserved' | 'sold'
    description?: string
    created_at: string
    model?: Model
    images?: CarImage[]
}

export interface CarImage {
    id: number
    car_id: number
    image_url: string
    is_cover: boolean
    created_at: string
}

export interface Customer {
    id: number
    name: string
    phone?: string
    email?: string
    city?: string
    created_at: string
}

export interface Inquiry {
    id: number
    car_id?: number
    customer_id: number
    message?: string
    status: 'new' | 'contacted' | 'closed'
    created_at: string
    car?: Car
    customer?: Customer
}

export interface Sale {
    id: number
    car_id?: number
    customer_id?: number
    sale_price: number
    sale_date: string
    payment_method?: string
    handled_by?: string
    created_at: string
    car?: Car
    customer?: Customer
    profile?: Profile
}
