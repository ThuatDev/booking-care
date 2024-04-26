import { useRoutes } from 'react-router-dom'
import Home from './components/Home/Home'

// import ProductList from './pages/ProductList'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
    }
  ])
  return routeElements
}
