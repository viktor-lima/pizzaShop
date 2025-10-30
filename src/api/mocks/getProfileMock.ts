import { http, HttpResponse } from "msw";
import { GetProfileResponse } from "../getProfile";

export const GetProfileMock = http.get<never, never, GetProfileResponse>('/me', () => {
  return HttpResponse.json({
    id: 'custom-use-id',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '81234353423',
    role: 'manager',
    createdAt: new Date(),
    updatedAt: null
  })
})