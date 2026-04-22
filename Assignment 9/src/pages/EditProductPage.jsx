import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

function mapProductToForm(product) {
  return {
    title: product.title ?? '',
    description: product.description ?? '',
    price: String(product.price ?? ''),
    brand: product.brand ?? '',
    category: product.category ?? '',
    thumbnail: product.thumbnail ?? '',
  }
}

function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, categories, fetchProductById, updateProduct } = useProducts()
  const localProduct = products.find((item) => item.id === Number(id))
  const [initialValues, setInitialValues] = useState(null)
  const [isFetching, setIsFetching] = useState(!localProduct)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const resolvedInitialValues = localProduct ? mapProductToForm(localProduct) : initialValues

  useEffect(() => {
    if (localProduct) {
      return
    }

    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id)
        setInitialValues(mapProductToForm(data))
      } catch (err) {
        setError(err.message || 'Failed to load product.')
      } finally {
        setIsFetching(false)
      }
    }

    loadProduct()
  }, [id, localProduct, fetchProductById])

  const handleSubmit = async (payload, setMessage) => {
    setBusy(true)
    try {
      await updateProduct(id, payload)
      navigate(`/product/${id}`)
    } catch (err) {
      setMessage(err.message || 'Failed to update product.')
    } finally {
      setBusy(false)
    }
  }

  const handleDiscard = () => {
    navigate(`/product/${id}`)
  }

  if (isFetching && !resolvedInitialValues) return <p className="rounded-xl bg-white p-4">Loading product...</p>
  if (error) return <p className="rounded-xl bg-rose-50 p-4 text-rose-600">{error}</p>

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
      <p className="text-slate-600">Update the fields below and save your changes.</p>
      <ProductForm
        key={`${id}-${resolvedInitialValues ? 'ready' : 'loading'}`}
        initialValues={resolvedInitialValues}
        submitText="Save Changes"
        onSubmit={handleSubmit}
        busy={busy}
        useCategoryDropdown
        categories={categories}
        onDiscard={handleDiscard}
      />
    </section>
  )
}

export default EditProductPage
