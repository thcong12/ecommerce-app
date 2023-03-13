export interface Product {
    listImage?: any
    id: string,
    title:string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate:number,
        count:number
    }

}
