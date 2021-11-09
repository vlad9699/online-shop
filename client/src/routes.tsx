import Basket from './pages/Basket'
import Shop from './pages/Shop'
import ItemPage from './pages/ItemPage'
import { Navigate, useRoutes } from 'react-router-dom'
import MainLayout from './layouts/main'
import Login from './pages/Login'
import Register from './pages/Register'
import NoFound from './pages/NoFound'
import LogOnLayout from './layouts/LogOnLayout'


export const Router = () => {
  const auth = true
  return useRoutes([
    {
      path: '/shop',
      element: <MainLayout/>,
      children: [
        { path: '/shop', element: <Navigate to="/shop/main" /> },
        { path: 'main', element: <Shop/> },
        { path: 'basket', element: <Basket/> },
        { path: 'product/:id', element: <ItemPage/> },
      ],
    },
    // auth &&
    {
      path: '/',
      element: <LogOnLayout/>,
      children: [
        { path: 'login', element: <Login/> },
        { path: 'register', element: <Register/> },
        { path: '404', element: <NoFound/> },
        { path: '/', element: <Navigate to="/shop"/> },
        { path: '*', element: <Navigate to="/404"/> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace/> },
  ])
}


// export const authRoutes = [
//   {
//     path: ADMIN_ROUTE,
//     component: Admin,
//     exact: true,
//   },
//   {
//     path: BASKET_ROUTE,
//     component: Basket,
//     exact: true,
//   },
//
// ]
//
// export const publicRoutes = [
//   {
//     path: SHOP_ROUTE,
//     component: Shop,
//     exact: true,
//   },
//   {
//     path: LOGIN_ROUTE,
//     component: Auth,
//     exact: true,
//   },
//   {
//     path: REGISTRATION_ROUTE,
//     component: Auth,
//     exact: true,
//   },
//   {
//     path: ITEM_ROUTE + '/:id',
//     component: ItemPage,
//     exact: true,
//   },
// ]
