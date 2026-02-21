'use client'

import Link from 'next/link'
import { CarFront, LayoutDashboard, Car, MessageSquare, BadgeDollarSign, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'


const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Inventory', href: '/admin/cars', icon: Car },
    { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { name: 'Sales', href: '/admin/sales', icon: BadgeDollarSign },
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="p-6">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-xl font-bold text-amber-500">
                        <CarFront size={32} />
                        <span>AutoElite</span>
                    </Link>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors group"
                        >
                            <item.icon className="text-slate-400 group-hover:text-amber-500" size={20} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 space-y-2">
                    <form action="/auth/signout" method="post">
                        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-900/20 text-red-400 transition-colors">
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
