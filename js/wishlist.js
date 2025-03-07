/**
 * Medicare+ Wishlist Functionality
 * Handles wishlist operations including adding, removing, and checking items
 */

// Initialize wishlist from localStorage or create empty wishlist
let wishlist = JSON.parse(localStorage.getItem('medicareWishlist')) || [];

/**
 * Save wishlist to localStorage
 */
function saveWishlist() {
    localStorage.setItem('medicareWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
}

/**
 * Add a product to the wishlist
 * @param {Object} product - The product to add
 * @returns {boolean} - Success status
 */
function addToWishlist(product) {
    if (!product || !product.id) {
        console.error('Invalid product');
        return false;
    }
    
    // Check if product already exists in wishlist
    const existingItemIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
        // Product already in wishlist
        return false;
    } else {
        // Add new product to wishlist
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.currentPrice,
            currency: product.currency,
            image: product.image,
            stock: product.stock || 'In Stock'
        });
    }
    
    saveWishlist();
    return true;
}

/**
 * Remove a product from the wishlist
 * @param {string} productId - ID of the product to remove
 * @returns {boolean} - Success status
 */
function removeFromWishlist(productId) {
    const initialLength = wishlist.length;
    wishlist = wishlist.filter(item => item.id !== productId);
    
    if (wishlist.length !== initialLength) {
        saveWishlist();
        return true;
    }
    return false;
}

/**
 * Check if a product is in the wishlist
 * @param {string} productId - ID of the product to check
 * @returns {boolean} - True if product is in wishlist
 */
function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

/**
 * Get the number of items in the wishlist
 * @returns {number} - Number of items
 */
function getWishlistItemCount() {
    return wishlist.length;
}

/**
 * Update the wishlist count displayed in the header
 */
function updateWishlistCount() {
    const count = getWishlistItemCount();
    const wishlistCountElements = document.querySelectorAll('.wishlist-count');
    
    wishlistCountElements.forEach(element => {
        element.textContent = count;
        
        // Show/hide count based on whether wishlist has items
        if (count > 0) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    });
}

/**
 * Clear all items from the wishlist
 */
function clearWishlist() {
    wishlist = [];
    saveWishlist();
}

/**
 * Get all items in the wishlist
 * @returns {Array} - Wishlist items
 */
function getWishlistItems() {
    return [...wishlist];
}

// Initialize wishlist count when page loads
document.addEventListener('DOMContentLoaded', updateWishlistCount);
