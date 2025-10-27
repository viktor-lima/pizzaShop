import { http, HttpResponse } from 'msw'
import { RegisterRestaurantBody } from '../registerRestaurant'

export const RegisterRestaurantMock = http.post<never, RegisterRestaurantBody>(
  '/restaurants',
  async ({request}) => {
  const { restaurantName } = await request.json()

  if (restaurantName === 'Pizza Shoop') {
    return new HttpResponse(null, {status: 201 })
  }

  return new HttpResponse(null, {status: 400})
})