import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-violet-100 text-slate-800">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <NavLink to="/" className="text-xl font-black tracking-tight text-indigo-600">
            ProductHub
          </NavLink>
          <nav className="flex items-center gap-2 sm:gap-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`
              }
            >
              Add Product
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
