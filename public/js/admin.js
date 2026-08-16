let adminSession = null;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        showDashboard(session.user);
    } else {
        showLogin();
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    const loginBtn = document.querySelector('#loginForm button[type="submit"]');

    loginBtn.disabled = true;
    loginBtn.innerText = 'Logging in...';
    errorEl.textContent = '';

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            errorEl.textContent = error.message;
            loginBtn.disabled = false;
            loginBtn.innerText = 'Login Securely';
            return;
        }

        showDashboard(data.user);
    } catch (err) {
        errorEl.textContent = "System Error: " + err.message;
        loginBtn.disabled = false;
        loginBtn.innerText = 'Login Securely';
    }
});

function showLogin() {
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('dashboard').style.display = 'none';
}

function showDashboard(user) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'flex';
    loadProducts();
    loadOrders();
}

function logout() {
    supabaseClient.auth.signOut();
    showLogin();
}

function switchTab(tab) {
    document.getElementById('productsSection').style.display = 'none';
    document.getElementById('ordersSection').style.display = 'none';
    document.getElementById(tab + 'Section').style.display = 'block';
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('pageTitle').innerText = tab === 'products' ? 'Manage Products' : 'Customer Orders';
}

// --- MODAL CONTROLS ---
function openAddModal() {
    document.getElementById('modalTitle').innerText = 'Add New Product';
    document.getElementById('saveProductBtn').innerText = 'Save Product';
    document.getElementById('addProductForm').reset();
    document.getElementById('editProductId').value = '';
    document.getElementById('productImage').required = true;
    document.getElementById('addProductModal').style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('addProductModal').style.display = 'none';
}

// --- PRODUCTS ---
async function loadProducts() {
    const { data, error } = await supabaseClient.from('products').select('*');
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(p => {
            tbody.innerHTML += `
                <tr>
                    <td><img src="${p.image || 'https://via.placeholder.com/50'}" alt="" style="width:50px; height:50px; object-fit:cover; border-radius:8px;"></td>
                    <td>${p.name || 'No Name'}</td>
                    <td>${p.categoryName || 'N/A'}</td>
                    <td>${(p.price || 0).toLocaleString()}</td>
                    <td>${p.stock || 0}</td>
                    <td>
                        <button class="edit-btn" onclick="editProduct(${p.id})" style="color: var(--color-gold); background: rgba(212, 175, 55, 0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; margin-right: 5px; cursor:pointer; border:none;">Edit</button>
                        <button class="delete-btn" onclick="deleteProduct(${p.id})" style="color: var(--color-danger); background: rgba(244, 67, 54, 0.1); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; cursor:pointer; border:none;">Delete</button>
                    </td>
                </tr>
            `;
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:40px; color:var(--color-text-muted);">No products found. Add your first product!</td></tr>';
    }
}

async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        await supabaseClient.from('products').delete().eq('id', id);
        loadProducts();
    }
}

async function editProduct(id) {
    const { data: p, error } = await supabaseClient.from('products').select('*').eq('id', id).single();
    if (p) {
        document.getElementById('modalTitle').innerText = 'Edit Product';
        document.getElementById('saveProductBtn').innerText = 'Update Product';
        document.getElementById('editProductId').value = p.id;
        document.getElementById('productName').value = p.name || '';
        document.getElementById('productCategory').value = p.category || '';
        document.getElementById('productCategoryName').value = p.categoryName || '';
        document.getElementById('productPrice').value = p.price || '';
        document.getElementById('productOriginalPrice').value = p.originalPrice || '';
        document.getElementById('productStock').value = p.stock || '';
        document.getElementById('productBadge').value = p.badge || '';
        document.getElementById('productFeatured').value = p.featured ? 'true' : 'false';
        document.getElementById('productDescription').value = p.description || '';
        document.getElementById('productImage').required = false; // Image not required when editing
        document.getElementById('addProductModal').style.display = 'flex';
    }
}

// --- ADD / UPDATE LOGIC ---
const addProductForm = document.getElementById('addProductForm');
const saveProductBtn = document.getElementById('saveProductBtn');

addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    saveProductBtn.disabled = true;
    saveProductBtn.innerText = 'Processing... Please wait';

    const editId = document.getElementById('editProductId').value;
    const imageFile = document.getElementById('productImage').files[0];

    // Validation: If adding new product, image is required
    if (!editId && !imageFile) {
        alert("Please select an image for the new product");
        saveProductBtn.disabled = false;
        saveProductBtn.innerText = 'Save Product';
        return;
    }

    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        categoryName: document.getElementById('productCategoryName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: parseFloat(document.getElementById('productOriginalPrice').value) || null,
        stock: parseInt(document.getElementById('productStock').value),
        badge: document.getElementById('productBadge').value || null,
        featured: document.getElementById('productFeatured').value === 'true',
        description: document.getElementById('productDescription').value,
        icon: "fa-box",
        rating: 5.0,
        reviews: 0
    };

    // If a new image was selected, upload it
    if (imageFile) {
        const fileName = `product_${Date.now()}.jpg`;
        const { data: uploadData, error: uploadError } = await supabaseClient
            .storage.from('product-images').upload(fileName, imageFile);

        if (uploadError) {
            alert("Error uploading image: " + uploadError.message);
            saveProductBtn.disabled = false;
            saveProductBtn.innerText = 'Save Product';
            return;
        }
        const { data: urlData } = supabaseClient.storage.from('product-images').getPublicUrl(fileName);
        productData.image = urlData.publicUrl;
    }

    if (editId) {
        // UPDATE EXISTING PRODUCT
        const { error } = await supabaseClient.from('products').update(productData).eq('id', editId);
        if (error) {
            alert("Error updating product: " + error.message);
        } else {
            alert("Product updated successfully!");
            closeProductModal();
            loadProducts();
        }
    } else {
        // INSERT NEW PRODUCT
        const { error } = await supabaseClient.from('products').insert([productData]);
        if (error) {
            alert("Error saving product: " + error.message);
        } else {
            alert("Product added successfully!");
            closeProductModal();
            loadProducts();
        }
    }

    saveProductBtn.disabled = false;
    if (editId) saveProductBtn.innerText = 'Update Product';
    else saveProductBtn.innerText = 'Save Product';
});

// --- ORDERS ---
async function loadOrders() {
    const { data, error } = await supabaseClient.from('orders').select('*').order('created_at', { ascending: false });
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    if (data && data.length > 0) {
        data.forEach(o => {
            tbody.innerHTML += `
                <tr>
                    <td>#${o.id}</td>
                    <td>${o.customer_name}</td>
                    <td>${o.customer_phone}</td>
                    <td>${o.customer_address}, ${o.customer_city}</td>
                    <td>${o.total_amount.toLocaleString()}</td>
                    <td>${o.order_items.length} items</td>
                </tr>
            `;
        });
    } else {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:40px; color:var(--color-text-muted);">No orders yet.</td></tr>';
    }
}