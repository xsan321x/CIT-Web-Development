/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/products'
const ProductsContext = createContext(null)

async function request(url, options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error('Request failed. Please try again.')
  }

  return response.json()
}

function mapApiProductToUi(product) {
  const safeThumbnail =
    typeof product.thumbnail === 'string' && product.thumbnail.trim()
      ? product.thumbnail
      : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'

  return {
    ...product,
    title: product.title ?? product.name ?? '',
    description: product.description ?? '',
    brand: product.brand ?? '',
    category: product.category ?? '',
    thumbnail: safeThumbnail,
  }
}

function mapUiProductToApi(productData) {
  return {
    ...productData,
    name: productData.title,
  }
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products

    const term = searchTerm.toLowerCase()
    return products.filter((product) => product.title.toLowerCase().includes(term))
  }, [products, searchTerm])

  const categories = useMemo(
    () =>
      products
        .map((product) => product.category)
        .filter(Boolean)
        .filter((category, index, list) => list.indexOf(category) === index),
    [products],
  )

  const fetchProducts = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await request(BASE_URL)
      setProducts(Array.isArray(data) ? data.map(mapApiProductToUi) : [])
    } catch (err) {
      setError(err.message || 'Unable to fetch products.')
    } finally {
      setLoading(false)
    }
  }

  const fetchProductById = async (id) => {
    try {
      const data = await request(`${BASE_URL}/${id}`)
      return mapApiProductToUi(data)
    } catch (err) {
      throw new Error(err.message || 'Unable to fetch product details.')
    }
  }

  const searchProducts = async (term) => {
    setSearchTerm(term)

    // Local filtering handles search for this backend.
  }

  const addProduct = async (productData) => {
    setError('')
    const payload = await request(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapUiProductToApi(productData)),
    })

    const mappedPayload = mapApiProductToUi(payload)
    setProducts((prev) => [mappedPayload, ...prev])
    return mappedPayload
  }

  const updateProduct = async (id, productData) => {
    setError('')
    const payload = await request(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapUiProductToApi(productData)),
    })

    const mappedPayload = mapApiProductToUi(payload)
    setProducts((prev) =>
      prev.map((product) => (product.id === Number(id) ? { ...product, ...mappedPayload } : product)),
    )

    return mappedPayload
  }

  const deleteProduct = async (id) => {
    setError('')
    await request(`${BASE_URL}/${id}`, { method: 'DELETE' })

    setProducts((prev) => prev.filter((product) => product.id !== Number(id)))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts()
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
