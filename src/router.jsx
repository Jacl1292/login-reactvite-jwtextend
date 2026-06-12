import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/notfound'
import Login from './pages/login'
import Register from './pages/register'
import Change_Password from './pages/change-password'
import Navbar from './components/navbar'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
    errorElement: <NotFound />
  },
  {
    path: '/login',
    element: (
      <>
        <Navbar />
        <Login />
      </>
    )
  },
  {
    path: '/register',
    element: (
      <>
        <Navbar />
        <Register />
      </>
    )
  },
  {
    path: '/change-password',
    element: (
      <>
        <Navbar />
        <Change_Password />
      </>
    )
  },

])