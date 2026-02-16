import Sidebar from '@/components/Sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {children}
            </main>
        </div>
    )
}
