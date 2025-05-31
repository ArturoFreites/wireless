
export type NavLink = {
    id: number
    name: string,
    description:string,
    subcategory: SubCategory[];
}

export type SubCategory = {
    id: number
    name: string
}