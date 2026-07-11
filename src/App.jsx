import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ComingSoon from './pages/ComingSoon'
import LandingPage from './components/LandingPage'
import Dashbaord from './Dashbaord'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        {/* <Route path="/" element={<ComingSoon />}> */}
          <Route index element={<LandingPage />} />   
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashbaord />} />
          <Route path="coming-soon" element={<ComingSoon />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
