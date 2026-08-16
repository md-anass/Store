/* ============================================
   AL-MAKKAH CROCKERY & KITCHEN STORE
   Main Application Logic
   ============================================ */

// ---------- Global State ----------
let currentFilter = 'all';
let currentSort = 'featured';
let searchQuery = '';

// ---------- DOM Ready ----------
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initAOS();
    initNavbar();
    initSearch();
    initCart();
    initModals();
    initScrollEffects();
    initParallax();
    initCounters();
    initNewsletter();
    initCoopForm();
    initWhatsAppLink();

    // Fetch products from Supabase (or fallback to hardcoded products.js)
    fetchProductsFromSupabase();

    cart.renderCart();
});

/* ============================================
   SUPABASE PRODUCT FETCHING
   ============================================ */
async function fetchProductsFromSupabase() {
    // Check if Supabase is configured
    if (typeof supabaseClient === 'undefined' || !supabaseClient) {
        console.log("Supabase not configured. Loading local products instead.");
        loadLocalProducts();
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('products')
            .select('*');

        if (error) {
            console.error("Supabase Error:", error);
            showToast("Database Error", "Could not load products from database. Loading local instead.", "error");
            loadLocalProducts();
            return;
        }

        if (data && data.length > 0) {
            // Overwrite the hardcoded PRODUCTS array with database data
            PRODUCTS.length = 0; // Clear existing array
            PRODUCTS.push(...data); // Push new data

            // Re-render the UI with the new data
            renderCategories();
            renderFeaturedProducts();
            renderProducts();
            console.log("Products successfully loaded from Supabase!");
        } else {
            console.log("No products found in Supabase. Loading local products.");
            loadLocalProducts();
        }
    } catch (err) {
        console.error("Error connecting to Supabase:", err);
        loadLocalProducts();
    }
}

function loadLocalProducts() {
    renderCategories();
    renderFeaturedProducts();
    renderProducts();
}

/* ============================================
   LOADER
   ============================================ */
function initLoader() {
    // We use a simple timeout instead of 'window.load' 
    // so the screen never gets stuck if an image is slow to load.
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500); // Hides after 1.5 seconds
}

/* ============================================
   AOS INITIALIZATION
   ============================================ */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: window.innerWidth < 480
        });
    }
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link based on scroll position
        updateActiveNavLink();
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ============================================
   SEARCH
   ============================================ */
function initSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 300);
        }
    });

    searchClose.addEventListener('click', () => {
        searchBar.classList.remove('active');
        searchInput.value = '';
        searchQuery = '';
        renderProducts();
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();

        if (searchQuery.length > 0) {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Close search on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchBar.classList.remove('active');
        }
    });
}

/* ============================================
   CART DRAWER
   ============================================ */
function initCart() {
    const cartToggle = document.getElementById('cartToggle');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');

    cartToggle.addEventListener('click', () => openCart());
    cartClose.addEventListener('click', () => closeCart());
    cartOverlay.addEventListener('click', () => closeCart());
}

function openCart() {
    document.getElementById('cartDrawer').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    cart.renderCart();
}

