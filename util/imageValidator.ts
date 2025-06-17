// utils/imageValidator.ts
import { useFeedbackStore } from '@/store/feedback';

export async function validateImageDimensions(
	file: File,
	expectedWidth: number,
	expectedHeight: number
): Promise<boolean> {
	return new Promise((resolve) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);

		img.onload = () => {
			const isValid = img.width === expectedWidth && img.height === expectedHeight;
			if (!isValid) {
				const setFeedback = useFeedbackStore.getState().setFeedback;
				setFeedback(
					`La imagen debe tener exactamente ${expectedWidth}x${expectedHeight} píxeles. Imagen: ${file.name}`,
					'error'
				);
			}
			URL.revokeObjectURL(objectUrl);
			resolve(isValid);
		};

		img.onerror = () => {
			const setFeedback = useFeedbackStore.getState().setFeedback;
			setFeedback(`No se pudo cargar la imagen ${file.name}`, 'error');
			URL.revokeObjectURL(objectUrl);
			resolve(false);
		};

		img.src = objectUrl;
	});
}
