'use client'

import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useTransition } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

export default function SearchInput({ defaultValue = '' }: { defaultValue?: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [value, setValue] = useState(defaultValue)
    const debouncedValue = useDebounce(value, 300)

    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString())
        const currentQuery = currentParams.get('q') || ''

        if (debouncedValue === currentQuery) return

        const params = new URLSearchParams(searchParams.toString())
        if (debouncedValue) {
            params.set('q', debouncedValue)
        } else {
            params.delete('q')
        }

        startTransition(() => {
            router.push(`/cars?${params.toString()}`, { scroll: false })
        })
    }, [debouncedValue, router, searchParams])

    return (
        <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search by make, model or year..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-12 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            {value && (
                <button
                    onClick={() => setValue('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={18} />
                </button>
            )}
            {isPending && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    )
}
