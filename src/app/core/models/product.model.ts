import { Category } from "./category.model";
import { Donor } from "./user.model";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    isDrawn: boolean;
    donorId?: number;
    donor?: Donor;
    categories?: Category[];
    categoryIds?: number[];
}
export interface CreateProduct {
    title: string;
    description: string;
    price: number;
    donorId: number;
    imageUrl?: string;
    categoryIds?: number[];
}
