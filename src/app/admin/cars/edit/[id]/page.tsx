import { getCarById } from '@/actions/cars'
import { getAllModels, getCompanies } from '@/actions/companies'
import CarForm from '@/components/CarForm'
import { notFound } from 'next/navigation'

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const [car, models, companies] = await Promise.all([
        getCarById(Number(id)),
        getAllModels(),
        getCompanies()
    ])

    if (!car) {
        notFound()
    }

    return <CarForm car={car} models={models} companies={companies} />
}
