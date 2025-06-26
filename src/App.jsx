import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Booking from './pages/Booking'
import QRScanner from './pages/QRScanner'
import Admin from './pages/Admin'
import { RestaurantProvider } from './context/RestaurantContext'

function App() {
  return (
    <RestaurantProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:tableId" element={<Menu />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/qr-scanner" element={<QRScanner />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RestaurantProvider>
  )
}

export default App 