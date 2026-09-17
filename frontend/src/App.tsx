import { BrowserRouter } from 'react-router-dom'
import './App.css'
import RouteConfig from './config/RouteConfig'
import PageContainer from './containers/PageContainer'
import Header from './components/Header'

function App() {
  return (
    <>
      <PageContainer>
        <Header />
        <BrowserRouter>
          <RouteConfig />
        </BrowserRouter>
      </PageContainer>
    </>
  )
}

export default App
