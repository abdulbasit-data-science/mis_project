'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { createInquiry } from '@/actions/inquiries'
import { CheckCircle2 } from 'lucide-react'

export default function InquiryForm({ carId, carName }: { carId: number, carName: string }) {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        try {
            const result = await createInquiry(formData)
            if (result.error) {
                setError(result.error)
            } else {
                setIsSubmitted(true)
            }
        } catch (e) {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isSubmitted) {
        return (
            <Card className="border-green-100 bg-green-50 shadow-none">
                <CardContent className="p-8 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800">Inquiry Sent Successfully!</h3>
                    <p className="text-green-700">Thank you for your interest in the {carName}. Our sales team will contact you shortly.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                        Send Another Inquiry
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="shadow-2xl border-none">
            <CardHeader className="bg-slate-900 text-white pb-8 rounded-t-xl">
                <CardTitle className="text-2xl">Contact Dealer</CardTitle>
                <p className="text-slate-400 text-sm">Fill out the form below to inquire about this vehicle.</p>
            </CardHeader>
            <CardContent className="p-8">
                <form action={handleSubmit} className="space-y-6">
                    <input type="hidden" name="car_id" value={carId} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input name="name" label="Full Name" placeholder="John Doe" required />
                        <Input name="phone" label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" required />
                    </div>

                    <Input name="email" label="Email Address" placeholder="john@example.com" type="email" required />
                    <Input name="city" label="City" placeholder="Riyadh" required />

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Your Message</label>
                        <textarea
                            name="message"
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 min-h-[120px]"
                            placeholder="I'm interested in this car. Can you please provide more information?"
                            required
                        ></textarea>
                    </div>

                    {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                    <Button type="submit" className="w-full h-12 text-lg" isLoading={isLoading}>
                        Send Inquiry
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
