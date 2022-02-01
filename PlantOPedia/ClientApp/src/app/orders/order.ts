export interface IOrder {
  orderId: string;
  address: string;
  orderDate: Date;
  product: {productName: string, price: number}
  users: {name: string}
}
