import { http, HttpResponse } from "msw";
import { GetOrderDetailsRequest, GetOrderDetailsResponse } from "../getOrderDetails";

export const GetOrderDetailsMock = http.get<GetOrderDetailsRequest, never, GetOrderDetailsResponse>(
  '/orders/:orderId', 
  ({params}) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      phone: '123123123123123',
    },
    status: 'pending',
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1000,
        product: { name: 'Pizza Pepperone' },
        quantity: 1
      },
      {
        id: 'order-item-1',
        priceInCents: 2000,
        product: { name: 'Pizza Marguerita' },
        quantity: 2,
      }
    ],
    totalInCents: 5000
  })
})