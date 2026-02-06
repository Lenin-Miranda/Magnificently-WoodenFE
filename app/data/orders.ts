import { products } from "./products";

export const orders = [
  {
    id: "order1",
    userId: "user1",
    items: [
      { productId: products[0].id, quantity: 2, price: products[0].price },
      { productId: products[1].id, quantity: 1, price: products[1].price },
    ],
    totalAmount: products[0].price * 2 + products[1].price * 1,
    orderDate: new Date("2024-01-15T10:30:00Z"),
    status: "shipped",
  },
  {
    id: "order2",
    userId: "user2",
    items: [
      { productId: products[2].id, quantity: 1, price: products[2].price },
    ],
    totalAmount: products[2].price * 1,
    orderDate: new Date("2024-02-20T14:45:00Z"),
    status: "processing",
  },
  {
    id: "order3",
    userId: "user3",
    items: [
      { productId: products[1].id, quantity: 3, price: products[1].price },
      { productId: products[3].id, quantity: 1, price: products[3].price },
    ],
    totalAmount: products[1].price * 3 + products[3].price * 1,
    orderDate: new Date("2024-03-05T09:15:00Z"),
    status: "delivered",
  },
  {
    id: "order4",
    userId: "user4",
    items: [
      { productId: products[0].id, quantity: 1, price: products[0].price },
      { productId: products[2].id, quantity: 2, price: products[2].price },
    ],
    totalAmount: products[0].price * 1 + products[2].price * 2,
    orderDate: new Date("2024-04-10T16:00:00Z"),
    status: "cancelled",
  },
  {
    id: "order5",
    userId: "user5",
    items: [
      { productId: products[3].id, quantity: 2, price: products[3].price },
    ],
    totalAmount: products[3].price * 2,
    orderDate: new Date("2024-05-18T11:20:00Z"),
    status: "shipped",
  },
  {
    id: "order6",
    userId: "user1",
    items: [
      { productId: products[1].id, quantity: 1, price: products[1].price },
      { productId: products[2].id, quantity: 1, price: products[2].price },
    ],
    totalAmount: products[1].price * 1 + products[2].price * 1,
    orderDate: new Date("2024-06-22T13:50:00Z"),
    status: "processing",
  },
];
