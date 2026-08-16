
## ✨ Features

- **Premium Dark Theme** with gold accents
- **Fully Responsive** — works on all devices
- **Animated Loading Screen** with logo reveal
- **Scroll Animations** using AOS library
- **Parallax Floating Elements** in hero section
- **Animated Counters** for stats
- **Sticky Navigation** with scroll effect
- **Live Search** functionality
- **Category Filtering** with smooth transitions
- **Product Sorting** (price, rating, name, featured)
- **Quick View Modal** for product details
- **Shopping Cart Drawer** with slide-in animation
- **LocalStorage Cart Persistence** — cart survives page refresh
- **Automated Checkout** via WhatsApp
- **Order Summary** generation
- **Toast Notifications** for user feedback
- **Cooperative Registration** form with WhatsApp integration
- **Back to Top** button
- **WhatsApp Float** button
- **Scroll Progress Bar**
- **Stock Management** display
- **Discount Badges** & percentage calculations
- **Free Shipping Threshold** indicator

## 🛒 How It Works

1. **Browse Products** — Filter by category or use search
2. **Quick View** — Click any product for details
3. **Add to Cart** — Cart saves automatically in browser
4. **Checkout** — Fill delivery details and confirm
5. **WhatsApp Order** — Order details auto-generate and open WhatsApp
6. **Store Owner** receives complete order via WhatsApp

## ⚙️ Configuration

### Update WhatsApp Number
In `js/products.js`, find `STORE_CONFIG`:

```javascript
const STORE_CONFIG = {
    whatsappNumber: "923000000000",  // ← Change this!
    // Format: Country code + number (no + or spaces)
    // Pakistan example: 923001234567
    ...
};