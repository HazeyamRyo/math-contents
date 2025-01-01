import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Home } from './Home.jsx'
import { TriangleNames } from './TriangleNames.jsx'
import { TrigonometricRations } from './TrigonometricRations.jsx'
import { TrigonometricRationsPart2 } from './TrigonometricRationsPart2.jsx'
import { ApplicationOfTrigonometricRatios } from './ApplicationOfTrigonometricRatios.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/math-contents">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/triangle-names" element={<TriangleNames />} />
        <Route path="/trigonometric-rations" element={<TrigonometricRations />} />
        <Route path="/trigonometric-rations-part2" element={<TrigonometricRationsPart2 />} />
        <Route path="/application-of-trigonometric-ratios" element={<ApplicationOfTrigonometricRatios />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)