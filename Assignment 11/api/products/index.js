import { products } from '../_productsStore.js'

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    return res.status(200).json(products)
  }

  if (req.method === 'POST') {
    const nextId = products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1
    const body = req.body || {}

    const newProduct = {
      id: nextId,
      name: body.name,
      price: body.price,
      category: body.category || '',
      description: body.description || '',
      brand: body.brand || '',
      rating: body.rating ?? null,
      stock: body.stock ?? null,
      thumbnail: body.thumbnail || '',
    }

    products.push(newProduct)
    return res.status(201).json(newProduct)
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
