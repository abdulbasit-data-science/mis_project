'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency, formatDate } from '@/lib/utils'
import { User, Car, Calendar, Receipt, Search } from 'lucide-react'
import { Sale } from '@/types'

export default function AdminSalesClient({ sales }: { sales: Sale[] }) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredSales = sales?.filter(sale => {
        const searchStr = `${sale.id} ${sale.customer?.name} ${sale.car?.year} ${sale.car?.model?.company?.name} ${sale.car?.model?.name} ${sale.profile?.name}`.toLowerCase()
        return searchStr.includes(searchTerm.toLowerCase())
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Sales History</h1>
                    <p className="text-slate-500">Track and manage your showroom revenue</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search sales..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <Card>
                <CardContent className="p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Sale Details</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Customer</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Vehicle</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Handled By</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Amount</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredSales?.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">#{sale.id.toString().padStart(6, '0')}</span>
                                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                                    <Calendar size={12} />
                                                    {formatDate(sale.sale_date)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <User size={16} className="text-slate-400" />
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{sale.customer?.name}</p>
                                                    <p className="text-xs text-slate-500">{sale.customer?.city}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-700">
                                                <Car size={16} className="text-slate-400" />
                                                <span className="text-sm font-medium">{sale.car?.year} {sale.car?.model?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-600">{sale.profile?.name}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-lg font-bold text-slate-900">{formatCurrency(sale.sale_price)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-400 hover:text-amber-600 transition-colors">
                                                <Receipt size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredSales?.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                            No sales found matching your search.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
