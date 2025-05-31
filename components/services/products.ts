export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "iPhone 16 Pro Max",
        description: "El iPhone en su máxima expresión.",
        type: "iphone",
        subcategory: "iPhone 16",
        amout: 1250,
        image: "https://www.wireless.ar/iphone_16promax_web.jpg",
        images: [
            { id: 1, name: "iPhone 16 Pro Max", src: "https://www.wireless.ar/iphone_16promax_web.jpg" },
            { id: 2, name: "iPhone 16 Pro Max", src: "https://www.wireless.ar/iphone_16promax_web.jpg" },
            { id: 3, name: "iPhone 16 Pro Max", src: "https://www.wireless.ar/iphone_16promax_web.jpg" },
            { id: 4, name: "iPhone 16 Pro Max", src: "https://www.wireless.ar/iphone_16promax_web.jpg" },
        ]
    },
    {
        id: 2,
        name: "iPhone 16 Pro",
        description: "El iPhone en su máxima expresión.",
        type: "iphone",
        subcategory: "iPhone 16",
        amout: 1190,
        image: "https://www.wireless.ar/iphone_16pro_web.jpg",
        images: [
            { id: 1, name: "iPhone 16 Pro", src: "https://www.wireless.ar/iphone_16pro_web.jpg" },
            { id: 2, name: "iPhone 16 Pro", src: "https://www.wireless.ar/iphone_16pro_web.jpg" },
            { id: 3, name: "iPhone 16 Pro", src: "https://www.wireless.ar/iphone_16pro_web.jpg" },
            { id: 4, name: "iPhone 16 Pro", src: "https://www.wireless.ar/iphone_16pro_web.jpg" },
        ]
    },
    {
        id: 3,
        name: "iPhone 15",
        description: "El iPhone en su máxima expresión.",
        type: "iphone",
        subcategory: "iPhone 15",
        amout: 1080,
        image: "https://www.wireless.ar/web_iphone15.jpg",
        images: [
            { id: 1, name: "iPhone 15", src: "https://www.wireless.ar/iphone_15_web.jpg" },
            { id: 2, name: "iPhone 15", src: "https://www.wireless.ar/iphone_15_web.jpg" },
            { id: 3, name: "iPhone 15", src: "https://www.wireless.ar/iphone_15_web.jpg" },
            { id: 4, name: "iPhone 15", src: "https://www.wireless.ar/iphone_15_web.jpg" },
        ]
    },
    {
        id: 4,
        name: "iPhone 14",
        description: "Un diseño probado y confiable.",
        type: "iphone",
        subcategory: "iPhone 14",
        amout: 990,
        image: "https://www.wireless.ar/web_iphone_14.jpg",
        images: [
            { id: 1, name: "iPhone 14", src: "https://www.wireless.ar/iphone_14_web.jpg" },
            { id: 2, name: "iPhone 14", src: "https://www.wireless.ar/iphone_14_web.jpg" },
            { id: 3, name: "iPhone 14", src: "https://www.wireless.ar/iphone_14_web.jpg" },
            { id: 4, name: "iPhone 14", src: "https://www.wireless.ar/iphone_14_web.jpg" },
        ]
    },
    {
        id: 5,
        name: "iPhone 13",
        description: "Potencia y rendimiento a buen precio.",
        type: "iphone",
        subcategory: "iPhone 13",
        amout: 870,
        image: "https://www.wireless.ar/web_iphone13.png",
        images: [
            { id: 1, name: "iPhone 13", src: "https://www.wireless.ar/iphone_13_web.jpg" },
            { id: 2, name: "iPhone 13", src: "https://www.wireless.ar/iphone_13_web.jpg" },
            { id: 3, name: "iPhone 13", src: "https://www.wireless.ar/iphone_13_web.jpg" },
            { id: 4, name: "iPhone 13", src: "https://www.wireless.ar/iphone_13_web.jpg" },
        ]
    }
]

export type ProductImage = {
    id: number
    name: string
    src: string
}

export type Product = {
    id: number
    name: string
    description: string
    type: string
    subcategory: string
    amout: number
    image: string
    images: ProductImage[]
}
