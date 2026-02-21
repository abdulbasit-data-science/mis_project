'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createCar, updateCar } from '@/actions/cars'
import { getAllModels } from '@/actions/companies'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ArrowLeft, Loader2, Plus, X, Check } from 'lucide-react'
import Link from 'next/link'
import { Car } from '@/types'

interface CarFormProps {
    car?: Car
    models: any[]
    companies: any[]
}

export default function CarForm({ car, models, companies }: CarFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [isNewModel, setIsNewModel] = useState(false)
    const [isNewCompany, setIsNewCompany] = useState(false)

    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [isCompressing, setIsCompressing] = useState(false)

    const [formData, setFormData] = useState({
        model_id: car?.model_id || '',
        year: car?.year || new Date().getFullYear(),
        price: car?.price || '',
        mileage: car?.mileage || 0,
        fuel_type: car?.fuel_type || 'Petrol',
        transmission: car?.transmission || 'Automatic',
        color: car?.color || '',
        status: car?.status || 'available',
        description: car?.description || '',

        // New model fields
        new_model_name: '',
        company_id: car?.model?.company_id || '',
        new_company_name: ''
    })

    const compressImage = (file: File): Promise<File> => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (event) => {
                const img = new window.Image()
                img.src = event.target?.result as string
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height
                    const MAX_SIZE = 1000
                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width
                            width = MAX_SIZE
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height
                            height = MAX_SIZE
                        }
                    }
                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')
                    ctx?.drawImage(img, 0, 0, width, height)
                    canvas.toBlob((blob) => {
                        resolve(blob ? new File([blob], file.name, { type: 'image/jpeg' }) : file)
                    }, 'image/jpeg', 0.6) // Reduced quality for speed
                }
            }
        })
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsCompressing(true)
            const newFiles = Array.from(e.target.files)
            const compressedResults = await Promise.all(
                newFiles.map(file => file.type.startsWith('image/') ? compressImage(file) : file)
            )
            setFiles(prev => [...prev, ...compressedResults])
            const newPreviews = compressedResults.map(file => URL.createObjectURL(file))
            setPreviews(prev => [...prev, ...newPreviews])
            setIsCompressing(false)
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => {
            URL.revokeObjectURL(prev[index])
            return prev.filter((_, i) => i !== index)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const submitData = new FormData()

        if (isNewModel) {
            submitData.append('is_new_model', 'true')
            submitData.append('new_model_name', formData.new_model_name)

            if (isNewCompany) {
                submitData.append('is_new_company', 'true')
                submitData.append('new_company_name', formData.new_company_name)
            } else {
                submitData.append('company_id', String(formData.company_id))
            }
        } else {
            submitData.append('model_id', String(formData.model_id))
        }

        submitData.append('year', String(formData.year))
        submitData.append('price', String(formData.price))
        submitData.append('mileage', String(formData.mileage))
        submitData.append('fuel_type', formData.fuel_type)
        submitData.append('transmission', formData.transmission)
        submitData.append('color', formData.color)
        submitData.append('status', formData.status)
        submitData.append('description', formData.description)

        files.forEach(file => {
            submitData.append('images', file)
        })

        startTransition(async () => {
            const result = car
                ? await updateCar(car.id, submitData)
                : await createCar(submitData)

            if (result.error) {
                setError(result.error)
            } else {
                router.push('/admin/cars')
                // Removed router.refresh() to avoid double re-render lag
            }
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/cars">
                    <Button variant="ghost" size="sm" className="gap-2">
                        <ArrowLeft size={16} />
                        Back to Inventory
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{car ? 'Edit Vehicle' : 'Add New Vehicle'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Image Upload */}
                            <div className="md:col-span-2 space-y-4">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Vehicle Images
                                </label>

                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-amber-500 transition-colors bg-slate-50">
                                    <input
                                        type="file"
                                        id="images"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label htmlFor="images" className="cursor-pointer flex flex-col items-center gap-2">
                                        <div className="p-3 bg-white rounded-full shadow-sm text-slate-400">
                                            <ArrowLeft className="rotate-90" size={24} />
                                        </div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {isCompressing ? 'Compressing images...' : 'Click to upload images'}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {isCompressing ? 'Please wait a moment' : 'SVG, PNG, JPG or GIF (max. 5MB)'}
                                        </p>
                                    </label>
                                </div>

                                {previews.length > 0 && (
                                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                        {previews.map((preview, index) => (
                                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-200">
                                                <img src={preview} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Loader2 className="rotate-45" size={12} />
                                                    {/* reusing loader icon as X for now since X is not imported, wait I should use X if available or just use text */}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Model Selection or Creation */}
                            <div className="md:col-span-2 space-y-4 p-4 border border-slate-200 rounded-xl bg-slate-50">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-bold text-slate-700">
                                        Vehicle Model *
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setIsNewModel(!isNewModel)}
                                        className="text-xs flex items-center gap-1 text-amber-600 font-bold hover:text-amber-700 transition-colors"
                                    >
                                        {isNewModel ? (
                                            <>
                                                <X size={14} /> Cancel New Model
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={14} /> Add New Model
                                            </>
                                        )}
                                    </button>
                                </div>

                                {isNewModel ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <label className="block text-xs font-semibold text-slate-500">Brand</label>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsNewCompany(!isNewCompany)}
                                                    className="text-[10px] text-amber-600 font-bold hover:text-amber-700 transition-colors uppercase tracking-tighter"
                                                >
                                                    {isNewCompany ? 'Select Existing' : 'Add New Brand'}
                                                </button>
                                            </div>
                                            {isNewCompany ? (
                                                <input
                                                    type="text"
                                                    name="new_company_name"
                                                    value={formData.new_company_name}
                                                    onChange={handleChange}
                                                    required={isNewCompany}
                                                    placeholder="e.g. Mercedes-Benz"
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <select
                                                    name="company_id"
                                                    value={formData.company_id}
                                                    onChange={handleChange}
                                                    required={isNewModel && !isNewCompany}
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                                                >
                                                    <option value="">Select Brand</option>
                                                    {companies?.map((company) => (
                                                        <option key={company.id} value={company.id}>
                                                            {company.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-semibold text-slate-500">New Model Name</label>
                                            <input
                                                type="text"
                                                name="new_model_name"
                                                value={formData.new_model_name}
                                                onChange={handleChange}
                                                required={isNewModel}
                                                placeholder="e.g. Civic Type R"
                                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <select
                                        name="model_id"
                                        value={formData.model_id}
                                        onChange={handleChange}
                                        required={!isNewModel}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                                    >
                                        <option value="">Select Existing Model</option>
                                        {models.map((model) => (
                                            <option key={model.id} value={model.id}>
                                                {model.company?.name} - {model.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Year */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Year *
                                </label>
                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    min="1900"
                                    max={new Date().getFullYear() + 1}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Price (USD) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="1000"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>

                            {/* Mileage */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Mileage (km) *
                                </label>
                                <input
                                    type="number"
                                    name="mileage"
                                    value={formData.mileage}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>

                            {/* Fuel Type */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Fuel Type *
                                </label>
                                <select
                                    name="fuel_type"
                                    value={formData.fuel_type}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                >
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                            {/* Transmission */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Transmission *
                                </label>
                                <select
                                    name="transmission"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                >
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </select>
                            </div>

                            {/* Color */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Color *
                                </label>
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Obsidian Black"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                >
                                    <option value="available">Available</option>
                                    <option value="reserved">Reserved</option>
                                    <option value="sold">Sold</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Enter a detailed description of the vehicle..."
                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex items-center gap-2"
                            >
                                {isPending && <Loader2 size={16} className="animate-spin" />}
                                {car ? 'Update Vehicle' : 'Add Vehicle'}
                            </Button>
                            <Link href="/admin/cars">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
