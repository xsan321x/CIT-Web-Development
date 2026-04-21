import { Link } from 'react-router-dom';

const getInitials = (firstName, lastName) =>
  `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.trim().toUpperCase() || 'U';

function UserCard({ user, isDeleting, onDelete }) {
  return (
    <article className="panel p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-base font-bold text-white shadow-lg shadow-cyan-500/20">
          {getInitials(user.firstName, user.lastName)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-slate-500">User ID #{user.id}</p>
            </div>

            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              User
            </span>
          </div>

          <dl className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email</dt>
              <dd className="mt-1 break-all font-medium text-slate-700">{user.email}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Phone</dt>
              <dd className="mt-1 font-medium text-slate-700">{user.phone}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to={`/edit-user/${user.id}`}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Edit
            </Link>
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => onDelete(user)}
              className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default UserCard;
