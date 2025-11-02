import { http, HttpResponse } from "msw";
import { CancelOrderRequest } from "../CancelOrder";

export const CancelOrderMock = http.patch<CancelOrderRequest, never, never>(
  '/orders/:orderId/cancel',
  async ({params}) => {
    if(params.orderId === 'error-order-id'){
      return new HttpResponse(null, { status: 400})
    }

    return new HttpResponse(null, {status: 204})
  },
)