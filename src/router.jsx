import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/notfound'
import Login from './pages/login'
import Register from './pages/register'
import Change_Password from './pages/change-password'
import Navbar from './components/navbar'
import Layout from './components/layout'
import ProtectedRoute from './components/protectedRoute'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/change-password',
        element: (
          <ProtectedRoute>
            <Change_Password />
          </ProtectedRoute>
        )
      }
    ]
  }
]);