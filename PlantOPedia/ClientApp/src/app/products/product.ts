export interface IProduct {
    productId: string;
    productName: string;
    description: string;
    price: number;

    imageUrl: string;
    productTypeId: string;
    productType: {
        productSubType: string; 
        category: {
            categoryType: string;
        }
    };
}