import { useRoutes } from 'react-router-dom'
import Home from './components/Home/Home'
import Test from './components/Home/Test'

// import ProductList from './pages/ProductList'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/test',
      element: <Test />
    }
  ])
  return routeElements
}
