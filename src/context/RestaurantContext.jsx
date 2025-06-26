import React, { createContext, useContext, useReducer, useEffect } from 'react'

const RestaurantContext = createContext()

const initialState = {
  tables: [],
  menu: [],
  bookings: [],
  currentTable: null,
  loading: false,
  error: null
}

const restaurantReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_TABLES':
      return { ...state, tables: action.payload }
    case 'SET_MENU':
      return { ...state, menu: action.payload }
    case 'SET_BOOKINGS':
      return { ...state, bookings: action.payload }
    case 'SET_CURRENT_TABLE':
      return { ...state, currentTable: action.payload }
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] }
    case 'UPDATE_TABLE_STATUS':
      return {
        ...state,
        tables: state.tables.map(table =>
          table.id === action.payload.tableId
            ? { ...table, status: action.payload.status }
            : table
        )
      }
    default:
      return state
  }
}

export const RestaurantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState)

  // Mock data initialization
  useEffect(() => {
    const mockTables = [
      { id: 1, number: 1, capacity: 4, status: 'available', qrCode: 'table-1' },
      { id: 2, number: 2, capacity: 6, status: 'occupied', qrCode: 'table-2' },
      { id: 3, number: 3, capacity: 2, status: 'available', qrCode: 'table-3' },
      { id: 4, number: 4, capacity: 8, status: 'reserved', qrCode: 'table-4' },
    ]

    const mockMenu = [
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

    dispatch({ type: 'SET_TABLES', payload: mockTables })
    dispatch({ type: 'SET_MENU', payload: mockMenu })
  }, [])

  const value = {
    ...state,
    dispatch
  }

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  )
}

export const useRestaurant = () => {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider')
  }
  return context
} 