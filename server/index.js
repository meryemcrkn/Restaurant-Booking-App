const express = require('express')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// In-memory data storage (in production, use a database)
let tables = [
  { id: 1, number: 1, capacity: 4, status: 'available', qrCode: 'table-1' },
  { id: 2, number: 2, capacity: 6, status: 'occupied', qrCode: 'table-2' },
  { id: 3, number: 3, capacity: 2, status: 'available', qrCode: 'table-3' },
  { id: 4, number: 4, capacity: 8, status: 'reserved', qrCode: 'table-4' },
]

let menu = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Domates sosu, mozzarella peyniri, fesleğen',
    price: 45,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400'
  },
  {
    id: 2,
    name: 'Spaghetti Carbonara',
    description: 'Yumurta, peynir, domuz pastırması',
    price: 35,
    category: 'Makarna',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400'
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description: 'Marul, parmesan peyniri, kruton',
    price: 25,
    category: 'Salata',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'
  },
  {
    id: 4,
    name: 'Tiramisu',
    description: 'İtalyan tatlısı, kahve aromalı',
    price: 20,
    category: 'Tatlı',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'
  }
]

let bookings = []
let orders = []

// Routes

// Get all tables
app.get('/api/tables', (req, res) => {
  res.json(tables)
})

// Get table by QR code
app.get('/api/tables/qr/:qrCode', (req, res) => {
  const table = tables.find(t => t.qrCode === req.params.qrCode)
  if (!table) {
    return res.status(404).json({ error: 'Masa bulunamadı' })
  }
  res.json(table)
})

// Update table status
app.put('/api/tables/:id/status', (req, res) => {
  const { status } = req.body
  const table = tables.find(t => t.id === parseInt(req.params.id))
  
  if (!table) {
    return res.status(404).json({ error: 'Masa bulunamadı' })
  }
  
  table.status = status
  res.json(table)
})

// Get menu
app.get('/api/menu', (req, res) => {
  res.json(menu)
})

// Add menu item
app.post('/api/menu', (req, res) => {
  const newItem = {
    id: menu.length + 1,
    ...req.body
  }
  menu.push(newItem)
  res.status(201).json(newItem)
})

// Update menu item
app.put('/api/menu/:id', (req, res) => {
  const item = menu.find(m => m.id === parseInt(req.params.id))
  if (!item) {
    return res.status(404).json({ error: 'Menü öğesi bulunamadı' })
  }
  
  Object.assign(item, req.body)
  res.json(item)
})

// Delete menu item
app.delete('/api/menu/:id', (req, res) => {
  const index = menu.findIndex(m => m.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).json({ error: 'Menü öğesi bulunamadı' })
  }
  
  menu.splice(index, 1)
  res.status(204).send()
})

// Get bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings)
})

// Create booking
app.post('/api/bookings', (req, res) => {
  const booking = {
    id: uuidv4(),
    ...req.body,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
  bookings.push(booking)
  res.status(201).json(booking)
})

// Get orders
app.get('/api/orders', (req, res) => {
  res.json(orders)
})

// Create order
app.post('/api/orders', (req, res) => {
  const order = {
    id: uuidv4(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  orders.push(order)
  res.status(201).json(order)
})

// Update order status
app.put('/api/orders/:id/status', (req, res) => {
  const { status } = req.body
  const order = orders.find(o => o.id === req.params.id)
  
  if (!order) {
    return res.status(404).json({ error: 'Sipariş bulunamadı' })
  }
  
  order.status = status
  res.json(order)
})

// Get restaurant stats
app.get('/api/stats', (req, res) => {
  const stats = {
    totalTables: tables.length,
    availableTables: tables.filter(t => t.status === 'available').length,
    occupiedTables: tables.filter(t => t.status === 'occupied').length,
    reservedTables: tables.filter(t => t.status === 'reserved').length,
    totalBookings: bookings.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length
  }
  res.json(stats)
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Bir şeyler ters gitti!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`API available at http://localhost:${PORT}/api`)
}) 