import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUser, updateUser } from '../utils/userStore';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setLoadError('');
        const fetchedUser = await getUser(id);

        if (!fetchedUser) {
          setLoadError('The requested user could not be found.');
          setUser(null);
          return;
        }

        setUser(fetchedUser);
      } catch {
        setLoadError('Unable to load this user right now. Please try again.');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, reloadKey]);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError('');
      await updateUser(id, formData);
      navigate('/', {
        state: {
          notice: {
            type: 'success',
            message: `${formData.firstName} ${formData.lastName} was updated successfully.`,
          },
        },
      });
    } catch {
      setSubmitError('Unable to update this user right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="page-enter panel flex min-h-[420px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500" />
          <p className="mt-4 text-lg font-semibold text-slate-900">Loading user details...</p>
          <p className="mt-2 text-sm text-slate-500">Fetching the selected record for editing.</p>
        </div>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className="page-enter panel mx-auto max-w-3xl px-6 py-12 text-center sm:px-10">
        <p className="text-2xl font-bold text-slate-950">{loadError}</p>
        <p className="mt-3 text-slate-600">You can retry the request or head back to the users list.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setReloadKey((currentKey) => currentKey + 1)}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
          >
            Back to Users
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-enter mx-auto max-w-5xl">
      <div className="panel overflow-hidden">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 px-8 py-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Edit User</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              This page uses <span className="font-semibold text-white">useParams</span> to read the user ID,
              fetches the current record with <span className="font-semibold text-white">useEffect</span>, and
              updates the data with a PUT request before redirecting back to the dashboard.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current email</p>
                <p className="mt-2 break-all text-lg font-semibold">{user.email}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Current phone</p>
                <p className="mt-2 text-lg font-semibold">{user.phone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-8 sm:px-8 lg:px-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Form</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Edit User</h2>
              <p className="mt-3 text-slate-600">Update the fields below and save the changes.</p>
            </div>

            {submitError && (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-800">
                {submitError}
              </div>
            )}

            <UserForm
              key={user.id}
              initialData={user}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/')}
              isLoading={isSubmitting}
              submitButtonText="Update User"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditUser;
