/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState, useEffect } from 'react'
import { uploadCarrouselImage } from '@/hooks/uploadCarrouselImage'
import { supabaseBrowser } from '@/lib/superbase'
import { Loader2, UploadCloud, EyeOff } from 'lucide-react'
import { useFeedbackStore } from '@/store/feedback'

export default function CarrouselsPage() {
    const [type, setType] = useState<'mobile' | 'desktop'>('desktop')
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<any[]>([])
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const { setFeedback } = useFeedbackStore()

    const fetchImages = async () => {
        const { data, error } = await supabaseBrowser
            .from('carrusels')
            .select('*')
            .eq('type', type)
            .eq('status', 'active')
            .order('created_at', { ascending: false })

        if (!error && data) setImages(data)
    }

    useEffect(() => {
        fetchImages()
    }, [type])

    const handleUpload = async () => {
        if (!file) return

        const img = new Image()
        img.src = URL.createObjectURL(file)
        await new Promise<void>((resolve, reject) => {
            img.onload = () => {
                if (type === 'desktop' && img.width < 768) {
                    reject(new Error('La imagen para desktop debe tener al menos 768px de ancho.'))
                } else if (type === 'mobile' && img.width >= 768) {
                    reject(new Error('La imagen para mobile debe tener menos de 768px de ancho.'))
                } else {
                    setPreviewUrl(img.src)
                    resolve()
                }
            }
            img.onerror = () => reject(new Error('No se pudo procesar la imagen.'))
        })

        setLoading(true)

        try {
            await uploadCarrouselImage(file, type)
            await fetchImages()
            setFeedback('Imagen subida correctamente', 'success')
        } catch (err: any) {
            setFeedback(err.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleDeactivate = async (id: string) => {
        const { error } = await supabaseBrowser
            .from('carrusels')
            .update({ status: 'inactive' })
            .eq('id', id)

        if (!error) setImages((prev) => prev.filter((img) => img.id !== id))
    }

    return (
        <section className="p-4 space-y-6">
            <h2 className="text-xl font-bold">Carrousel</h2>

            <div className="space-y-4">
                <div className='flex items-center gap-5'>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as any)}
                        className="border px-2 py-1 rounded"
                    >
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                    </select>

                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-secondary text-white px-4 py-2 rounded text-sm"
                    >
                        Seleccionar imagen
                    </label>
                    
                    {file && <span className="text-sm text-gray-700 bg-neutral-100 rounded-md px-3 py-1">{file.name}</span>}
                </div>

                <div className="flex items-center space-x-4">

                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFile(file);
                            setPreviewUrl(file ? URL.createObjectURL(file) : null);
                        }}
                        className="hidden"
                    />
                </div>


                {previewUrl && (
                    <div className='p-10 w-full bg-neutral-100 rounded-md'>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="border rounded max-w-full h-44  mt-2"
                        />
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded disabled:opacity-50 cursor-pointer"
                >
                    {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                    {loading ? 'Subiendo...' : 'Subir imagen'}
                </button>
            </div>

            <h3 className="text-lg font-semibold mt-6">Imágenes activas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {images.map((img) => (
                    <div key={img.id} className="relative px-4 py-4 rounded shadow-md">
                        <img src={img.img} alt={img.name} width={400} height={300} className="rounded object-cover" />
                        <button
                            onClick={() => handleDeactivate(img.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center font-semibold"
                        >
                            <EyeOff className="w-4 h-4 mr-1" /> Desactivar
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}
