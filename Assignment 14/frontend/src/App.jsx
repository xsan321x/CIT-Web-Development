import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Users from './pages/Users';

function Navbar() {
  const { isAuthenticated, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionTime, setSessionTime] = useState('00:00:00');
  const [showTokenPanel, setShowTokenPanel] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      const loginTime = parseInt(localStorage.getItem('loginTime') || Date.now());
      const elapsed = Date.now() - loginTime;
      const h = Math.floor(elapsed / 3600000);
      const m = Math.floor((elapsed % 3600000) / 60000);
      const s = Math.floor((elapsed % 60000) / 1000);
      setSessionTime(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateToken = (t) => t ? t.substring(0, 20) + '...' + t.slice(-8) : '';
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/products" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg gradient-text">ProductHub</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* Nav links */}
              <Link
                to="/products"
                className={`hidden md:block px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive('/products') ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:text-white'}`}
              >
                Products
              </Link>
              <Link
                to="/users"
                className={`hidden md:block px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive('/users') ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:text-white'}`}
              >
                Users
              </Link>

              {/* Session timer */}
              <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
                <span className="text-emerald-400 font-mono text-sm font-semibold">{sessionTime}</span>
              </div>

              {/* Token toggle */}
              <button
                onClick={() => setShowTokenPanel(!showTokenPanel)}
                className={`hidden md:flex items-center gap-1.5 border rounded-lg px-3 py-1.5 transition-all text-xs font-medium ${showTokenPanel ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Token
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-300 hover:text-white text-sm transition-colors">Login</Link>
              <Link to="/register">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/25">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Token panel */}
      {showTokenPanel && isAuthenticated && (
        <div className="fade-in border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-xl px-4 sm:px-6 py-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-3 bg-slate-800/80 border border-emerald-500/20 rounded-xl px-4 py-2.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot"></span>
              <div>
                <p className="text-slate-500 text-xs">Session</p>
                <p className="text-emerald-400 font-mono font-bold">{sessionTime}</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-800/80 border border-indigo-500/20 rounded-xl px-4 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-slate-500 text-xs">JWT Authorization Token</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowToken(!showToken)} className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                    {showToken ? '🙈 Hide' : '👁️ Show full'}
                  </button>
                  <button onClick={copyToken} className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                    {copied ? '✅ Copied!' : '📋 Copy'}
                  </button>
                </div>
              </div>
              <p className="font-mono text-xs text-slate-300 break-all leading-relaxed">
                {showToken ? token : truncateToken(token)}
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthenticated ? '/products' : '/login'} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
