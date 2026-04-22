function SearchBar({ value, onChange }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
      <label htmlFor="search" className="mb-2 block text-sm font-semibold text-slate-700">
        Search by product title
      </label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try iPhone, laptop, perfume..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-indigo-500 transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2"
      />
    </div>
  )
}

export default SearchBar
