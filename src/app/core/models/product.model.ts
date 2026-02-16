import { Category } from "./category.model";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string; 
    categories: [Category];
    isDrawn : boolean;
}