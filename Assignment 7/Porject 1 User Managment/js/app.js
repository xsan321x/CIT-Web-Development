/**
 * Project 1: User Management System
 */

const API_URL = 'https://dummyjson.com/users';
const userTableBody = document.getElementById('userTableBody');
const userTable = document.getElementById('userTable');
const loader = document.getElementById('loader');
const userCount = document.getElementById('userCount');
const userForm = document.getElementById('userForm');
const userModal = document.getElementById('userModal');
const searchInput = document.getElementById('searchInput');

let allUsers = [];


async function fetchAllUsers() {
    showLoader(true);
    try {
        const response = await fetch(`${API_URL}?limit=0`);
        const data = await response.json();
        allUsers = data.users;
        renderTable(allUsers);
    } catch (error) {
        console.error("Fetch Error:", error);
    } finally {
        showLoader(false);
    }
}

function renderTable(users) {
    userCount.innerText = users.length;
    
    if (users.length === 0) {
        userTableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-10 text-center text-slate-400">No users found.</td></tr>`;
        return;
    }

    userTableBody.innerHTML = users.map(user => `
        <tr class="hover:bg-slate-50 transition-colors group border-b border-slate-100">
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                        ${user.firstName[0]}${user.lastName[0]}
                    </div>
                    <div>
                        <div class="font-semibold text-slate-900">${user.firstName} ${user.lastName}</div>
                        <div class="text-[10px] text-slate-400 uppercase font-bold tracking-widest">ID: #${user.id}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-sm text-slate-600">
                <div>${user.email}</div>
                <div class="text-xs text-slate-400">${user.phone}</div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Active</span>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                    <button onclick="editUser(${user.id})" class="p-2 text-slate-400 hover:text-indigo-600 transition"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteUser(${user.id})" class="p-2 text-slate-400 hover:text-red-600 transition"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('userId').value;
    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
    };

    try {
        if (id) {

            if (parseInt(id) <= 208) {
                await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
            }
            
            allUsers = allUsers.map(u => u.id == id ? { ...u, ...userData } : u);
            alert("User updated!");
        } else {

            const res = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const newUser = await res.json();
            

            allUsers.unshift(newUser);
            alert("User added!");
        }

        renderTable(allUsers);
        toggleModal();
    } catch (error) {
        console.error("Save Error:", error);
    }
});

async function deleteUser(id) {
    if (!confirm("Remove this user?")) return;

    try {
        if (parseInt(id) <= 208) {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        }
        
        allUsers = allUsers.filter(u => u.id != id);
        renderTable(allUsers);
    } catch (error) {
        console.error("Delete Error:", error);
    }
}

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allUsers.filter(u => 
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(term) || 
        u.email.toLowerCase().includes(term)
    );
    renderTable(filtered);
});

function toggleModal() {
    userModal.classList.toggle('hidden');
    if (userModal.classList.contains('hidden')) {
        userForm.reset();
        document.getElementById('userId').value = '';
        document.getElementById('modalTitle').innerText = 'Add New User';
    }
}

function editUser(id) {
    const user = allUsers.find(u => u.id == id);
    if (!user) return;

    document.getElementById('userId').value = user.id;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
    
    document.getElementById('modalTitle').innerText = 'Edit User Profile';
    toggleModal();
}

function showLoader(isLoading) {
    loader.classList.toggle('hidden', !isLoading);
    userTable.classList.toggle('hidden', isLoading);
}

fetchAllUsers();