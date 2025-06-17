'use client';


import { useState } from 'react';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import { supabaseBrowser } from '@/lib/superbase';
import { useRouter } from 'next/navigation';
import CategoryDropdown from '@/components/CategoryDropdown';
import SubcategoryDropdown from '@/components/SubcategoryDropdown';
import { X } from 'lucide-react';

function CreatePage() {
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [battery, setBattery] = useState('');
    const [storage, setStorage] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [mainImageUrl, setMainImageUrl] = useState<string>('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [subcategoryId, setSubcategoryId] = useState<string>('');
    const [isOffer, setIsOffer] = useState(false);
    const [isUsed, setIsUsed] = useState(false);

    const router = useRouter();

    const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await uploadImage(file);
        setMainImageUrl(url);
    };

    const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const url = await uploadImage(files[i]);
            newUrls.push(url);
        }
        setImageUrls(prev => [...prev, ...newUrls]);
    };

    const handleRemoveImage = (index: number) => {
        setImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleCreate = async () => {
        const { error } = await supabaseBrowser.from('products').insert({
            model,
            price: parseFloat(price),
            battery_percentage: parseFloat(battery),
            storage,
            color,
            description,
            main_image_url: mainImageUrl,
            image_urls: imageUrls,
            category_id: categoryId,
            subcategory_id: subcategoryId,
            is_offer: isOffer,
            is_used: isUsed,
            status: 'active',
        });

        if (error) {
            alert('Error al crear: ' + error.message);
        } else {
            alert('Producto creado correctamente');
            router.push('/dashboard');
        }
    };

    return (
        <section className="flex w-full flex-col">
            <h1 className="mt-10 text-center font-bold text-xl mb-4">Cargar Producto</h1>
            <div className='md:flex md:flex-row' >
                <div className="w-full md:w-1/3  flex flex-col items-center justify-start p-4">
                    <p className="text-sm font-bold mb-2">Imagen principal</p>
                    {mainImageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={mainImageUrl} alt="Main" className="w-48 h-48 object-cover rounded mb-2" />
                    )}
                    <label className="bg-neutral-700 text-white text-xs px-4 py-2 rounded-md cursor-pointer mb-4">
                        Seleccionar imagen principal
                        <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
                    </label>

                    <hr className="my-6 w-full" />

                    <p className="text-sm font-bold mb-2">Imágenes adicionales</p>
                    <div className="flex flex-wrap gap-3 mb-2">
                        {imageUrls.map((url, index) => (
                            <div key={index} className="relative">
                                {
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={url} className="w-24 h-24 object-cover rounded" alt={url} />
                                }
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center cursor-pointer hover:bg-red-600 duration-100"
                                    title="Eliminar imagen"
                                >
                                    <X width={14} height={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <label className="bg-neutral-700 text-white text-xs px-4 py-2 rounded-md cursor-pointer">
                        Agregar imágenes
                        <input type="file" accept="image/*" multiple onChange={handleAddImages} className="hidden" />
                    </label>
                </div>

                <div className=" flex flex-col md:w-2/3 justify-center items-center p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-items-center">
                        <CategoryDropdown value={categoryId} onChange={setCategoryId} />
                        <SubcategoryDropdown categoryId={categoryId} value={subcategoryId} onChange={setSubcategoryId} />
                        <Input type="text" label="Nombre" value={model} onChange={e => setModel(e.target.value)} placeHolder="Ingrese nombre" />
                        <Input label="Precio" type="number" value={price} onChange={e => setPrice(e.target.value)} placeHolder="Ingrese precio" />
                        <Input label="Batería" type="number" value={battery} onChange={e => setBattery(e.target.value)} placeHolder="Estado de batería" />
                        <Input type="number" label="Capacidad GB" value={storage} onChange={e => setStorage(e.target.value)} placeHolder="Capacidad de almacenamiento" />
                        <Input type="text" label="Color" value={color} onChange={e => setColor(e.target.value)} placeHolder="Color del producto" />
                    </div>

                    <div className="flex items-center justify-center gap-4 my-4 w-full">
                        <label className="text-sm flex items-center gap-1">
                            <input type="checkbox" checked={isOffer} onChange={() => setIsOffer(!isOffer)} />
                            En oferta
                        </label>
                        <label className="text-sm flex items-center gap-1">
                            <input type="checkbox" checked={isUsed} onChange={() => setIsUsed(!isUsed)} />
                            Usado
                        </label>
                    </div>

                    <div className="w-full">
                        <TextArea
                            label="Descripción"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeHolder="Ingrese descripción del producto"
                        />
                    </div>

                    <button
                        onClick={handleCreate}
                        className="w-fit py-2 px-6 my-6 rounded-md text-xs font-semibold text-white bg-neutral-700"
                    >
                        Crear Producto
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CreatePage;

// Subida fake: reemplazar con lógica real
async function uploadImage(file: File): Promise<string> {
    return Promise.resolve(URL.createObjectURL(file));
}
