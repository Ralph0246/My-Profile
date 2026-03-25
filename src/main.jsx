import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Header/Navbar.jsx'
import Homepage from './LandingPage/Homepage.jsx'
import MyProject from './LandingPage/MyProject.jsx'
import MyJourney from './LandingPage/MyJourney.jsx'
import GraphicDesigning from './LandingPage/GraphicDesining.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Homepage />
    <MyProject />
    <GraphicDesigning />
    <MyJourney />
  </StrictMode>,
)