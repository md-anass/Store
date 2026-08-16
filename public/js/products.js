/* ============================================
   AL-MAKKAH CROCKERY & KITCHEN STORE
   Product Database
   ============================================
   Instructions: To add/remove products, simply
   edit the PRODUCTS array below.
   ============================================ */

const PRODUCTS = [
    // ==================== CROCKERY ====================
    {
        id: 1,
        name: "Royal Porcelain Dinner Set",
        category: "crockery",
        categoryName: "Crockery",
        price: 6500,
        originalPrice: 8500,
        image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=600&h=600&fit=crop&q=80",
        icon: "fa-utensils",
        rating: 4.9,
        reviews: 127,
        stock: 15,
        badge: "Best Seller",
        featured: true,
        description: "Elegant 24-piece porcelain dinner set with intricate gold rim design. Perfect for formal dining and special occasions. Dishwasher and microwave safe."
    },
    {
        id: 2,
        name: "Ceramic Soup Bowls Set of 4",
        category: "crockery",
        categoryName: "Crockery",
        price: 1800,
        originalPrice: 2200,
        image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&h=600&fit=crop&q=80",
        icon: "fa-bowl-rice",
        rating: 4.7,
        reviews: 89,
        stock: 32,
        badge: null,
        featured: false,
        description: "Set of 4 premium ceramic soup bowls with smooth glaze finish. Deep design perfect for soups, stews, and noodles. Heat retention technology keeps food warm longer."
    },
    {
        id: 3,
        name: "Bone China Tea Cups Set",
        category: "crockery",
        categoryName: "Crockery",
        price: 3200,
        originalPrice: 4000,
        image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600&h=600&fit=crop&q=80",
        icon: "fa-mug-hot",
        rating: 4.8,
        reviews: 64,
        stock: 20,
        badge: "New",
        featured: true,
        description: "Exquisite bone china tea cups with delicate floral pattern. Set includes 6 cups with matching saucers. Lightweight yet durable, perfect for afternoon tea."
    },
    {
        id: 4,
        name: "Elegant Side Plates Set of 6",
        category: "crockery",
        categoryName: "Crockery",
        price: 1500,
        originalPrice: 1900,
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8070?w=600&h=600&fit=crop&q=80",
        icon: "fa-circle",
        rating: 4.6,
        reviews: 45,
        stock: 40,
        badge: null,
        featured: false,
        description: "Set of 6 stylish side plates in assorted colors. Perfect for snacks, desserts, and appetizers. Made from high-quality ceramic with scratch-resistant surface."
    },
    // (REMOVED Glass Tumbler Set of 8 here as an example of deleting a product)
    {
        id: 6,
        name: "Decorative Serving Platter",
        category: "crockery",
        categoryName: "Crockery",
        price: 2800,
        originalPrice: 3500,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop&q=80",
        icon: "fa-plate-wheat",
        rating: 4.8,
        reviews: 38,
        stock: 12,
        badge: "Sale",
        featured: true,
        description: "Large decorative serving platter with elegant marble pattern. Perfect for serving appetizers, fruits, and main courses. Adds a touch of sophistication to any table setting."
    },
    {
        id: 25, // NEW PRODUCT ADDED
        name: "Premium Glass Water Jug 2L",
        category: "crockery",
        categoryName: "Crockery",
        price: 1600,
        originalPrice: 2100,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop&q=80",
        icon: "fa-glass-water",
        rating: 4.7,
        reviews: 51,
        stock: 28,
        badge: "New",
        featured: false,
        description: "Elegant 2-liter glass water jug with sturdy handle and pour spout. Perfect for serving water, juices, and iced teas at dinners and gatherings."
    },

    // ==================== COOKWARE ====================
    {
        id: 7,
        name: "Non-Stick Frying Pan 28cm",
        category: "cookware",
        categoryName: "Cookware",
        price: 3500,
        originalPrice: 4500,
        image: "https://images.unsplash.com/photo-1584990347449-a8d5fc5e85ed?w=600&h=600&fit=crop&q=80",
        icon: "fa-fire-burner",
        rating: 4.7,
        reviews: 156,
        stock: 25,
        badge: "Best Seller",
        featured: true,
        description: "Premium non-stick frying pan with 3-layer coating. Heat-resistant handle, suitable for all stovetops including induction. 28cm diameter perfect for family cooking."
    },
    {
        id: 8,
        name: "Stainless Steel Pressure Cooker 5L",
        category: "cookware",
        categoryName: "Cookware",
        price: 5500,
        originalPrice: 7000,
        image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=600&fit=crop&q=80",
        icon: "fa-pressure-bottle",
        rating: 4.9,
        reviews: 203,
        stock: 18,
        badge: "Best Seller",
        featured: true,
        description: "5-liter stainless steel pressure cooker with safety valve and gasket release system. Cooks food 3x faster while retaining nutrients. Ideal for busy kitchens."
    },
    {
        id: 9,
        name: "Cast Iron Dutch Oven 4.5L",
        category: "cookware",
        categoryName: "Cookware",
        price: 7500,
        originalPrice: 9500,
        image: "https://images.unsplash.com/photo-1574781330855-d0db1cc1d1c8?w=600&h=600&fit=crop&q=80",
        icon: "fa-jar",
        rating: 4.9,
        reviews: 87,
        stock: 8,
        badge: "New",
        featured: true,
        description: "Pre-seasoned cast iron Dutch oven with enamel coating. Excellent heat retention and distribution. Perfect for slow cooking, baking, and stovetop-to-oven recipes."
    },
    {
        id: 10,
        name: "Stock Pot with Lid 8L",
        category: "cookware",
        categoryName: "Cookware",
        price: 4200,
        originalPrice: 5200,
        image: "https://images.unsplash.com/photo-1584990347449-a8d5fc5e85ed?w=600&h=600&fit=crop&q=80",
        icon: "fa-pot-food",
        rating: 4.6,
        reviews: 54,
        stock: 22,
        badge: null,
        featured: false,
        description: "8-liter stainless steel stock pot with tempered glass lid. Perfect for soups, stews, and large batch cooking. Riveted handles for secure grip."
    },
    {
        id: 11,
        name: "Granite Coating Wok 32cm",
        category: "cookware",
        categoryName: "Cookware",
        price: 3800,
        originalPrice: 4800,
        image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=600&fit=crop&q=80",
        icon: "fa-fire-burner",
        rating: 4.7,
        reviews: 91,
        stock: 14,
        badge: null,
        featured: false,
        description: "32cm wok with granite non-stick coating and wooden handle. Perfect for stir-frying, deep frying, and steaming. Works on all heat sources including induction."
    },
    {
        id: 26, // NEW PRODUCT ADDED
        name: "Ceramic Baking Dish Rectangular",
        category: "cookware",
        categoryName: "Cookware",
        price: 2500,
        originalPrice: 3000,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=600&fit=crop&q=80",
        icon: "fa-pizza-slice",
        rating: 4.8,
        reviews: 42,
        stock: 19,
        badge: null,
        featured: true,
        description: "High-quality ceramic baking dish perfect for lasagnas, casseroles, and roasting. Even heat distribution ensures perfectly cooked meals. Oven safe up to 250°C."
    },

    // ==================== PLASTIC & FIBRE ====================
    {
        id: 12,
        name: "Food Storage Container Set of 10",
        category: "plastic-fibre",
        categoryName: "Plastic & Fibre",
        price: 2200,
        originalPrice: 2800,
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=600&fit=crop&q=80",
        icon: "fa-box",
        rating: 4.6,
        reviews: 134,
        stock: 45,
        badge: "Best Seller",
        featured: true,
        description: "10-piece airtight food storage container set in various sizes. BPA-free plastic with leak-proof lids. Microwave, freezer, and dishwasher safe. Perfect for meal prep."
    },
    {
        id: 13,
        name: "Fibre Lunch Box 3 Compartment",
        category: "plastic-fibre",
        categoryName: "Plastic & Fibre",
        price: 950,
        originalPrice: 1200,
        image: "https://images.unsplash.com/photo-1604908554007-fe47c2ca58a9?w=600&h=600&fit=crop&q=80",
        icon: "fa-briefcase",
        rating: 4.5,
        reviews: 78,
        stock: 60,
        badge: null,
        featured: false,
        description: "3-compartment fibre lunch box with secure locking lid. Keeps food fresh and prevents mixing. Includes cutlery set. Ideal for office and school lunches."
    },
    {
        id: 14,
        name: "Insulated Water Bottles Set of 6",
        category: "plastic-fibre",
        categoryName: "Plastic & Fibre",
        price: 1800,
        originalPrice: 2400,
        image: "https://images.unsplash.com/photo-1602143402588-9b4f1c5c7d62?w=600&h=600&fit=crop&q=80",
        icon: "fa-bottle-water",
        rating: 4.7,
        reviews: 112,
        stock: 38,
        badge: "New",
        featured: true,
        description: "Set of 6 insulated water bottles with temperature retention. Keeps drinks cold for 24 hours and hot for 12 hours. BPA-free, leak-proof, and durable."
    },
    {
        id: 15,
        name: "Measuring Cups & Spoons Set",
        category: "plastic-fibre",
        categoryName: "Plastic & Fibre",
        price: 750,
        originalPrice: 950,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop&q=80",
        icon: "fa-ruler",
        rating: 4.4,
        reviews: 56,
        stock: 70,
        badge: null,
        featured: false,
        description: "Complete measuring set with 4 cups and 6 spoons. Clear measurement markings in both metric and imperial. BPA-free fibre material, dishwasher safe."
    },
    {
        id: 16,
        name: "Fibre Dinner Plates Set of 6",
        category: "plastic-fibre",
        categoryName: "Plastic & Fibre",
        price: 1400,
        originalPrice: 1800,
        image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&h=600&fit=crop&q=80",
        icon: "fa-circle",
        rating: 4.5,
        reviews: 43,
        stock: 35,
        badge: null,
        featured: false,
        description: "Set of 6 unbreakable fibre dinner plates. Lightweight, durable, and chip-resistant. Perfect for outdoor dining, picnics, and everyday use. BPA-free."
    },

    // ==================== PIPE FITTINGS ====================
    {
        id: 17,
        name: "PVC Pipe Fitting Kit 20-Piece",
        category: "pipe-fittings",
        categoryName: "Pipe Fittings",
        price: 1500,
        originalPrice: 1900,
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=600&fit=crop&q=80",
        icon: "fa-wrench",
        rating: 4.6,
        reviews: 67,
        stock: 28,
        badge: "Best Seller",
        featured: true,
        description: "Complete 20-piece PVC pipe fitting kit includes elbows, tees, couplings, and adapters. High-quality, durable PVC construction. Suitable for water supply and drainage."
    },
    {
        id: 18,
        name: "Brass Valve Set 4-Piece",
        category: "pipe-fittings",
        categoryName: "Pipe Fittings",
        price: 2800,
        originalPrice: 3500,
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=600&fit=crop&q=80",
        icon: "fa-faucet",
        rating: 4.8,
        reviews: 34,
        stock: 16,
        badge: "New",
        featured: true,
        description: "Set of 4 premium brass valves in various sizes. Corrosion-resistant, lead-free brass construction. Smooth operation with tight seal. Ideal for water and gas lines."
    },
    {
        id: 19,
        name: "CPVC Elbow Fittings Pack of 10",
        category: "pipe-fittings",
        categoryName: "Pipe Fittings",
        price: 650,
        originalPrice: 850,
        image: "https://images.unsplash.com/photo-1504328345609-7f81f3c7e35d?w=600&h=600&fit=crop&q=80",
        icon: "fa-arrow-turn-down",
        rating: 4.4,
        reviews: 29,
        stock: 80,
        badge: null,
        featured: false,
        description: "Pack of 10 CPVC elbow fittings for hot and cold water applications. Heat-resistant up to 93°C. Easy to install with solvent cement. Meets industry standards."
    },
    {
        id: 20,
        name: "Threaded Pipe Connectors Set",
        category: "pipe-fittings",
        categoryName: "Pipe Fittings",
        price: 950,
        originalPrice: 1200,
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=600&fit=crop&q=80",
        icon: "fa-link",
        rating: 4.5,
        reviews: 41,
        stock: 50,
        badge: null,
        featured: false,
        description: "Set of threaded pipe connectors in multiple sizes. Galvanized steel construction for maximum durability. Rust-resistant coating. Perfect for plumbing repairs and installations."
    },

    // ==================== KITCHEN TOOLS ====================
    {
        id: 21,
        name: "Stainless Steel Cutlery Set 24-Piece",
        category: "kitchen-tools",
        categoryName: "Kitchen Tools",
        price: 3500,
        originalPrice: 4500,
        image: "https://images.unsplash.com/photo-1593618996571-6269051f6a64?w=600&h=600&fit=crop&q=80",
        icon: "fa-utensils",
        rating: 4.8,
        reviews: 145,
        stock: 30,
        badge: "Best Seller",
        featured: true,
        description: "24-piece stainless steel cutlery set for 6 people. Includes dinner forks, knives, spoons, and teaspoons. Premium 18/10 stainless steel with mirror finish. Dishwasher safe."
    },
    {
        id: 22,
        name: "Professional Chef's Knife Set 5-Piece",
        category: "kitchen-tools",
        categoryName: "Kitchen Tools",
        price: 5500,
        originalPrice: 7000,
        image: "https://images.unsplash.com/photo-1593618996571-6269051f6a64?w=600&h=600&fit=crop&q=80",
        icon: "fa-knife-kitchen",
        rating: 4.9,
        reviews: 98,
        stock: 12,
        badge: "Best Seller",
        featured: true,
        description: "5-piece professional knife set with ergonomic handles. Includes chef's knife, santoku, utility, paring, and bread knife. High-carbon stainless steel blades with precision edge."
    },
    {
        id: 23,
        name: "Wooden Spatula Collection 6-Piece",
        category: "kitchen-tools",
        categoryName: "Kitchen Tools",
        price: 1200,
        originalPrice: 1500,
        image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop&q=80",
        icon: "fa-spoon",
        rating: 4.6,
        reviews: 62,
        stock: 42,
        badge: null,
        featured: false,
        description: "Set of 6 premium wooden cooking utensils. Includes spatula, slotted spoon, ladle, and more. Natural bamboo wood, gentle on cookware. Heat-resistant and durable."
    },
    {
        id: 24,
        name: "Digital Kitchen Scale 5kg",
        category: "kitchen-tools",
        categoryName: "Kitchen Tools",
        price: 1800,
        originalPrice: 2200,
        image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=600&fit=crop&q=80",
        icon: "fa-scale-balanced",
        rating: 4.7,
        reviews: 85,
        stock: 25,
        badge: "New",
        featured: true,
        description: "Precision digital kitchen scale with 5kg capacity. LCD display with tare function. Multiple unit conversion (g, kg, oz, lb). Compact design with tempered glass surface."
    }
];

