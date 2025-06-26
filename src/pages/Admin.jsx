import React, { useState } from 'react'
import { useRestaurant } from '../context/RestaurantContext'
import { 
  Users, 
  Calendar, 
  QrCode, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download
} from 'lucide-react'
import QRCode from 'qrcode.react'

const Admin = () => {
  const { tables, menu, bookings, dispatch } = useRestaurant()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedTable, setSelectedTable] = useState(null)

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: Eye },
    { id: 'tables', label: 'Masalar', icon: Users },
    { id: 'bookings', label: 'Rezervasyonlar', icon: Calendar },
    { id: 'menu', label: 'Menü', icon: Settings },
    { id: 'qr-codes', label: 'QR Kodlar', icon: QrCode }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'occupied': return 'bg-red-100 text-red-800'
      case 'reserved': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Müsait'
      case 'occupied': return 'Dolu'
      case 'reserved': return 'Rezerve'
      default: return 'Bilinmiyor'
    }
  }

  const updateTableStatus = (tableId, newStatus) => {
    dispatch({
      type: 'UPDATE_TABLE_STATUS',
      payload: { tableId, status: newStatus }
    })
  }

  const downloadQRCode = (tableId) => {
    const canvas = document.getElementById(`qr-${tableId}`)
    const link = document.createElement('a')
    link.download = `table-${tableId}-qr.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Toplam Masa</p>
            <p className="text-2xl font-bold text-gray-900">{tables.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users size={24} className="text-blue-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Müsait Masa</p>
            <p className="text-2xl font-bold text-green-600">
              {tables.filter(t => t.status === 'available').length}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Users size={24} className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Dolu Masa</p>
            <p className="text-2xl font-bold text-red-600">
              {tables.filter(t => t.status === 'occupied').length}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <Users size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Rezervasyon</p>
            <p className="text-2xl font-bold text-yellow-600">{bookings.length}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Calendar size={24} className="text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderTables = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Masa Yönetimi</h2>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Yeni Masa Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map(table => (
          <div key={table.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Masa {table.number}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                {getStatusText(table.status)}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kapasite:</span>
                <span className="font-medium">{table.capacity} kişi</span>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={table.status}
                  onChange={(e) => updateTableStatus(table.id, e.target.value)}
                  className="flex-1 input-field text-sm"
                >
                  <option value="available">Müsait</option>
                  <option value="occupied">Dolu</option>
                  <option value="reserved">Rezerve</option>
                </select>
                
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Edit size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Rezervasyonlar</h2>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Müşteri</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Tarih</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Saat</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Kişi</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Durum</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-600">{booking.phone}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{booking.date}</td>
                  <td className="py-3 px-4 text-gray-900">{booking.time}</td>
                  <td className="py-3 px-4 text-gray-900">{booking.guests} kişi</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Onaylandı
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderMenu = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Menü Yönetimi</h2>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Yeni Ürün Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map(item => (
          <div key={item.id} className="card">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary-600">₺{item.price}</span>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Edit size={16} />
                </button>
                <button className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200">
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderQRCodes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">QR Kod Yönetimi</h2>
        <button className="btn-primary flex items-center gap-2">
          <Download size={20} />
          Tümünü İndir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map(table => (
          <div key={table.id} className="card text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Masa {table.number}
            </h3>
            
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <QRCode
                  id={`qr-${table.id}`}
                  value={`${window.location.origin}/menu/${table.qrCode}`}
                  size={120}
                  level="M"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Kapasite: {table.capacity} kişi
              </p>
              <p className="text-sm text-gray-600">
                Durum: {getStatusText(table.status)}
              </p>
              
              <button
                onClick={() => downloadQRCode(table.id)}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Download size={16} />
                İndir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-italian">
        <h1 className="text-3xl font-bold italian-text-gradient font-italian mb-2">PizzaVita Yönetim Paneli</h1>
        <p className="text-gray-600">
          PizzaVita yönetimi için tüm araçlar burada
        </p>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tables' && renderTables()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'menu' && renderMenu()}
        {activeTab === 'qr-codes' && renderQRCodes()}
      </div>
    </div>
  )
}

export default Admin 