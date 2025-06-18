/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useImageUploader.ts
import { useState } from 'react';

export function useImageUploader() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadImage = async (file: File): Promise<string | null> => {
        const cloudName = 'diodsiaxm';
        const uploadPreset = 'unsigned_preset';

        const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            setUploading(true);
            setError(null);

            const res = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error?.message || 'Upload failed');

            return data.secure_url;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading, error };
}