/* ============================================
   CATEGORIES DATA
   ============================================ */
const CATEGORIES = [
    {
        id: "crockery",
        name: "Crockery",
        icon: "fa-plate-wheat",
        description: "Dinner sets, bowls, cups & more"
    },
    {
        id: "cookware",
        name: "Cookware",
        icon: "fa-fire-burner",
        description: "Pots, pans & pressure cookers"
    },
    {
        id: "plastic-fibre",
        name: "Plastic & Fibre",
        icon: "fa-box",
        description: "Containers, bottles & storage"
    },
    {
        id: "pipe-fittings",
        name: "Pipe Fittings",
        icon: "fa-faucet",
        description: "Valves, pipes & connectors"
    },
    {
        id: "kitchen-tools",
        name: "Kitchen Tools",
        icon: "fa-utensils",
        description: "Cutlery, knives & utensils"
    }
];

/* ============================================
   STORE CONFIGURATION
   ============================================ */
const STORE_CONFIG = {
    name: "AL-MAKKAH Crockery & Kitchen Store",
    Owner: "Toseeq Anwar",
    email: "[EMAIL_ADDRESS]",

    // ⚠️ IMPORTANT: Replace this with your actual WhatsApp number
    // Format: Country code + number (no +, spaces, or dashes)
    // Example: 0301456785 for Pakistan 03123456786
    whatsappNumber: "923028140670", // <-- UPDATED THIS LINE

    currency: "PKR",
    currencySymbol: "Rs.",
    freeShippingThreshold: 10000,
    shippingFee: 100,
    cooperativeDiscount: 0.10, // 10% additional for cooperatives
    taxRate: 0, // Set tax rate if applicable
};