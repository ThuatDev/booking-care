import Header from './components/Header/Header'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return (
    <div>
      <Header />
      {routeElements}
    </div>
  )
}

export default App