function closeCart() {
    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

/* ============================================
   MODALS
   ============================================ */
function initModals() {
    function handleCheckout(e) {
        e.preventDefault();

        // Save customer info temporarily
        window.checkoutCustomerInfo = {
            name: document.getElementById('checkoutName').value,
            phone: document.getElementById('checkoutPhone').value,
            address: document.getElementById('checkoutAddress').value,
            city: document.getElementById('checkoutCity').value,
            notes: document.getElementById('checkoutNotes').value
        };

        closeCheckout();
        openPaymentModal();
    }

    // Quick View Modal
    document.getElementById('quickViewClose').addEventListener('click', closeQuickView);
    document.getElementById('quickViewOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'quickViewOverlay') closeQuickView();
    });

    // Cooperative Modal
    document.getElementById('coopClose').addEventListener('click', () => {
        document.getElementById('coopOverlay').classList.remove('active');
        document.body.style.overflow = '';
    });
    document.getElementById('coopOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'coopOverlay') {
            document.getElementById('coopOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Escape key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCheckout();
            closeQuickView();
            document.getElementById('coopOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Checkout form submit
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

function openCheckout() {
    if (cart.items.length === 0) {
        showToast('Empty Cart', 'Add items to your cart first', 'error');
        return;
    }

    closeCart();
    renderCheckoutSummary();
    document.getElementById('checkoutOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    document.getElementById('checkoutOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function renderCheckoutSummary() {
    const summary = document.getElementById('checkoutSummary');

    let html = '<h4>Order Summary</h4>';

    cart.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <div class="summary-item">
                <span>${item.name} <span class="item-qty">× ${item.quantity}</span></span>
                <span>${STORE_CONFIG.currencySymbol} ${itemTotal.toLocaleString()}</span>
            </div>
        `;
    });

    const savings = cart.getSavings();
    if (savings > 0) {
        html += `<div class="summary-item" style="color: var(--color-success);">
            <span>Discount Saved</span>
            <span>-${STORE_CONFIG.currencySymbol} ${savings.toLocaleString()}</span>
        </div>`;
    }

    const shipping = cart.getShipping();
    html += `<div class="summary-item">
        <span>Shipping</span>
        <span>${shipping === 0 ? 'FREE' : `${STORE_CONFIG.currencySymbol} ${shipping.toLocaleString()}`}</span>
    </div>`;

    html += `<div class="cart-summary-row total">
        <span>Total</span>
        <span>${STORE_CONFIG.currencySymbol} ${cart.getTotal().toLocaleString()}</span>
    </div>`;

    summary.innerHTML = html;
}

function handleCheckout(e) {
    e.preventDefault();

    const customerInfo = {
        name: document.getElementById('checkoutName').value,
        phone: document.getElementById('checkoutPhone').value,
        address: document.getElementById('checkoutAddress').value,
        city: document.getElementById('checkoutCity').value,
        notes: document.getElementById('checkoutNotes').value
    };

    // Send order via WhatsApp (and save to Supabase inside cart.js)
    cart.sendOrder(customerInfo);

    // Show success toast
    showToast('Order Sent!', 'Your order has been forwarded via WhatsApp', 'success');

    // Close modal and clear cart after delay
    setTimeout(() => {
        closeCheckout();
        cart.clearCart();
        document.getElementById('checkoutForm').reset();
    }, 1500);
}

/* ============================================
   QUICK VIEW
   ============================================ */
function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    modal.innerHTML = `
        <button class="modal-close" id="quickViewClose"><i class="fas fa-times"></i></button>
        <div class="quick-view-content">
            <div class="qv-image">
                ${product.image
            ? `<img src="${product.image}" alt="${product.name}" onerror="this.parentElement.innerHTML='<div class=\\'qv-image-placeholder\\'><i class=\\'fas ${product.icon}\\'></i></div>'">`
            : `<div class="qv-image-placeholder"><i class="fas ${product.icon}"></i></div>`
        }
            </div>
            <div class="qv-info">
                <div class="qv-category">${product.categoryName}</div>
                <h2 class="qv-name">${product.name}</h2>
                <div class="qv-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
                <p class="qv-description">${product.description}</p>
                <div class="qv-price">
                    <span class="price-current">${STORE_CONFIG.currencySymbol} ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="price-original">${STORE_CONFIG.currencySymbol} ${product.originalPrice.toLocaleString()}</span>` : ''}
                    ${discount > 0 ? `<span class="product-discount" style="position:static;">-${discount}%</span>` : ''}
                </div>
                <div class="qv-stock">
                    <i class="fas fa-circle" style="font-size: 0.5rem;"></i>
                    ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </div>
                <div class="qv-actions">
                    <div class="qv-qty">
                        <button onclick="adjustQty(-1)"><i class="fas fa-minus"></i></button>
                        <span id="qvQty">1</span>
                        <button onclick="adjustQty(1)"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="qv-add-cart" onclick="addToCartFromQuickView(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-bag"></i>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Re-attach close button listener
    document.getElementById('quickViewClose').addEventListener('click', closeQuickView);

    // Store current product for qty
    window.currentQuickViewProduct = product;
    window.currentQuickViewQty = 1;

    document.getElementById('quickViewOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    document.getElementById('quickViewOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function adjustQty(delta) {
    const qtyEl = document.getElementById('qvQty');
    let qty = parseInt(qtyEl.textContent) + delta;
    const max = window.currentQuickViewProduct.stock;

    if (qty < 1) qty = 1;
    if (qty > max) {
        showToast('Stock Limit', `Only ${max} units available`, 'error');
        return;
    }

    qtyEl.textContent = qty;
    window.currentQuickViewQty = qty;
}

function addToCartFromQuickView(productId) {
    const qty = window.currentQuickViewQty || 1;
    if (cart.addItem(productId, qty)) {
        closeQuickView();
    }
}

/* ============================================
   COOPERATIVE FORM
   ============================================ */
function openCooperativeForm() {
    document.getElementById('coopOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initCoopForm() {
    document.getElementById('coopForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        let message = `🏛️ *COOPERATIVE REGISTRATION*\n`;
        message += `${'═'.repeat(40)}\n\n`;
        message += `Society: ${data[Object.keys(data)[0]]}\n`;
        message += `Contact Person: ${data[Object.keys(data)[1]]}\n`;
        message += `Phone: ${data[Object.keys(data)[2]]}\n`;
        message += `Members: ${data[Object.keys(data)[3]] || 'N/A'}\n`;
        message += `Products of Interest: ${data[Object.keys(data)[4]] || 'N/A'}\n`;
        message += `${'═'.repeat(40)}\n`;
        message += `Please provide cooperative pricing details.`;

        const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        showToast('Registration Sent!', 'We will contact you shortly', 'success');
        e.target.reset();

        setTimeout(() => {
            document.getElementById('coopOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }, 1500);
    });
}

/* ============================================
   RENDER: CATEGORIES
   ============================================ */
function renderCategories() {
    const grid = document.getElementById('categoryGrid');

    grid.innerHTML = CATEGORIES.map((cat, index) => {
        const count = PRODUCTS.filter(p => p.category === cat.id).length;
        return `
            <div class="category-card" data-aos="fade-up" data-aos-delay="${index * 80}"
                 onclick="filterProducts('${cat.id}')">
                <div class="category-icon">
                    <i class="fas ${cat.icon}"></i>
                </div>
                <h3>${cat.name}</h3>
                <p>${count} Products</p>
            </div>
        `;
    }).join('');
}

/* ============================================
   RENDER: FEATURED PRODUCTS
   ============================================ */
function renderFeaturedProducts() {
    const grid = document.getElementById('featuredGrid');
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 8);

    grid.innerHTML = featured.map((product, index) => {
        return createProductCard(product, index);
    }).join('');
}

/* ============================================
   RENDER: ALL PRODUCTS
   ============================================ */
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');

    let filtered = [...PRODUCTS];

    // Filter by category
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Filter by search
    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.categoryName.toLowerCase().includes(searchQuery)
        );
    }

    // Sort
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'featured':
        default:
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    grid.innerHTML = filtered.map((product, index) => {
        return createProductCard(product, index);
    }).join('');
}

/* ============================================
   CREATE PRODUCT CARD
   ============================================ */
function createProductCard(product, index) {
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const badgeClass = product.badge === 'Best Seller' ? 'badge-bestseller'
        : product.badge === 'New' ? 'badge-new'
            : product.badge === 'Sale' ? 'badge-sale'
                : '';

    const lowStock = product.stock <= 10 && product.stock > 0;

    return `
        <div class="product-card" data-aos="fade-up" data-aos-delay="${(index % 4) * 80}">
            <div class="product-image" onclick="openQuickView(${product.id})">
                ${product.image
            ? `<img src="${product.image}" alt="${product.name}" loading="lazy"
                        onerror="this.parentElement.innerHTML='<div class=\\'product-image-placeholder\\'><i class=\\'fas ${product.icon}\\'></i></div>'">`
            : `<div class="product-image-placeholder"><i class="fas ${product.icon}"></i></div>`
        }

                <div class="product-badges">
                    ${product.badge ? `<span class="product-badge ${badgeClass}">${product.badge}</span>` : ''}
                    ${lowStock ? `<span class="product-badge badge-low-stock">Low Stock</span>` : ''}
                </div>

                ${discount > 0 ? `<span class="product-discount">-${discount}%</span>` : ''}

                <div class="product-actions">
                    <button class="product-action-btn" onclick="openQuickView(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="product-action-btn" onclick="addToCart(${product.id})" title="Add to Cart" ${product.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-shopping-bag"></i>
                    </button>
                </div>
            </div>

            <div class="product-info">
                <div class="product-category">${product.categoryName}</div>
                <h3 class="product-name" onclick="openQuickView(${product.id})">${product.name}</h3>

                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>

                <div class="product-price">
                    <span class="price-current">${STORE_CONFIG.currencySymbol} ${product.price.toLocaleString()}</span>
                    ${product.originalPrice ? `<span class="price-original">${STORE_CONFIG.currencySymbol} ${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>

                <button class="product-add-cart" onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                    ${product.stock <= 0
            ? '<i class="fas fa-ban"></i> <span>Out of Stock</span>'
            : '<i class="fas fa-shopping-bag"></i> <span>Add to Cart</span>'
        }
                </button>
            </div>
        </div>
    `;
}

/* ============================================
   HELPER: Generate Stars
   ============================================ */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalf) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

/* ============================================
   ADD TO CART (from card)
   ============================================ */
function addToCart(productId) {
    cart.addItem(productId, 1);

    // Visual feedback on button
    const buttons = document.querySelectorAll(`.product-add-cart[onclick="addToCart(${productId})"]`);
    buttons.forEach(btn => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> <span>Added!</span>';
        btn.classList.add('added');

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('added');
        }, 1500);
    });
}

/* ============================================
   FILTER & SORT
   ============================================ */
function filterProducts(category) {
    currentFilter = category;

    // Update filter pills
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.filter === category);
    });

    // Close mobile menu if open
    document.getElementById('navMenu').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');

    renderProducts();

    // Scroll to products section
    setTimeout(() => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Initialize filter pills and sort
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            filterProducts(pill.dataset.filter);
        });
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });
});

