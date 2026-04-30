import { useState, useEffect } from 'react';
import { getUsers, updateUserById, deleteUserById } from '../services/api';

const avatarColors = [
  'from-indigo-500 to-purple-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-cyan-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-orange-500 to-red-600',
];

const getInitials = (name) =>
  name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Delete state
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditingId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword('');
    setShowPassword(false);
    setSaveError('');
    setConfirmDeleteId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSaveError('');
    setEditPassword('');
  };

  const handleSave = async (id) => {
    setSaving(true);
    setSaveError('');
    try {
      const payload = { name: editName, email: editEmail };
      if (editPassword) payload.password = editPassword;
      const updated = await updateUserById(id, payload);
      setUsers(users.map(u => u._id === id ? updated : u));
      setEditingId(null);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteUserById(id);
      setUsers(users.filter(u => u._id !== id));
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err.message);
      setConfirmDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="fade-in">
        <div className="h-8 w-48 shimmer rounded-lg mb-6"></div>
        <div className="glass-card rounded-2xl overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-5 border-b border-slate-700/50">
              <div className="w-10 h-10 rounded-full shimmer flex-shrink-0"></div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-4 w-32 shimmer rounded"></div>
                <div className="h-3 w-48 shimmer rounded"></div>
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Registered Users{' '}
            <span className="text-slate-500 text-lg font-normal">({users.length})</span>
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            View, edit, and manage all registered accounts
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-sm transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5 text-red-400 text-sm">
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <div className="glass-card rounded-2xl p-16 text-center">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="text-white font-semibold text-lg">No users found</h3>
          <p className="text-slate-400 text-sm mt-1">Registered users will appear here.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 px-6 py-3 border-b border-slate-700/50 bg-slate-800/50">
            <div className="col-span-1 text-slate-400 text-xs font-semibold uppercase tracking-wider">#</div>
            <div className="col-span-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">User</div>
            <div className="col-span-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">Email</div>
            <div className="col-span-3 text-slate-400 text-xs font-semibold uppercase tracking-wider text-right">Actions</div>
          </div>

          {users.map((user, index) => (
            <div
              key={user._id}
              className={`border-b border-slate-700/30 last:border-0 transition-colors ${
                editingId === user._id ? 'bg-slate-800/60' : 'hover:bg-slate-800/20'
              }`}
            >
              {editingId === user._id ? (
                /* ── EDIT MODE ── */
                <div className="px-6 py-5 fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                      {getInitials(editName || user.name)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Editing: {user.name}</p>
                      <p className="text-slate-400 text-xs">Leave password blank to keep it unchanged</p>
                    </div>
                  </div>

                  {saveError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-2 mb-3 text-red-400 text-xs">
                      {saveError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1 font-medium">Full Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        className="w-full bg-slate-700/60 border border-slate-600 text-white rounded-xl px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full bg-slate-700/60 border border-slate-600 text-white rounded-xl px-3 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1 font-medium">
                        New Password <span className="text-slate-600">(optional)</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Leave blank to keep"
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                          className="w-full bg-slate-700/60 border border-slate-600 text-white rounded-xl px-3 py-2.5 pr-10 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder-slate-600"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {showPassword ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            ) : (
                              <>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </>
                            )}
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(user._id)}
                      disabled={saving}
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    >
                      {saving ? (
                        <>
                          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Saving...
                        </>
                      ) : '✓ Save Changes'}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ── VIEW MODE ── */
                <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-3 md:gap-0 px-6 py-4">
                  <div className="hidden md:block col-span-1 text-slate-500 text-sm">{index + 1}</div>

                  <div className="col-span-4 flex items-center gap-3 w-full md:w-auto">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-lg`}>
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                      <p className="text-slate-500 text-xs md:hidden">{user.email}</p>
                    </div>
                  </div>

                  <div className="col-span-4 hidden md:block text-slate-400 text-sm">{user.email}</div>

                  <div className="col-span-3 flex items-center gap-2 justify-start md:justify-end w-full md:w-auto">
                    <button
                      onClick={() => startEdit(user)}
                      className="flex items-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-400 hover:text-indigo-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>

                    {confirmDeleteId === user._id ? (
                      <div className="flex items-center gap-1.5 fade-in">
                        <span className="text-slate-400 text-xs">Sure?</span>
                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={deleting}
                          className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                        >
                          {deleting ? '...' : 'Yes'}
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="bg-slate-700 hover:bg-slate-600 text-slate-300 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(user._id)}
                        className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
