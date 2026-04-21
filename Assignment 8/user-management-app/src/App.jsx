import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Users from './pages/Users';

function AppShell() {
  const location = useLocation();
  const isUsersPage = location.pathname === '/';

  return (
    <div className="min-h-screen text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="mesh-bg absolute inset-0" />
        <div className="absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute right-[-5rem] top-32 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">
              React Assignment
            </p>
            <Link
              to="/"
              className="mt-1 inline-block text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
            >
              User Management App
            </Link>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              View, add, edit, and delete users with React Hooks, React Router, and the DummyJSON API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
              DummyJSON + local sync
            </div>
            {!isUsersPage && (
              <Link
                to="/"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Back to Users
              </Link>
            )}
            {location.pathname !== '/add-user' && (
              <Link
                to="/add-user"
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Add New User
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
