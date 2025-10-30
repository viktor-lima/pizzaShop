import { http, HttpResponse } from "msw";
import { GetManagedRestaurantResponse } from "../getManagedRestaurant";

export const GetManagedRestaurantMock = http.get<never, never, GetManagedRestaurantResponse>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: 'custom-restaurant-id',
    name: 'Pizza Shoop',
    description: 'Custom Restaurant description',
    managerId: 'curstom-user-id',
    createdAt: new Date(),
    updatedAt: null
  })
})