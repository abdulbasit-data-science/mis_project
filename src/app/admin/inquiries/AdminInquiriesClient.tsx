'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { MessageSquare, User, Calendar, Tag, CheckCircle2, Clock, Trash2, Search } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Inquiry } from '@/types'
import Link from 'next/link'
import { updateInquiryStatus, deleteInquiry } from '@/actions/inquiries'

export default function AdminInquiriesClient({ inquiries }: { inquiries: Inquiry[] }) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [updatingId, setUpdatingId] = useState<number | null>(null)

    const [searchTerm, setSearchTerm] = useState('')

    const filteredInquiries = inquiries?.filter(inquiry => {
        const searchStr = `${inquiry.customer?.name} ${inquiry.car?.year} ${inquiry.car?.model?.company?.name} ${inquiry.car?.model?.name}`.toLowerCase()
        return searchStr.includes(searchTerm.toLowerCase())
    })

    const handleMarkContacted = async (id: number) => {
        setUpdatingId(id)
        startTransition(async () => {
            await updateInquiryStatus(id, 'contacted')
            // router.refresh() // handled in action
            setUpdatingId(null)
        })
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return
        setUpdatingId(id)
        startTransition(async () => {
            const result = await deleteInquiry(id)
            if (result.error) {
                alert(result.error)
            }
            setUpdatingId(null)
        })
    }

    const statusIcons = {
        new: <Clock className="text-blue-500" size={16} />,
        contacted: <MessageSquare className="text-amber-500" size={16} />,
        closed: <CheckCircle2 className="text-green-500" size={16} />,
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Inquiries</h1>
                    <p className="text-slate-500">Manage customer inquiries and interests</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search inquiries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            <div className="grid gap-6">
                {filteredInquiries?.map((inquiry) => (
                    <Card key={inquiry.id} className="overflow-hidden border-l-4 border-l-amber-500">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${inquiry.status === 'new' ? 'bg-blue-50 text-blue-700' :
                                                inquiry.status === 'contacted' ? 'bg-amber-50 text-amber-700' :
                                                    'bg-green-50 text-green-700'
                                                }`}>
                                                {statusIcons[inquiry.status as keyof typeof statusIcons]}
                                                {inquiry.status}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-sm text-slate-500">
                                                <Calendar size={16} />
                                                {formatDate(inquiry.created_at)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(inquiry.id)}
                                            disabled={updatingId === inquiry.id}
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                            title="Delete Inquiry"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                            <User size={20} className="text-slate-400" />
                                            {inquiry.customer?.name}
                                        </h3>
                                        <div className="flex gap-4 mt-1 text-sm text-slate-600">
                                            <span>{inquiry.customer?.email}</span>
                                            <span>{inquiry.customer?.phone}</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-slate-700 italic">"{inquiry.message}"</p>
                                    </div>
                                </div>

                                <div className="lg:w-80 space-y-4">
                                    <div className="p-4 rounded-xl border border-slate-100 bg-white">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Vehicle of Interest</p>
                                        <div className="flex items-start gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                                                <Tag size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 truncate">
                                                    {inquiry.car?.year} {inquiry.car?.model?.name}
                                                </p>
                                                <p className="text-xs text-slate-500">{inquiry.car?.model?.company?.name}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1 shadow-sm"
                                            onClick={() => handleMarkContacted(inquiry.id)}
                                            disabled={updatingId === inquiry.id || inquiry.status === 'contacted'}
                                        >
                                            {updatingId === inquiry.id ? 'Updating...' : inquiry.status === 'contacted' ? 'Contacted' : 'Mark Contacted'}
                                        </Button>
                                        <Link href={`/admin/sales/new?car_id=${inquiry.car_id}&customer_id=${inquiry.customer_id}`} className="flex-1">
                                            <Button className="w-full shadow-md shadow-amber-500/20">Convert to Sale</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
