import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext.jsx'

function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, fetchProductById, deleteProduct } = useProducts()
  const localProduct = products.find((item) => item.id === Number(id))
  const [remoteProduct, setRemoteProduct] = useState(null)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  const matchedRemoteProduct =
    remoteProduct && remoteProduct.id === Number(id) ? remoteProduct : null
  const product = localProduct ?? matchedRemoteProduct
  const loading = !product && !error

  useEffect(() => {
    if (localProduct) {
      return
    }

    if (matchedRemoteProduct) {
      return
    }

    const loadProduct = async () => {
      setError('')
      try {
        const fetchedProduct = await fetchProductById(id)
        setRemoteProduct(fetchedProduct)
      } catch (err) {
        setError(err.message || 'Could not load product details.')
      }
    }

    loadProduct()
  }, [id, localProduct, matchedRemoteProduct, fetchProductById])

  const handleDelete = async () => {
    const shouldDelete = window.confirm('Delete this product? This action cannot be undone.')
    if (!shouldDelete) return

    setDeleting(true)
    try {
      await deleteProduct(id)
      navigate('/')
    } catch {
      window.alert('Delete failed. Please try again.')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <p className="rounded-xl bg-white p-4">Loading details...</p>
  if (error) return <p className="rounded-xl bg-rose-50 p-4 text-rose-600">{error}</p>
  if (!product) return <p className="rounded-xl bg-white p-4">Product not found.</p>

  return (
    <section className="space-y-5">
      <Link to="/" className="inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700">
        Back to products
      </Link>

      <article className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-md md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
          <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">{product.category}</p>
            <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
            <p className="mt-2 text-2xl font-bold text-indigo-700">${product.price}</p>
          </div>

          <p className="text-slate-600">{product.description}</p>

          <div className="grid gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {product.rating || 'N/A'}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {product.stock || 'N/A'}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              to={`/edit/${product.id}`}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Edit Product
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {deleting ? 'Deleting...' : 'Delete Product'}
            </button>
          </div>
        </div>
      </article>
    </section>
  )
}

export default ProductDetailsPage
