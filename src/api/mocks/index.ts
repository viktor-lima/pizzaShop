import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { singInMock } from './SingInMock'
import { RegisterRestaurantMock } from './RegisterRestaurantsMock'
import { GetDayOrdersAmountMock } from './getDayOdersAmountMock'
import { GetMonthOrdersAmountMock } from './getMonthOrdersAmount'
import { getMonthCanceledOrdersAmountMock } from './getMonthCanceledOrdersAmountMock'
import { GetMonthRevenueMock } from './getMonthRevenueMock'
import { GetPopularProductsMock } from './getPopularProductsMock'
import { GetDailyRenevueInPeriodMock } from './getDailyRenevueInPeriodMock'
import { GetProfileMock } from './getProfileMock'
import { GetManagedRestaurantMock } from './getManagedRestaurantMock'
import { UpdateProfileMock } from './updateProfileMock'
import { GetOrdersMock } from './getOrdersMock'
import { GetOrderDetailsMock } from './getOrderDetailsMock'


export const worker = setupWorker(
  singInMock,
  RegisterRestaurantMock,
  GetDayOrdersAmountMock,
  GetMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  GetMonthRevenueMock,
  GetDailyRenevueInPeriodMock,
  GetPopularProductsMock,
  GetProfileMock,
  GetManagedRestaurantMock,
  UpdateProfileMock,
  GetOrdersMock,
  GetOrderDetailsMock,

)

export async function enableMSW() {
  if(env.MODE !== 'test'){
    return
  }
  await worker.start()
} 