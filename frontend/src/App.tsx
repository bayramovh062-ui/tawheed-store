import { BrowserRouter } from 'react-router-dom'
import './App.css'
import RouteConfig from './config/RouteConfig'
import PageContainer from './containers/PageContainer'
import Header from './components/Header'
import SubHeader from './components/SubHeader'

function App() {
  return (
    <>
      <Header />
      <SubHeader />
      <PageContainer>
        <BrowserRouter>
          <RouteConfig />
        </BrowserRouter>
      </PageContainer>
    </>
  )
}

export default App
