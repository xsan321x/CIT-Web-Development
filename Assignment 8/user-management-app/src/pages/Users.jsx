import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { deleteUser, listUsers } from '../utils/userStore';

const NOTICE_STYLES = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
};

function Users() {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [notice, setNotice] = useState(location.state?.notice ?? null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const fetchedUsers = await listUsers();
        setUsers(fetchedUsers);
      } catch {
        setError('Unable to load users right now. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [reloadKey]);

  useEffect(() => {
    if (location.state?.notice) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setNotice(null);
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`,
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(user.id);
      await deleteUser(user.id);
      setUsers((currentUsers) => currentUsers.filter((currentUser) => currentUser.id !== user.id));
      setNotice({
        type: 'success',
        message: `${user.firstName} ${user.lastName} was deleted successfully.`,
      });
    } catch {
      setNotice({
        type: 'error',
        message: 'Delete failed. Please try again.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="page-enter space-y-6">
      <div className="panel overflow-hidden">
        <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
              Users List
            </p>
            <h1 className="mt-3 text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Manage every user from one clean dashboard.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              This page fetches users with <span className="font-semibold text-slate-900">useEffect</span>,
              stores them in <span className="font-semibold text-slate-900">useState</span>, and keeps local
              add, edit, and delete actions in sync after every redirect.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/add-user"
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Add New User
              </Link>
              <button
                type="button"
                onClick={() => setReloadKey((currentKey) => currentKey + 1)}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Refresh List
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[24px] bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Total Users</p>
              <p className="mt-3 text-4xl font-black">{users.length}</p>
              <p className="mt-2 text-sm text-slate-300">Live list merged with local CRUD actions.</p>
            </div>
            <div className="rounded-[24px] border border-teal-100 bg-teal-50 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-700">Routes</p>
              <p className="mt-3 text-lg font-bold text-slate-950">/, /add-user, /edit-user/:id</p>
              <p className="mt-2 text-sm text-slate-600">Responsive table on desktop and cards on mobile.</p>
            </div>
          </div>
        </div>
      </div>

      {notice && (
        <div className={`rounded-2xl border px-5 py-4 text-sm font-medium ${NOTICE_STYLES[notice.type] ?? NOTICE_STYLES.success}`}>
          {notice.message}
        </div>
      )}

      {loading && (
        <div className="panel flex min-h-[320px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />
            <p className="mt-4 text-lg font-semibold text-slate-900">Loading users...</p>
            <p className="mt-2 text-sm text-slate-500">Fetching records from DummyJSON.</p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="panel px-6 py-10 text-center">
          <p className="text-lg font-semibold text-slate-900">{error}</p>
          <button
            type="button"
            onClick={() => setReloadKey((currentKey) => currentKey + 1)}
            className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="panel px-6 py-12 text-center">
          <p className="text-2xl font-bold text-slate-950">No users found.</p>
          <p className="mt-3 text-slate-600">Create the first user to populate the dashboard.</p>
          <Link
            to="/add-user"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Add New User
          </Link>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <>
          <div className="hidden overflow-hidden lg:block">
            <div className="panel overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200/80">
                <thead className="bg-slate-950 text-left text-sm uppercase tracking-[0.18em] text-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">First Name</th>
                    <th className="px-6 py-4 font-semibold">Last Name</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70 bg-white/80">
                  {users.map((user) => (
                    <tr key={user.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-5 text-sm font-semibold text-slate-900">{user.firstName}</td>
                      <td className="px-6 py-5 text-sm font-semibold text-slate-900">{user.lastName}</td>
                      <td className="px-6 py-5 text-sm text-slate-600">{user.email}</td>
                      <td className="px-6 py-5 text-sm text-slate-600">{user.phone}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/edit-user/${user.id}`}
                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            disabled={deletingId === user.id}
                            onClick={() => handleDelete(user)}
                            className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
                          >
                            {deletingId === user.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-4 lg:hidden">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isDeleting={deletingId === user.id}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Users;
