import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Home } from './Home.jsx'
import { TriangleNames } from './TriangleNames.jsx'
import { TrigonometricRations } from './TrigonometricRations.jsx'
import { TrigonometricRationsPart2 } from './TrigonometricRationsPart2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/triangle-names" element={<TriangleNames />} />
        <Route path="/trigonometric-rations" element={<TrigonometricRations />} />
        <Route path="/trigonometric-rations-part2" element={<TrigonometricRationsPart2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)