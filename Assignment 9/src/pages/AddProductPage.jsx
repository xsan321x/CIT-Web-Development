import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm.jsx'
import { useProducts } from '../context/ProductsContext.jsx'

function AddProductPage() {
  const navigate = useNavigate()
  const { addProduct, categories } = useProducts()
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (payload, setMessage) => {
    setBusy(true)
    try {
      const created = await addProduct(payload)
      navigate(`/product/${created.id}`)
    } catch (err) {
      setMessage(err.message || 'Failed to add product.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="mt-2 text-indigo-100">Fill out the form and save to create a product.</p>
      </div>

      <ProductForm
        submitText="Add Product"
        onSubmit={handleSubmit}
        busy={busy}
        useCategoryDropdown
        categories={categories}
      />
    </section>
  )
}

export default AddProductPage
