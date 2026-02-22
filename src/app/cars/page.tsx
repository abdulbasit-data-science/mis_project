import { getCars } from '@/actions/cars'
import CarCard from '@/components/CarCard'
import SearchInput from '@/components/SearchInput'
import { Filter, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import MockAd from '@/components/MockAd'

export default async function InventoryPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const search = typeof params.q === 'string' ? params.q : undefined
    const cars = await getCars({ search })

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors font-bold">
                        <ArrowLeft size={20} />
                        <span>Home</span>
                    </Link>
                    <h1 className="text-xl font-black text-slate-900 uppercase tracking-widest">Our Inventory</h1>
                    <div className="w-10"></div> {/* Spacer */}
                </div>
            </nav>

            {/* Filter Bar */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <SearchInput defaultValue={search} />
                        <div className="flex gap-4 w-full md:w-auto">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-bold transition-all text-slate-700">
                                <Filter size={18} />
                                Filters
                            </button>
                            <select className="flex-1 md:flex-none px-6 py-3 border border-slate-200 rounded-xl bg-white font-bold text-slate-700 outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer">
                                <option>Sort by: Newest</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Mileage: Low to High</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Listings */}
            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
                <div className="mb-12">
                    <MockAd variant="banner" />
                </div>

                <div className="flex items-center justify-between mb-8">
                    <p className="text-slate-500 font-medium">Showing <span className="text-slate-900 font-bold">{cars.length}</span> luxury vehicles</p>
                </div>

                {cars.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cars.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching vehicles found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any cars matching your current filters. Try adjusting your search criteria.</p>
                        <Link
                            href="/cars"
                            className="mt-8 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all inline-block"
                        >
                            Clear all filters
                        </Link>
                    </div>
                )}
            </main>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <div className="bg-amber-500 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-amber-500/20">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">Can't find what you're looking for?</h2>
                        <p className="text-slate-800 text-xl mb-10 max-w-2xl mx-auto font-medium">Our expert team can help you source the perfect luxury vehicle through our worldwide network.</p>
                        <button className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Contact Sourcing Expert
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
