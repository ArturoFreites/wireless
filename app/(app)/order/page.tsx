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

type Item = {
	id: string
	subcategory_id: string
	name: string
	active: boolean
}

function SortableItem({
	id,
	name,
	position,
	active,
	onToggleActive,
}: {
	id: string
	name: string
	position: number
	active: boolean
	onToggleActive: (id: string, current: boolean) => void
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
			className="p-4 bg-white rounded shadow-xl mb-2 flex items-center justify-between"
		>
			{/* Área draggable */}
			<div
				className="flex items-center gap-2 cursor-move"
				{...attributes}
				{...listeners}
			>
				<span className="text-sm text-gray-500 font-mono">#{position + 1}</span>
				<span className="font-semibold">{name}</span>
			</div>

			{/* Botones fuera del área draggable */}
			<div className="flex gap-2">
				<button
					onClick={(e) => {
						e.stopPropagation()
						onToggleActive(id, active)
					}}
					className={`text-xs px-2 py-1 rounded ${
						active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
					}`}
				>
					{active ? 'Visible' : 'Oculto'}
				</button>

				<button
					onClick={(e) => {
						e.stopPropagation()
						onToggleActive(id, active)
					}}
					className="text-xs px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
				>
					Alternar visibilidad
				</button>
			</div>
		</div>
	)
}

export default function OrderSubcategoriesPage() {
	const [items, setItems] = useState<Item[]>([])
	const setFeedback = useFeedbackStore((state) => state.setFeedback)

	useEffect(() => {
		const fetchSubcategories = async () => {
			const { data, error } = await supabaseBrowser
				.from('featured_subcategories_with_name')
				.select('id, subcategory_id, subcategory_name, position, active')
				.order('position')

			if (!error && data) {
				setItems(
					data.map((d) => ({
						id: d.id,
						subcategory_id: d.subcategory_id,
						name: d.subcategory_name ?? 'Subcategoría eliminada',
						active: d.active,
					}))
				)
			} else {
				setFeedback('Error al cargar subcategorías', 'error')
			}
		}

		fetchSubcategories()
	}, [setFeedback])

	const updatePositionsInDB = async (updatedItems: Item[]) => {
		for (let i = 0; i < updatedItems.length; i++) {
			await supabaseBrowser
				.from('featured_subcategories')
				.update({ position: i })
				.eq('id', updatedItems[i].id)
		}
		setFeedback('Orden actualizado correctamente', 'success')
	}

	const handleDragEnd = async (event: any) => {
		const { active, over } = event
		if (active.id !== over.id) {
			setItems((prev) => {
				const oldIndex = prev.findIndex((i) => i.id === active.id)
				const newIndex = prev.findIndex((i) => i.id === over.id)
				const newItems = arrayMove(prev, oldIndex, newIndex)
				updatePositionsInDB(newItems)
				return newItems
			})
		}
	}

	const handleToggleActive = async (id: string, current: boolean) => {
		const { error } = await supabaseBrowser
			.from('featured_subcategories')
			.update({ active: !current })
			.eq('id', id)

		if (!error) {
			setItems((prev) =>
				prev.map((item) =>
					item.id === id ? { ...item, active: !current } : item
				)
			)
			setFeedback('Visibilidad actualizada', 'success')
		} else {
			setFeedback('Error al actualizar visibilidad', 'error')
		}
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
						<SortableItem
							key={item.id}
							id={item.id}
							name={item.name}
							position={index}
							active={item.active}
							onToggleActive={handleToggleActive}
						/>
					))}
				</SortableContext>
			</DndContext>
		</main>
	)
}
