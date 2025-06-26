import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Menu, Calendar, QrCode, Settings } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: Home },
    { path: '/qr-scanner', label: 'QR Oku', icon: QrCode },
    { path: '/booking', label: 'Rezervasyon', icon: Calendar },
    { path: '/admin', label: 'Yönetim', icon: Settings },
  ]

  return (
    <nav className="bg-white shadow-lg border-b-2 border-italian-green/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
              <img 
                src="/logo.png" 
                alt="PizzaVita Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Logo yüklenemezse fallback olarak "P" harfini göster
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-italian-green to-green-600 flex items-center justify-center" style={{display: 'none'}}>
                <span className="text-white font-bold text-xl font-italian">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold italian-text-gradient font-italian">PizzaVita</span>
              <span className="text-xs text-gray-500 -mt-1">İtalyan Lezzetleri</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-italian-green text-white shadow-md'
                      : 'text-gray-600 hover:text-italian-green hover:bg-green-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-600 hover:text-italian-green hover:bg-green-50 transition-colors duration-200">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 