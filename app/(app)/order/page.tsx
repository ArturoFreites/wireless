/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/superbase'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useFeedbackStore } from '@/store/feedback'

function SortableItem({
    id,
    name,
    position,
}: {
    id: string
    name: string
    position: number
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="p-4 bg-white rounded shadow-xl mb-2 cursor-move flex items-center"
        >
            <span className="w-1/6 text-sm text-gray-500 font-mono">#{position + 1}</span>
            <span className="w-5/6 ml-2 font-semibold">{name}</span>
        </div>
    )
}

export default function OrderSubcategoriesPage() {
    const [items, setItems] = useState<{ id: string; name: string }[]>([])
    const [loading, setLoading] = useState(false)
    const setFeedback = useFeedbackStore((state) => state.setFeedback)

    useEffect(() => {
        const fetchSubcategories = async () => {
            const { data, error } = await supabaseBrowser
                .from('featured_subcategories_with_name') // vista
                .select('id, subcategory_name, position')
                .order('position')

            if (!error && data) {
                setItems(
                    data.map((d) => ({
                        id: d.id,
                        name: d.subcategory_name ?? 'Subcategoría eliminada',
                    }))
                )
            }
        }

        fetchSubcategories()
    }, [])

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (active.id !== over.id) {
            setItems((prev) => {
                const oldIndex = prev.findIndex((i) => i.id === active.id)
                const newIndex = prev.findIndex((i) => i.id === over.id)
                return arrayMove(prev, oldIndex, newIndex)
            })
        }
    }

    const handleSave = async () => {
        setLoading(true)
        for (let i = 0; i < items.length; i++) {
            await supabaseBrowser
                .from('featured_subcategories')
                .update({ position: i })
                .eq('id', items[i].id)
        }
        setLoading(false)
        setFeedback('Orden actualizado correctamente', 'success')
    }

    return (
        <main className="max-w-xl mx-auto py-10 px-4">
            <h1 className="text-xl font-bold mb-6">Ordenar Subcategorías Destacadas</h1>

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={items.map((i) => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((item, index) => (
                        <SortableItem key={item.id} id={item.id} name={item.name} position={index} />
                    ))}
                </SortableContext>
            </DndContext>

            <button
                onClick={handleSave}
                className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                disabled={loading}
            >
                {loading ? 'Guardando…' : 'Guardar orden'}
            </button>
        </main>
    )
}
