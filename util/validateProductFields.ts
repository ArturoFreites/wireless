import { useFeedbackStore } from '@/store/feedback';

interface ProductFields {
    categoryId: string;
    subcategoryId: string;
    model: string;
    mainImageUrl: string | null;
    price: string;
    description: string;
}

export function validateProductFields(fields: ProductFields): boolean {
    const setFeedback = useFeedbackStore.getState().setFeedback;

    if (!fields.categoryId) {
        setFeedback('Seleccione una categoría.', 'warning');
        return false;
    }

    if (!fields.subcategoryId) {
        setFeedback('Seleccione una subcategoría.', 'warning');
        return false;
    }

    if (!fields.model.trim()) {
        setFeedback('Ingrese un nombre para el producto.', 'warning');
        return false;
    }

    if (!fields.mainImageUrl) {
        setFeedback('Seleccione una imagen principal (1000x1000).', 'warning');
        return false;
    }

    if (!fields.price || isNaN(Number(fields.price)) || Number(fields.price) <= 0) {
        setFeedback('Ingrese un precio válido.', 'warning');
        return false;
    }

    if (!fields.description.trim()) {
        setFeedback('Ingrese una descripción para el producto.', 'warning');
        return false;
    }

    return true;
}
