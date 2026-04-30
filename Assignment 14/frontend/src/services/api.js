// API base URL - uses relative paths in production, or environment variable in dev
const API_URL = typeof __API_URL__ !== 'undefined' && __API_URL__ ? __API_URL__ : '';

// Helper — must be defined FIRST before any function that uses it
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const getUrl = (path) => {
  if (API_URL) return `${API_URL}${path}`;
  return path;
};

export const registerUser = async (name, email, password) => {
  const response = await fetch(getUrl('/auth/register'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(getUrl('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const getProducts = async () => {
  const response = await fetch(getUrl('/api/products?limit=100'));
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch products');
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(getUrl(`/api/products/${id}`));
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch product');
  return data;
};

export const addProduct = async (productData) => {
  const response = await fetch(getUrl('/api/products'), {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(productData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to add product');
  return data;
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(getUrl(`/api/products/${id}`), {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(productData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update product');
  return data;
};

export const deleteProduct = async (id) => {
  const response = await fetch(getUrl(`/api/products/${id}`), {
    method: 'DELETE',
    headers: getHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete product');
  return data;
};

export const getUsers = async () => {
  const response = await fetch(getUrl('/api/users'), { headers: getHeaders() });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
  return data;
};

export const updateUserById = async (id, userData) => {
  const response = await fetch(getUrl(`/api/users/${id}`), {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update user');
  return data;
};

export const deleteUserById = async (id) => {
  const response = await fetch(getUrl(`/api/users/${id}`), {
    method: 'DELETE',
    headers: getHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete user');
  return data;
};
