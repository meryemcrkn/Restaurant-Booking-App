import React, { useState } from 'react'
import { useRestaurant } from '../context/RestaurantContext'
import { Calendar, Clock, Users, Phone, Mail, Check } from 'lucide-react'

const Booking = () => {
  const { tables, dispatch } = useRestaurant()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const availableTables = tables.filter(table => table.status === 'available')
  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const booking = {
        id: Date.now(),
        ...formData,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }

      dispatch({ type: 'ADD_BOOKING', payload: booking })
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      })
    }, 2000)
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Rezervasyon Onaylandı!
          </h2>
          <p className="text-gray-600 mb-6">
            Rezervasyonunuz başarıyla alındı. Onay e-postası gönderilecektir.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="btn-primary"
          >
            Yeni Rezervasyon
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Masa Rezervasyonu
          </h1>
          <p className="text-gray-600">
            Özel anlarınız için masanızı önceden ayırtın
          </p>
        </div>

        {/* Available Tables Info */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Müsait Masalar</h3>
              <p className="text-sm text-blue-700">
                {availableTables.length} masa müsait
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {availableTables.length}
              </div>
              <div className="text-sm text-blue-600">Müsait</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Adınız ve soyadınız"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="input-field"
              placeholder="0555 123 45 67"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarih *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                min={getMinDate()}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saat *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                <option value="">Saat seçin</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kişi Sayısı *
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} kişi</option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Özel İstekler
            </label>
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows={4}
              className="input-field"
              placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Rezervasyon Yapılıyor...
              </>
            ) : (
              <>
                <Check size={20} />
                Rezervasyon Yap
              </>
            )}
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Önemli Bilgiler</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Rezervasyonlar en az 2 saat önceden yapılmalıdır</li>
            <li>• 15 dakikadan fazla gecikme durumunda rezervasyon iptal edilebilir</li>
            <li>• Özel istekler için lütfen önceden belirtin</li>
            <li>• Rezervasyon onayı e-posta ile gönderilecektir</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Booking 