import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode, Camera, ArrowLeft } from 'lucide-react'

const QRScanner = () => {
  const navigate = useNavigate()
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState('')

  // Mock QR scanning function
  const handleScan = () => {
    setIsScanning(true)
    setError('')
    
    // Simulate QR scanning
    setTimeout(() => {
      // Mock successful scan - in real app this would be actual QR data
      const mockTableId = 'table-1'
      setIsScanning(false)
      navigate(`/menu/${mockTableId}`)
    }, 2000)
  }

  const handleError = () => {
    setError('QR kod okunamadı. Lütfen tekrar deneyin.')
    setIsScanning(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">QR Kod Oku</h1>
        </div>

        {/* Scanner Area */}
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              {isScanning ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">QR kod taranıyor...</p>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">QR kod alanı</p>
                </div>
              )}
            </div>
            
            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0 w-64 h-64 mx-auto border-2 border-primary-500 rounded-lg">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500"></div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Nasıl Kullanılır?
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>1. Masanızdaki QR kodu telefonunuzla tarayın</p>
              <p>2. Menü otomatik olarak açılacaktır</p>
              <p>3. İstediğiniz yemekleri seçin ve sipariş verin</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {!isScanning ? (
              <button
                onClick={handleScan}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Camera size={20} />
                QR Kod Tara
              </button>
            ) : (
              <button
                onClick={handleError}
                className="w-full btn-secondary"
              >
                İptal Et
              </button>
            )}
            
            <button
              onClick={() => navigate('/menu/table-1')}
              className="w-full btn-secondary"
            >
              Demo Menüyü Görüntüle
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">İpucu</h4>
          <p className="text-sm text-blue-700">
            QR kodun net görünmesi için telefonunuzu masaya yakın tutun ve 
            iyi aydınlatılmış bir ortamda tarama yapın.
          </p>
        </div>
      </div>
    </div>
  )
}

export default QRScanner 