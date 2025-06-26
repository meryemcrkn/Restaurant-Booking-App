import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantContext'
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react'

const Menu = () => {
  const { tableId } = useParams()
  const { menu, tables } = useRestaurant()
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  const currentTable = tables.find(table => table.qrCode === tableId)
  const categories = ['all', ...new Set(menu.map(item => item.category))]

  const filteredMenu = selectedCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === selectedCategory)

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId)
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find(item => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const handleOrder = () => {
    if (cart.length === 0) return
    
    // Burada sipariş gönderme işlemi yapılacak
    alert('Siparişiniz alındı! Teşekkürler.')
    setCart([])
  }

  if (!currentTable) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Masa Bulunamadı
        </h2>
        <p className="text-gray-600">
          Lütfen geçerli bir QR kod kullanın.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Masa {currentTable.number} - Menü
            </h1>
            <p className="text-gray-600">
              Kapasite: {currentTable.capacity} kişi
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Toplam Tutar</div>
            <div className="text-2xl font-bold text-primary-600">
              ₺{getCartTotal()}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'Tümü' : category}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMenu.map(item => {
              const cartQuantity = getCartItemQuantity(item.id)
              
              return (
                <div key={item.id} className="card">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">
                          ₺{item.price}
                        </span>
                        <div className="flex items-center gap-2">
                          {cartQuantity > 0 && (
                            <>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-medium">
                                {cartQuantity}
                              </span>
                            </>
                          )}
                          <button
                            onClick={() => addToCart(item)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                              cartQuantity > 0
                                ? 'bg-primary-500 text-white hover:bg-primary-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <div className="card sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart size={24} className="text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Sepetim</h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
                <p>Sepetiniz boş</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          ₺{item.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          ₺{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-gray-900">Toplam:</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₺{getCartTotal()}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleOrder}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Check size={20} />
                    Sipariş Ver
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu 