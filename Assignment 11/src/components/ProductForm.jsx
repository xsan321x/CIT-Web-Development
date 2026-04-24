import { useState } from 'react'

const INITIAL_STATE = {
  title: '',
  description: '',
  price: '',
  brand: '',
  category: '',
  rating: '',
  stock: '',
  thumbnail: '',
}

function ProductForm({
  initialValues,
  onSubmit,
  submitText,
  busy,
  useCategoryDropdown = false,
  categories = [],
  onDiscard,
}) {
  const [formData, setFormData] = useState(initialValues ?? INITIAL_STATE)
  const [message, setMessage] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const categoryOptions = formData.category
    ? Array.from(new Set([...categories, formData.category]))
    : categories

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')

    if (!formData.title.trim() || !formData.price) {
      setMessage('Title and price are required.')
      return
    }

    const parsedPrice = Number.parseFloat(formData.price)
    if (Number.isNaN(parsedPrice)) {
      setMessage('Enter a valid price, for example 9.99.')
      return
    }

    const parsedRating =
      formData.rating === '' ? null : Number.parseFloat(formData.rating)
    if (formData.rating !== '' && (Number.isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5)) {
      setMessage('Rating must be between 0 and 5.')
      return
    }

    const parsedStock =
      formData.stock === '' ? null : Number.parseInt(formData.stock, 10)
    if (formData.stock !== '' && (Number.isNaN(parsedStock) || parsedStock < 0)) {
      setMessage('Stock must be a non-negative whole number.')
      return
    }

    const payload = {
      ...formData,
      price: parsedPrice,
      rating: parsedRating,
      stock: parsedStock,
      category: customCategory.trim() || formData.category,
    }

    await onSubmit(payload, setMessage)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-600">Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Price *</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Brand</label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Category</label>
          <div className="space-y-2">
            {useCategoryDropdown ? (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            <input
              name="customCategory"
              value={customCategory}
              onChange={(event) => setCustomCategory(event.target.value)}
              placeholder="Or type a custom category"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Rating (0-5)</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={formData.rating}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={formData.stock}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Thumbnail URL</label>
          <input
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-600">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-rose-600">{message}</p> : null}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          disabled={busy}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? 'Saving...' : submitText}
        </button>
        {onDiscard ? (
          <button
            type="button"
            onClick={onDiscard}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Discard Changes
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default ProductForm
