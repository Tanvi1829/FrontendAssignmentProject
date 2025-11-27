import React from 'react'
import LoginPage from './pages/auth/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CataloguePage from './pages/Catalogue/CataloguePage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
