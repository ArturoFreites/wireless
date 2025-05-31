import { NavLink } from "@/types/navbar";

export const NAVLINKS:NavLink[] = [
    {
        id: 1,
        name: "iPhone",
        description:"Los últimos modelos de iPhone",
        subcategory: [
            { id: 1, name: "iPhone 16" },
            { id: 2, name: "iPhone 15" },
            { id: 3, name: "iPhone 14" },
            { id: 4, name: "iPhone 13" },
            { id: 5, name: "iPhone 11" },
            { id: 6, name: "Usados" },
        ],
    },
    {
        id: 2,
        name: "Mac",
        description:"",
        subcategory: [
            { id: 7, name: "MacBook Pro" },
            { id: 8, name: "MacBook Air" },
            { id: 9, name: "iMac" },
            { id: 10, name: "Mac Mini" },
            { id: 11, name: "Mac Studio" },
        ],
    },
    {
        id: 3,
        name: "Notebooks",
        description:"",
        subcategory: [
            { id: 12, name: "Dell XPS" },
            { id: 13, name: "Lenovo ThinkPad" },
            { id: 14, name: "ASUS ROG" },
            { id: 15, name: "HP Spectre" },
            { id: 16, name: "Acer Swift" },
        ],
    },
    {
        id: 4,
        name: "Consoles",
        description:"",
        subcategory: [
            { id: 17, name: "PlayStation" },
            { id: 18, name: "Xbox" },
            { id: 19, name: "Nintendo Switch" },
            { id: 20, name: "Steam Deck" },
        ],
    },
    {
        id: 5,
        name: "Cameras",
        description:"",
        subcategory: [
            { id: 21, name: "Sony Alpha" },
            { id: 22, name: "Canon EOS" },
            { id: 23, name: "Nikon Z" },
            { id: 24, name: "GoPro" },
            { id: 25, name: "Fujifilm X" },
        ],
    },
    {
        id: 6,
        name: "Accessories",
        description:"",
        subcategory: [
            { id: 26, name: "AirPods" },
            { id: 27, name: "Apple Watch" },
            { id: 28, name: "Galaxy Buds" },
            { id: 29, name: "Logitech MX" },
            { id: 30, name: "Anker Power Bank" },
        ],
    },
];
