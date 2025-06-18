// ✅ COMPONENTE 2: hooks/uploadCarrouselImage.ts
// Sube imagen a Cloudinary y guarda la URL en Supabase

import { supabaseBrowser } from '@/lib/superbase'

export async function uploadCarrouselImage(file: File, type: 'mobile' | 'desktop') {
    const cloudName = 'diodsiaxm'
    const uploadPreset = 'unsigned_preset'

    const url = URL.createObjectURL(file)
    const img = new Image()
    img.src = url

    await new Promise<void>((resolve, reject) => {
        img.onload = () => {
            if (type === 'desktop' && img.width < 768) {
                reject(new Error('La imagen para desktop debe tener al menos 768px de ancho.'))
            } else resolve()
        }
        img.onerror = () => reject(new Error('No se pudo procesar la imagen.'))
    })

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
    })

    const cloudinaryData = await cloudinaryRes.json()
    if (!cloudinaryRes.ok || !cloudinaryData.secure_url) {
        throw new Error(cloudinaryData.error?.message || 'Error al subir a Cloudinary')
    }

    const { error: insertError } = await supabaseBrowser.from('carrusels').insert({
        img: cloudinaryData.secure_url,
        type,
        status: 'active',
        name: file.name,
    })

    if (insertError) throw insertError
}