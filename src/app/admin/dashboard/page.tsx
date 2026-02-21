import { getDashboardStats, getMonthlyRevenue } from '@/actions/dashboard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Car, MessageSquare, TrendingUp, BadgeDollarSign } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import DashboardChart from '@/components/DashboardChart'

export default async function DashboardPage() {
    const stats = await getDashboardStats()
    const chartData = await getMonthlyRevenue()

    const statCards = [
        { title: 'Total Cars', value: stats.totalCars, icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Sold Cars', value: stats.soldCars, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { title: 'Total Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
        { title: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: BadgeDollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Overview of your showroom's performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon size={24} className={stat.color} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DashboardChart data={chartData} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {/* This would ideally fetch actual recent events */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                        <MessageSquare size={18} className="text-slate-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">New inquiry received</p>
                                        <p className="text-xs text-slate-500">2 minutes ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
