import { BrowserRouter, useLocation } from 'react-router-dom'
import './App.css'
import RouteConfig from './config/RouteConfig'
import PageContainer from './containers/PageContainer'
import Header from './components/Header'
import SubHeader from './components/SubHeader'

function MainContent() {
  const location = useLocation()

  const isAuthPage = location.pathname.toLocaleLowerCase() === '/register' || location.pathname.toLocaleLowerCase() === '/login'

  return (
    <>
      <Header />
      <SubHeader />
      {isAuthPage ? <RouteConfig /> : (
        <PageContainer>
          <RouteConfig />
        </PageContainer>
      )}
    </>
  )
}

function App() {


  return (
    <>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>

    </>
  )
}

export default App
