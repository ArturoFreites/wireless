export type CategoryWithSub = {
	id: number;
	name: string;
	subcategories: {
		id: number;
		name: string;
	}[];
};
