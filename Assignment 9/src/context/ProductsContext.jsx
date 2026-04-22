/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const BASE_URL = 'https://dummyjson.com/products'
const ProductsContext = createContext(null)

async function request(url, options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error('Request failed. Please try again.')
  }

  return response.json()
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products

    const term = searchTerm.toLowerCase()
    return products.filter((product) => product.title.toLowerCase().includes(term))
  }, [products, searchTerm])

  const fetchProducts = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await request(`${BASE_URL}?limit=100`)
      setProducts(data.products ?? [])
    } catch (err) {
      setError(err.message || 'Unable to fetch products.')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await request(`${BASE_URL}/categories`)
      if (Array.isArray(data)) {
        const categoryNames = data.map((item) =>
          typeof item === 'string' ? item : item.name || '',
        )
        setCategories(categoryNames.filter(Boolean))
      }
    } catch {
      setCategories([])
    }
  }

  const fetchProductById = async (id) => {
    try {
      return await request(`${BASE_URL}/${id}`)
    } catch (err) {
      throw new Error(err.message || 'Unable to fetch product details.')
    }
  }

  const searchProducts = async (term) => {
    setSearchTerm(term)

    if (!term.trim()) {
      return
    }

    try {
      const data = await request(`${BASE_URL}/search?q=${encodeURIComponent(term)}`)
      if (Array.isArray(data.products)) {
        setProducts((currentProducts) => {
          const productMap = new Map(currentProducts.map((item) => [item.id, item]))
          data.products.forEach((item) => productMap.set(item.id, item))
          return Array.from(productMap.values())
        })
      }
    } catch {
      // No state change is needed here because local filtering still works.
    }
  }

  const addProduct = async (productData) => {
    setError('')
    const payload = await request(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })

    setProducts((prev) => [payload, ...prev])
    return payload
  }

  const updateProduct = async (id, productData) => {
    setError('')
    const payload = await request(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })

    setProducts((prev) =>
      prev.map((product) => (product.id === Number(id) ? { ...product, ...payload } : product)),
    )

    return payload
  }

  const deleteProduct = async (id) => {
    setError('')
    try {
      await request(`${BASE_URL}/${id}`, { method: 'DELETE' })
    } catch {
      // Ignore API errors for local products or mock API limitations
    }

    setProducts((prev) => prev.filter((product) => product.id !== Number(id)))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
      fetchCategories()
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const value = {
    products,
    categories,
    filteredProducts,
    loading,
    error,
    searchTerm,
    fetchProducts,
    fetchProductById,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setSearchTerm,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used inside ProductsProvider')
  }

  return context
}