/* ============================================
   SCROLL EFFECTS
   ============================================ */
function initScrollEffects() {
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Scroll progress bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        // Back to top button
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================
   PARALLAX
   ============================================ */
function initParallax() {
    const floatingElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        floatingElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

/* ============================================
   ANIMATED COUNTERS
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;

        const heroSection = document.getElementById('home');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (window.scrollY + window.innerHeight > heroBottom * 0.5) {
            animated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const update = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                update();
            });
        }
    };

    window.addEventListener('scroll', animateCounters);
    animateCounters();
}

/* ============================================
   NEWSLETTER
   ============================================ */
function initNewsletter() {
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input').value;

        showToast('Subscribed!', `Thank you for subscribing with ${email}`, 'success');
        e.target.reset();
    });
}

/* ============================================
   WHATSAPP FLOAT LINK
   ============================================ */
function initWhatsAppLink() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const message = encodeURIComponent(`Hello! I'm interested in your products at ${STORE_CONFIG.name}. Can you please help me?`);
    whatsappFloat.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showToast(title, message, type = 'default') {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-check'
        : type === 'error' ? 'fa-exclamation'
            : 'fa-bell';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}
/* ============================================
   PAYMENT MODAL LOGIC
   ============================================ */
let currentPaymentMethod = 'jazzcash';

