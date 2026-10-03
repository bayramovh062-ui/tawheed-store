import { BrowserRouter } from 'react-router-dom'
import './App.css'
import RouteConfig from './config/RouteConfig'
import PageContainer from './containers/PageContainer'
import Header from './components/Header'
import SubHeader from './components/SubHeader'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SubHeader />
        <PageContainer>

          <RouteConfig />
        </PageContainer>
      </BrowserRouter>

    </>
  )
}

export default App
