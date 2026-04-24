import { products } from '../_productsStore.js'

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const productId = Number.parseInt(req.query.id, 10)
  const index = products.findIndex((item) => item.id === productId)
  const product = index >= 0 ? products[index] : null

  if (req.method === 'GET') {
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.status(200).json(product)
  }

  if (req.method === 'PUT') {
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    const body = req.body || {}
    product.name = body.name ?? product.name
    product.price = body.price ?? product.price
    product.category = body.category ?? product.category
    product.description = body.description ?? product.description
    product.brand = body.brand ?? product.brand
    product.rating = body.rating ?? product.rating
    product.stock = body.stock ?? product.stock
    product.thumbnail = body.thumbnail ?? product.thumbnail

    return res.status(200).json(product)
  }

  if (req.method === 'DELETE') {
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    products.splice(index, 1)
    return res.status(200).json({ message: 'Product deleted successfully' })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
