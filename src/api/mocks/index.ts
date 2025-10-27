import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { singInMock } from './SingInMock'
import { RegisterRestaurantMock } from './RegisterRestaurantsMock'
import { GetDayOrdersAmountMock } from './GetDayOdersAmountMock'
import { GetMonthOrdersAmountMock } from './GetMonthOrdersAmount'
import { getMonthCanceledOrdersAmountMock } from './getMonthCanceledOrdersAmountMock'
import { GetMonthRevenueMock } from './GetMonthRevenueMock'
import { GetPopularProductsMock } from './GetPopularProductsMock'
import { GetDailyRenevueInPeriodMock } from './GetDailyRenevueInPeriodMock'


export const worker = setupWorker(
  singInMock,
  RegisterRestaurantMock,
  GetDayOrdersAmountMock,
  GetMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  GetMonthRevenueMock,
  GetDailyRenevueInPeriodMock,
  GetPopularProductsMock
)

export async function enableMSW() {
  if(env.MODE !== 'test'){
    return
  }
  await worker.start()
} 