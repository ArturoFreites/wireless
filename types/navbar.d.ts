export type NavLink = {
    id: number; // antes era string
    name: string;
    subcategories: {
        id: number;
        name: string;
    }[];
};
