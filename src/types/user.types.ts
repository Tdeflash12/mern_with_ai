export interface Address {
    street: string| null;
    city: string;
    country: string;
    province: string;    
}
export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    roles: string[];
    address: Address; 
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
    profileImageUrl: string | null;
}