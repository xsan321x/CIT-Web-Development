import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { createUser } from '../utils/userStore';

function AddUser() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      setError('');
      await createUser(formData);
      navigate('/', {
        state: {
          notice: {
            type: 'success',
            message: `${formData.firstName} ${formData.lastName} was added successfully.`,
          },
        },
      });
    } catch {
      setError('Unable to add this user right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-enter mx-auto max-w-5xl">
      <div className="panel overflow-hidden">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-slate-950 px-8 py-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Add User</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Create a new user record.</h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              This form uses controlled inputs with <span className="font-semibold text-white">useState</span>,
              posts data to the DummyJSON add endpoint, and sends you back to the list with the new user visible.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Required fields</p>
                <p className="mt-2 text-lg font-semibold">First name, last name, email, and phone</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">After submit</p>
                <p className="mt-2 text-lg font-semibold">Redirects to the users list with updated UI</p>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-8 sm:px-8 lg:px-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">Form</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Add New User</h2>
              <p className="mt-3 text-slate-600">Fill in the form below to create a fresh user entry.</p>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-medium text-rose-800">
                {error}
              </div>
            )}

            <UserForm
              key="add-user-form"
              initialData={{}}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/')}
              isLoading={isSubmitting}
              submitButtonText="Add User"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddUser;
