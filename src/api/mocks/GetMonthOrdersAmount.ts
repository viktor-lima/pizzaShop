import { http, HttpResponse } from "msw";
import { GetMonthOrdersAmountResponse } from "../getMonthOrdersAmount";

export const GetMonthOrdersAmountMock = http.get<never, never, GetMonthOrdersAmountResponse>('/metrics/month-orders-amount', () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: -5, 
  })
})