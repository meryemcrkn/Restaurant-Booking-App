import React from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Calendar, Menu, Users } from 'lucide-react'
import { useRestaurant } from '../context/RestaurantContext'

const Home = () => {
  const { tables } = useRestaurant()

  const availableTables = tables.filter(table => table.status === 'available').length
  const totalTables = tables.length

  const features = [
    {
      icon: QrCode,
      title: 'QR Kod ile Menü',
      description: 'Masalardaki QR kodları okutarak menüyü görüntüleyin',
      link: '/qr-scanner',
      color: 'bg-italian-green'
    },
    {
      icon: Calendar,
      title: 'Kolay Rezervasyon',
      description: 'Online rezervasyon yaparak masanızı ayırtın',
      link: '/booking',
      color: 'bg-italian-red'
    },
    {
      icon: Menu,
      title: 'Dijital Menü',
      description: 'Güncel menüyü dijital olarak inceleyin',
      link: '/menu/1',
      color: 'bg-italian-gold'
    },
    {
      icon: Users,
      title: 'Müşteri Hizmetleri',
      description: 'Hızlı ve kaliteli hizmet deneyimi',
      link: '#',
      color: 'bg-italian-olive'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold italian-text-gradient font-italian mb-4">
            PizzaVita
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            Gerçek İtalyan lezzetlerini keşfedin
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-italian-green to-italian-red mx-auto mt-6 rounded-full"></div>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Modern restaurant deneyimi için QR kod teknolojisini kullanıyoruz. 
          Masanızdaki QR kodu okutarak menüyü görüntüleyin ve sipariş verin.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-italian text-center">
          <div className="text-3xl font-bold text-italian-green">{totalTables}</div>
          <div className="text-gray-600">Toplam Masa</div>
        </div>
        <div className="card-italian text-center">
          <div className="text-3xl font-bold text-italian-green">{availableTables}</div>
          <div className="text-gray-600">Müsait Masa</div>
        </div>
        <div className="card-italian text-center">
          <div className="text-3xl font-bold text-italian-red">24/7</div>
          <div className="text-gray-600">Hizmet</div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Link
              key={index}
              to={feature.link}
              className="card-italian hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                <Icon size={28} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-italian">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Link>
          )
        })}
      </div>

      {/* CTA Section */}
      <div className="card-italian text-center bg-gradient-to-br from-italian-green via-green-600 to-italian-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 font-italian">
            Hemen Başlayın
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            QR kodunuzu okutun veya rezervasyon yapın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/qr-scanner"
              className="bg-white text-italian-green hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              QR Kod Oku
            </Link>
            <Link
              to="/booking"
              className="bg-white text-italian-green hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Rezervasyon Yap
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 