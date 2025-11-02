import { http, HttpResponse } from "msw";
import { DeliveryOrderRequest } from "../DeliveryOrder";

export const DeliveryOrderMock = http.patch<DeliveryOrderRequest, never, never>(
  '/orders/:orderId/deliver',
  async ({params}) => {
    if(params.orderId === 'error-order-id'){
      return new HttpResponse(null, { status: 400})
    }

    return new HttpResponse(null, {status: 204})
  },
)