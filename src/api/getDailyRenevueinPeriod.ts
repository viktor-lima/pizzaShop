import { api } from "@/lib/axios";

export interface GetDailyRenevueinPeriodRequest {
  from?: Date,
  to?: Date,
}

export type GetDailyRenevueinPeriodResponse  = {
   date: string;
    receipt: number;
}[]

export async function getDailyRenevueinPeriod({from, to} : GetDailyRenevueinPeriodRequest) {
  const response = await api.get<GetDailyRenevueinPeriodResponse>('/metrics/daily-receipt-in-period', {
    params: {
      from,
      to,
    }
  });
  return response.data;
}