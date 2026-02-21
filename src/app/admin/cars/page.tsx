import { getCars } from '@/actions/cars'
import AdminCarsClient from './AdminCarsClient'

export default async function AdminCarsPage() {
    const cars = await getCars()

    return <AdminCarsClient cars={cars} />
}
