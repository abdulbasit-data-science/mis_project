import Sidebar from '@/components/Sidebar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

const getProfile = cache(async (userId: string) => {
    const supabase = await createClient()
    return await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()
})

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Cached server-side check for role
    const { data: profile } = await getProfile(user.id)

    if (!profile || (profile.role !== 'admin' && profile.role !== 'staff')) {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {children}
            </main>
        </div>
    )
}
