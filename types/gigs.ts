export interface Gig{
    id: number,
    title: string,
    user: {
        id: number,
        name: string,
        isActive: string,
    },
    description: string,
    price: string,
    files: string[],
    paymentMethod: string,
    category: {
        id: number,
        name: string,
        isActive: string,
    },
    subCategories:number[]
}