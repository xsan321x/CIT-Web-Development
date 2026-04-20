/**
 * Project 2: Product Inventory App
 */

const API_URL = 'https://fakestoreapi.com/products';
const productGrid = document.getElementById('productGrid');
const loader = document.getElementById('loader');
const productForm = document.getElementById('productForm');
const productModal = document.getElementById('productModal');
const categoryFilter = document.getElementById('categoryFilter');

let inventory = [];

async function loadInventory() {
    showLoader(true);
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API Connection Failed");
        
        inventory = await res.json();
        renderGallery(inventory);
    } catch (err) {
        console.error("Error loading products:", err);
        alert("Failed to sync inventory. Please check your connection.");
    } finally {
        showLoader(false);
    }
}

function renderGallery(products) {
    if (products.length === 0) {
        productGrid.innerHTML = `
            <div class="col-span-full py-20 text-center">
                <p class="text-slate-400 font-medium">No products found in this category.</p>
            </div>`;
        return;
    }

    productGrid.innerHTML = products.map(item => {

        const isCheap = item.price < 20;
        
        const shortDesc = item.description.length > 100 
            ? item.description.substring(0, 100) + "..." 
            : item.description;

        return `
            <div class="product-card bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all duration-500 group flex flex-col h-full shadow-sm hover:shadow-xl">
                <div class="relative h-64 bg-white p-8 flex items-center justify-center overflow-hidden">
                    <img src="${item.image}" alt="${item.title}" class="h-full object-contain group-hover:scale-110 transition-transform duration-500">
                    ${isCheap ? '<span class="absolute top-4 left-4 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">HOT PRICE</span>' : ''}
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">${item.category}</span>
                    <h3 class="font-bold text-slate-800 mt-2 line-clamp-2 leading-tight h-10">${item.title}</h3>
                    
                    <p class="text-xs text-slate-500 mt-3 leading-relaxed flex-grow">
                        ${shortDesc}
                    </p>
                    
                    <div class="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span class="text-xl font-black ${isCheap ? 'text-emerald-600' : 'text-slate-800'}">
                            $${parseFloat(item.price).toFixed(2)}
                        </span>
                        <div class="flex gap-2">
                            <button onclick="prepareEdit(${item.id})" class="h-9 w-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center">
                                <i class="fas fa-edit text-sm"></i>
                            </button>
                            <button onclick="handleDelete(${item.id})" class="h-9 w-9 rounded-lg bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center">
                                <i class="fas fa-trash text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('productId').value;
    const productData = {
        title: document.getElementById('pTitle').value,
        price: parseFloat(document.getElementById('pPrice').value),
        description: document.getElementById('pDesc').value,
        image: document.getElementById('pImage').value,
        category: document.getElementById('pCategory').value
    };

    try {
        if (id) {
            if (parseInt(id) <= 20) {
                await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(productData)
                });
            }
            inventory = inventory.map(p => p.id == id ? { ...p, ...productData } : p);
            alert("Changes saved to gallery!");
        } else {
            await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify(productData)
            });
            const newProduct = { ...productData, id: Date.now() };
            inventory.unshift(newProduct);
            alert("New product added to inventory!");
        }

        renderGallery(inventory);
        toggleModal();
    } catch (error) {
        console.error("Save Error:", error);
        alert("Operation failed. Check console for details.");
    }
});


async function handleDelete(id) {
    if (!confirm("Are you sure you want to remove this product?")) return;

    try {
        if (parseInt(id) <= 20) {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        }
        inventory = inventory.filter(p => p.id != id);
        renderGallery(inventory);
    } catch (err) {
        console.error("Delete Error:", err);
    }
}

categoryFilter.addEventListener('change', (e) => {
    const selected = e.target.value;
    const filtered = selected ? inventory.filter(p => p.category === selected) : inventory;
    renderGallery(filtered);
});

function toggleModal() {
    productModal.classList.toggle('hidden');
    if (productModal.classList.contains('hidden')) {
        productForm.reset();
        document.getElementById('productId').value = '';
        document.getElementById('modalTitle').innerText = 'Product Details';
    }
}

function prepareEdit(id) {
    const product = inventory.find(item => item.id == id);
    if (!product) return;

    document.getElementById('productId').value = product.id;
    document.getElementById('pTitle').value = product.title;
    document.getElementById('pPrice').value = product.price;
    document.getElementById('pCategory').value = product.category;
    document.getElementById('pImage').value = product.image;
    document.getElementById('pDesc').value = product.description;
    
    document.getElementById('modalTitle').innerText = 'Update Inventory Item';
    toggleModal();
}

function showLoader(isLoading) {
    loader.classList.toggle('hidden', !isLoading);
    productGrid.classList.toggle('hidden', isLoading);
}

loadInventory();