// IMPORTANT: Put the owner's real account numbers here!
const paymentDetails = {
    jazzcash: { name: 'JazzCash', number: '0300-1234567', title: 'JazzCash Number', advance: true },
    easypaisa: { name: 'Easypaisa', number: '0345-1234567', title: 'Easypaisa Number', advance: true },
    bank: { name: 'Bank Transfer', number: 'PK36SCBL0000001123456702', title: 'Bank IBAN', advance: true },
    cod: { name: 'Cash on Delivery', number: 'Pay when rider delivers', title: 'Payment on Arrival', advance: false }
};

function openPaymentModal() {
    document.getElementById('paymentTotalAmount').innerText = `${STORE_CONFIG.currencySymbol} ${cart.getTotal().toLocaleString()}`;
    selectPaymentMethod('jazzcash', null); // Default to JazzCash
    document.getElementById('paymentOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function selectPaymentMethod(method, e) {
    currentPaymentMethod = method;
    const details = paymentDetails[method];

    // Update active button styling
    document.querySelectorAll('.pay-method-btn').forEach(btn => btn.classList.remove('active'));
    if (e) {
        e.target.classList.add('active');
    } else {
        // Fallback for initial load
        const firstBtn = document.querySelector('.pay-method-btn');
        if (firstBtn) firstBtn.classList.add('active');
    }

    // Update account details display
    document.getElementById('paymentAccounts').innerHTML = `
        <div class="account-box">
            <span>${details.title}</span>
            <strong>${details.number}</strong>
        </div>
    `;

    // Show/hide TID input and update delivery info
    const tidBox = document.getElementById('tidInputBox');
    const deliveryInfo = document.getElementById('deliveryInfo');

    if (details.advance) {
        // Advance Payment Logic
        tidBox.style.display = 'block';
        document.getElementById('transactionId').setAttribute('required', 'true');
        deliveryInfo.innerHTML = `<i class="fas fa-shipping-fast"></i> Send the amount via ${details.name}, enter the TID above, and your product will be delivered in 1-2 working days after payment verification.`;
    } else {
        // COD Logic
        tidBox.style.display = 'none';
        document.getElementById('transactionId').removeAttribute('required');
        document.getElementById('transactionId').value = 'N/A (COD)';
        deliveryInfo.innerHTML = `<i class="fas fa-truck"></i> Order now and pay in cash when the package arrives at your doorstep!`;
    }
}

// Handle final payment confirmation
document.addEventListener('DOMContentLoaded', () => {
    const paymentClose = document.getElementById('paymentClose');
    if (paymentClose) {
        paymentClose.addEventListener('click', () => {
            document.getElementById('paymentOverlay').classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    const confirmPaymentBtn = document.getElementById('confirmPaymentBtn');
    if (confirmPaymentBtn) {
        confirmPaymentBtn.addEventListener('click', async () => {
            const tid = document.getElementById('transactionId').value;
            const isAdvance = paymentDetails[currentPaymentMethod].advance;

            // If advance payment, TID is required
            if (isAdvance && (!tid || tid === '')) {
                alert('Please enter your Transaction ID (TID) to confirm the order.');
                return;
            }

            const paymentInfo = {
                method: paymentDetails[currentPaymentMethod].name,
                transactionId: isAdvance ? tid : 'Cash on Delivery',
                advance: isAdvance
            };

            // Disable button
            confirmPaymentBtn.disabled = true;
            confirmPaymentBtn.innerText = 'Processing...';

            // Send order via WhatsApp & Save to Supabase
            await cart.sendOrder(window.checkoutCustomerInfo, paymentInfo);

            showToast('Order Placed!', 'Your order has been forwarded via WhatsApp', 'success');

            // Reset everything
            setTimeout(() => {
                document.getElementById('paymentOverlay').classList.remove('active');
                document.body.style.overflow = '';
                cart.clearCart();
                document.getElementById('checkoutForm').reset();
                document.getElementById('transactionId').value = '';
                confirmPaymentBtn.disabled = false;
                confirmPaymentBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Confirm Order';
            }, 2000);
        });
    }
});