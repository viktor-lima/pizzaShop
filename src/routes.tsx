import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/App'
import { Dashboard } from './pages/app/dashboard/Dashboard'
import { AuthLayout } from './pages/_layouts/Auth'
import { SignIn } from './pages/auth/Sign-in'
import { SignUp } from './pages/auth/Sign-up'
import { Order } from './pages/app/orders/Order'
import { NotFound } from './pages/404'
import { Error } from './pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {path: '/', element: <Dashboard />},
      {path: '/orders', element: <Order />}
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {path: '/sing-in', element: <SignIn />},
      {path: '/sing-up', element: <SignUp />}
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
