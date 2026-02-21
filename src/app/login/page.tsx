'use client'

import { login } from '@/actions/auth'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { CarFront, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useFormState } from 'react-dom'

export default function LoginPage() {
    const [state, formAction] = useFormState(login, null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-amber-600">
                        <CarFront size={40} />
                        <span>AutoElite</span>
                    </Link>
                    <p className="text-slate-500 mt-2">Sign in to access the management portal</p>
                </div>

                <Card className="shadow-xl border-none">
                    <CardHeader className="space-y-1 pt-8">
                        <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                        <form action={formAction} className="space-y-6">
                            {state?.error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <AlertCircle size={18} className="shrink-0" />
                                    <p className="text-sm font-medium">{state.error}</p>
                                </div>
                            )}
                            <Input
                                id="email"
                                name="email"
                                label="Email Address"
                                placeholder="admin@autoelite.com"
                                type="email"
                                required
                            />
                            <Input
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                            <Button type="submit" className="w-full h-12 text-lg">
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
