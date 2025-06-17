export type ProductWithRelations = {
    id: string;
    created_at: string;
    updated_at: string | null;
    subcategory_id: string | null;
    model: string | null;
    storage: string | null;
    color: string | null;
    battery_percentage: number | null;
    price: number | null;
    description: string | null;
    is_offer: boolean | null;
    is_used: boolean | null;
    main_image_url: string | null;
    image_urls: string[] | null;
    status: string | null;
    deleted_at: string | null;

    // relaciones
    subcategory_name: string | null;
    category_id: string | null;
    category_name: string | null;
};
