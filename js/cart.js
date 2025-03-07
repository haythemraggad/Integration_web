/**
 * Medicare+ Shopping Cart Functionality
 * Handles cart operations including adding, removing, updating quantities,
 * and calculating totals
 */

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('medicareCart')) || [];

/**
 * Save cart to localStorage
 */
function saveCart() {
    localStorage.setItem('medicareCart', JSON.stringify(cart));
    updateCartCount();
}

/**
 * Add a product to the cart
 * @param {Object} product - The product to add
 * @param {number} quantity - Quantity to add
 * @returns {boolean} - Success status
 */
function addToCart(product, quantity) {
    if (!product || !product.id) {
        console.error('Invalid product');
        return false;
    }
    
    quantity = parseInt(quantity) || 1;
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new product to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.currentPrice,
            currency: product.currency,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    return true;
}

/**
 * Remove a product from the cart
 * @param {string} productId - ID of the product to remove
 * @returns {boolean} - Success status
 */
function removeFromCart(productId) {
    const initialLength = cart.length;
    cart = cart.filter(item => item.id !== productId);
    
    if (cart.length !== initialLength) {
        saveCart();
        return true;
    }
    return false;
}

/**
 * Update the quantity of a product in the cart
 * @param {string} productId - ID of the product to update
 * @param {number} quantity - New quantity
 * @returns {boolean} - Success status
 */
function updateCartItemQuantity(productId, quantity) {
    quantity = parseInt(quantity);
    
    if (isNaN(quantity) || quantity < 1) {
        return false;
    }
    
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex >= 0) {
        cart[itemIndex].quantity = quantity;
        saveCart();
        return true;
    }
    
    return false;
}

/**
 * Calculate the total price of all items in the cart
 * @returns {number} - Total price
 */
function calculateCartTotal() {
    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

/**
 * Get the number of items in the cart
 * @returns {number} - Number of items
 */
function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Update the cart count displayed in the header
 */
function updateCartCount() {
    const count = getCartItemCount();
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        
        // Show/hide count based on whether cart has items
        if (count > 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}

/**
 * Clear all items from the cart
 */
function clearCart() {
    cart = [];
    saveCart();
}

/**
 * Get all items in the cart
 * @returns {Array} - Cart items
 */
function getCartItems() {
    return [...cart];
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', updateCartCount);
