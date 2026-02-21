import { getAllModels, getCompanies } from '@/actions/companies'
import CarForm from '@/components/CarForm'

export default async function NewCarPage() {
    const [models, companies] = await Promise.all([
        getAllModels(),
        getCompanies()
    ])

    return <CarForm models={models} companies={companies} />
}
