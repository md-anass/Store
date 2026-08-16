/* ============================================
   AL-MAKKAH CROCKERY & KITCHEN STORE
   Shopping Cart Management System
   ============================================ */

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    /* ---------- LocalStorage ---------- */
    loadCart() {
        try {
            const saved = localStorage.getItem('almakkah_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error loading cart:', e);
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('almakkah_cart', JSON.stringify(this.items));
        } catch (e) {
            console.error('Error saving cart:', e);
        }
    }

    /* ---------- Cart Operations ---------- */
    addItem(productId, quantity = 1) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return false;
        }

        if (product.stock <= 0) {
            showToast('Out of Stock', 'This product is currently unavailable', 'error');
            return false;
        }

        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            if (existingItem.quantity + quantity > product.stock) {
                showToast('Stock Limit', `Only ${product.stock} units available`, 'error');
                return false;
            }
            existingItem.quantity += quantity;
        } else {
            if (quantity > product.stock) {
                showToast('Stock Limit', `Only ${product.stock} units available`, 'error');
                return false;
            }
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                icon: product.icon,
                category: product.categoryName,
                stock: product.stock,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.bumpCartCount();

        showToast('Added to Cart', `${product.name} added successfully`, 'success');
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateQuantity(productId, newQty) {
        const item = this.items.find(i => i.id === productId);
        if (!item) return;

        if (newQty <= 0) {
            this.removeItem(productId);
            return;
        }

        if (newQty > item.stock) {
            showToast('Stock Limit', `Only ${item.stock} units available`, 'error');
            return;
        }

        item.quantity = newQty;
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    incrementQuantity(productId) {
        const item = this.items.find(i => i.id === productId);
        if (item) {
            this.updateQuantity(productId, item.quantity + 1);
        }
    }

    decrementQuantity(productId) {
        const item = this.items.find(i => i.id === productId);
        if (item) {
            this.updateQuantity(productId, item.quantity - 1);
        }
    }

    /* ---------- Calculations ---------- */
    getSubtotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getOriginalTotal() {
        return this.items.reduce((total, item) => {
            return total + ((item.originalPrice || item.price) * item.quantity);
        }, 0);
    }

    getSavings() {
        return this.getOriginalTotal() - this.getSubtotal();
    }

    getShipping() {
        const subtotal = this.getSubtotal();
        if (subtotal >= STORE_CONFIG.freeShippingThreshold || subtotal === 0) {
            return 0;
        }
        return STORE_CONFIG.shippingFee;
    }

    getTax() {
        return Math.round(this.getSubtotal() * STORE_CONFIG.taxRate);
    }

    getTotal() {
        return this.getSubtotal() + this.getShipping() + this.getTax();
    }

    getTotalItems() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    /* ---------- UI Updates ---------- */
    updateCartCount() {
        const countEl = document.getElementById('cartCount');
        const count = this.getTotalItems();

        if (count > 0) {
            countEl.textContent = count;
            countEl.classList.add('visible');
        } else {
            countEl.classList.remove('visible');
        }
    }

    bumpCartCount() {
        const countEl = document.getElementById('cartCount');
        countEl.classList.add('bump');
        setTimeout(() => countEl.classList.remove('bump'), 300);
    }

    /* ---------- Render Cart ---------- */
    renderCart() {
        const cartBody = document.getElementById('cartBody');
        const cartFooter = document.getElementById('cartFooter');

        if (this.items.length === 0) {
            cartBody.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-bag"></i>
                    <h3>Your cart is empty</h3>
                    <p>Browse our collection and add items to your cart</p>
                    <button class="btn btn-primary" onclick="closeCart(); document.getElementById('products').scrollIntoView({behavior:'smooth'});">
                        <span>Start Shopping</span>
                    </button>
                </div>
            `;
            cartFooter.innerHTML = '';
            return;
        }

        // Render cart items
        cartBody.innerHTML = this.items.map(item => {
            const itemTotal = item.price * item.quantity;
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        ${item.image
                    ? `<img src="${item.image}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div class=\\'cart-item-image-placeholder\\'><i class=\\'fas ${item.icon || 'fa-box'}\\'></i></div>'">`
                    : `<div class="cart-item-image-placeholder"><i class="fas ${item.icon || 'fa-box'}"></i></div>`
                }
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-category">${item.category}</div>
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${STORE_CONFIG.currencySymbol} ${item.price.toLocaleString()}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-qty">
                            <button onclick="cart.decrementQuantity(${item.id})" aria-label="Decrease">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button onclick="cart.incrementQuantity(${item.id})" aria-label="Increase">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <button class="cart-item-remove" onclick="cart.removeItem(${item.id})" aria-label="Remove">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Render cart footer with summary
        const subtotal = this.getSubtotal();
        const shipping = this.getShipping();
        const savings = this.getSavings();
        const total = this.getTotal();

        cartFooter.innerHTML = `
            <div class="cart-summary-row">
                <span>Subtotal (${this.getTotalItems()} items)</span>
                <span>${STORE_CONFIG.currencySymbol} ${subtotal.toLocaleString()}</span>
            </div>
            ${savings > 0 ? `
            <div class="cart-summary-row" style="color: var(--color-success);">
                <span>You Save</span>
                <span>-${STORE_CONFIG.currencySymbol} ${savings.toLocaleString()}</span>
            </div>
            ` : ''}
            <div class="cart-summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? '<strong style="color: var(--color-success);">FREE</strong>' : `${STORE_CONFIG.currencySymbol} ${shipping.toLocaleString()}`}</span>
            </div>
            ${shipping > 0 ? `
            <div class="cart-summary-row" style="font-size: 0.75rem; color: var(--color-text-dim);">
                <span>Add ${STORE_CONFIG.currencySymbol} ${(STORE_CONFIG.freeShippingThreshold - subtotal).toLocaleString()} more for free shipping</span>
                <span></span>
            </div>
            ` : ''}
            <div class="cart-summary-row total">
                <span>Total</span>
                <span>${STORE_CONFIG.currencySymbol} ${total.toLocaleString()}</span>
            </div>
            <button class="cart-checkout-btn" onclick="openCheckout()">
                <i class="fas fa-clipboard-check"></i>
                <span>Proceed to Checkout</span>
            </button>
            <button class="cart-continue" onclick="closeCart()">
                Continue Shopping
            </button>
        `;
    }

    /* ---------- Clear Cart ---------- */
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    /* ---------- Generate WhatsApp Order Message ---------- */
    generateOrderMessage(customerInfo) {
        let message = `🛒 *NEW ORDER - ${STORE_CONFIG.name}*\n`;
        message += `${'═'.repeat(40)}\n\n`;
        message += `👤 *Customer Details:*\n`;
        message += `   Name: ${customerInfo.name}\n`;
        message += `   Phone: ${customerInfo.phone}\n`;
        message += `   City: ${customerInfo.city}\n`;
        message += `   Address: ${customerInfo.address}\n`;
        if (customerInfo.notes) {
            message += `   Notes: ${customerInfo.notes}\n`;
        }
        message += `\n📦 *Order Items:*\n`;

        this.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            message += `   ${index + 1}. ${item.name}\n`;
            message += `      Qty: ${item.quantity} × ${STORE_CONFIG.currencySymbol} ${item.price.toLocaleString()}\n`;
            message += `      = ${STORE_CONFIG.currencySymbol} ${itemTotal.toLocaleString()}\n`;
        });

        message += `\n${'─'.repeat(40)}\n`;
        message += `💰 *Order Summary:*\n`;
        message += `   Subtotal: ${STORE_CONFIG.currencySymbol} ${this.getSubtotal().toLocaleString()}\n`;

        const savings = this.getSavings();
        if (savings > 0) {
            message += `   Discount Saved: -${STORE_CONFIG.currencySymbol} ${savings.toLocaleString()}\n`;
        }

        const shipping = this.getShipping();
        message += `   Shipping: ${shipping === 0 ? 'FREE' : `${STORE_CONFIG.currencySymbol} ${shipping.toLocaleString()}`}\n`;
        message += `   *Total: ${STORE_CONFIG.currencySymbol} ${this.getTotal().toLocaleString()}*\n`;
        message += `${'═'.repeat(40)}\n\n`;
        message += `📅 Order Date: ${new Date().toLocaleString('en-PK')}\n`;
        message += `🔑 Order ID: ALM-${Date.now().toString().slice(-6)}\n\n`;
        message += `Please confirm my order. Thank you! 🙏`;

        return encodeURIComponent(message);
    }

    /* ---------- Send Order via WhatsApp & Save to Supabase ---------- */
    async sendOrder(customerInfo) {
        // 1. Save the order to Supabase Database (if configured)
        if (typeof supabaseClient !== 'undefined' && supabaseClient) {
            try {
                const { error } = await supabaseClient
                    .from('orders')
                    .insert([
                        {
                            customer_name: customerInfo.name,
                            customer_phone: customerInfo.phone,
                            customer_address: customerInfo.address,
                            customer_city: customerInfo.city,
                            order_notes: customerInfo.notes,
                            total_amount: this.getTotal(),
                            order_items: this.items // Saves the cart array as JSON
                        }
                    ]);

                if (error) {
                    console.error("Supabase Error:", error);
                    showToast("Database Error", "Could not save order to database, but proceeding to WhatsApp.", "error");
                } else {
                    console.log("Order saved to Supabase successfully!");
                }
            } catch (err) {
                console.error("Error connecting to Supabase:", err);
            }
        }

        // 2. Generate WhatsApp Message and Open Chat
        const message = this.generateOrderMessage(customerInfo);
        const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }
}

/* Initialize Cart */
const cart = new ShoppingCart();