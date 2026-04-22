import { useProducts } from '../context/ProductsContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SearchBar from '../components/SearchBar.jsx'

function ProductListPage() {
  const { filteredProducts, loading, error, searchTerm, searchProducts, deleteProduct } = useProducts()

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this product?')
    if (!shouldDelete) return

    try {
      await deleteProduct(id)
    } catch {
      window.alert('Delete failed. Please try again.')
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Product Management</h1>
            <p className="mt-1 text-indigo-100">Manage your catalog with search and full CRUD support.</p>
          </div>
        </div>
      </div>

      <SearchBar value={searchTerm} onChange={searchProducts} />

      {loading ? <p className="rounded-xl bg-white p-4 text-slate-600">Loading products...</p> : null}
      {error ? <p className="rounded-xl bg-rose-50 p-4 text-rose-600">{error}</p> : null}

      {!loading && !filteredProducts.length ? (
        <p className="rounded-xl bg-white p-8 text-center text-slate-500">
          No products found. Try a different search term.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </section>
  )
}

export default ProductListPage
