import { useState } from 'react';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const FIELD_CONFIG = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter first name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter last name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email address',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: 'Enter phone number',
  },
];

const trimFormData = (formData) => ({
  firstName: formData.firstName.trim(),
  lastName: formData.lastName.trim(),
  email: formData.email.trim(),
  phone: formData.phone.trim(),
});

const validateField = (name, value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 'This field is required.';
  }

  if (name === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedValue)) {
      return 'Enter a valid email address.';
    }
  }

  if (name === 'phone') {
    const phonePattern = /^[\d\s+()-]{7,}$/;

    if (!phonePattern.test(trimmedValue)) {
      return 'Enter a valid phone number.';
    }
  }

  return '';
};

const getInitialFormState = (initialData) => ({
  firstName: initialData.firstName ?? '',
  lastName: initialData.lastName ?? '',
  email: initialData.email ?? '',
  phone: initialData.phone ?? '',
});

function UserForm({
  initialData = EMPTY_FORM,
  onSubmit,
  onCancel,
  isLoading = false,
  submitButtonText = 'Save User',
}) {
  const [formData, setFormData] = useState(getInitialFormState(initialData));
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = FIELD_CONFIG.reduce((collectedErrors, field) => {
      const fieldError = validateField(field.name, formData[field.name]);

      if (fieldError) {
        collectedErrors[field.name] = fieldError;
      }

      return collectedErrors;
    }, {});

    setErrors(nextErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    });

    if (Object.keys(nextErrors).length === 0) {
      onSubmit(trimFormData(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELD_CONFIG.map((field) => {
          const fieldError = touched[field.name] ? errors[field.name] : '';

          return (
            <div key={field.name} className={field.name === 'email' || field.name === 'phone' ? 'sm:col-span-2' : ''}>
              <label htmlFor={field.name} className="field-label">
                {field.label} <span className="text-rose-500">*</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                className={`field-input ${fieldError ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100' : ''}`}
              />
              <p className={`mt-2 text-sm ${fieldError ? 'text-rose-600' : 'text-slate-400'}`}>
                {fieldError || ' '}
              </p>
            </div>
          );
        })}
      </div>

      <div className="panel-muted flex flex-col gap-2 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">Form checklist</p>
        <p>Use all four fields before submitting so the table and cards stay complete.</p>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
        >
          {isLoading ? 'Saving...' : submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
