import { Link } from 'react-router-dom'

function ProductCard({ product, onDelete }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-slate-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <Link
            to={`/product/${product.id}`}
            className="line-clamp-1 text-base font-semibold text-slate-800 hover:text-indigo-700"
          >
            {product.title}
          </Link>
          <p className="text-lg font-bold text-indigo-700">${product.price}</p>
          <p className="line-clamp-1 text-xs uppercase tracking-wide text-slate-400">{product.category}</p>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/edit/${product.id}`}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
