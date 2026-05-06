export interface Product {
    name: string; 
    brand: string | null;
    price: number;
    category: string;
    createdAt: Date;
    stock: number;
    imageUrls: string[] | [];
    description: string | null;
    createdBy: string;
} 
