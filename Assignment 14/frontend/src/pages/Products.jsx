import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../services/api';
import { getProductImage } from '../services/seedData';

const CATEGORY_COLORS = {
  'Electronics': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Clothing': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Footwear': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Sports & Fitness': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Home & Kitchen': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Books': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Beauty & Health': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Toys & Games': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Accessories': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Food & Beverages': 'bg-lime-500/10 text-lime-400 border-lime-500/20',
};

const getCategoryColor = (cat) =>
  CATEGORY_COLORS[cat] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err.message);
      setConfirmDeleteId(null);
    }
  };

  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filterCategory ? p.category === filterCategory : true;
    return matchSearch && matchCategory;
  });

  const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-40 shimmer rounded-lg"></div>
          <div className="h-10 w-32 shimmer rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <div className="h-48 shimmer"></div>
              <div className="p-4 flex flex-col gap-2">
                <div className="h-4 shimmer rounded w-3/4"></div>
                <div className="h-4 shimmer rounded w-1/2"></div>
                <div className="h-4 shimmer rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Products <span className="text-slate-500 text-lg font-normal">({filtered.length})</span>
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage your product catalog</p>
        </div>
        <Link to="/add-product">
          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Search & Filter */}
      {products.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && !loading && (
        <div className="glass-card rounded-2xl p-16 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-white font-semibold text-lg mb-2">No products found</h3>
          <p className="text-slate-400 text-sm mb-6">Try adjusting your search or filter.</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(product => (
          <div key={product._id} className="glass-card rounded-2xl overflow-hidden card-hover group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-slate-800">
              <img
                src={product.imageUrl || getProductImage(product.title, product.category)}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/seed/${product._id}/400/300`;
                }}
              />
              {product.category && (
                <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(product.category)} backdrop-blur-sm`}>
                  {product.category}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">{product.title}</h3>
              {product.description && (
                <p className="text-slate-400 text-xs line-clamp-1 mb-2">{product.description}</p>
              )}
              <p className="text-indigo-400 font-bold text-lg">${Number(product.price).toFixed(2)}</p>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                {confirmDeleteId === product._id ? (
                  <div className="flex items-center gap-1.5 w-full fade-in">
                    <span className="text-slate-300 text-xs flex-1">Are you sure?</span>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg transition-all"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-lg transition-all"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to={`/edit-product/${product._id}`} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 hover:text-indigo-300 text-xs py-2 rounded-lg transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => setConfirmDeleteId(product._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 text-xs py-2 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
