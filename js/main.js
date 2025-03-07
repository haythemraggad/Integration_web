// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality could be added here
    
    // Product add to cart functionality
    const addButtons = document.querySelectorAll('.product-card button');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product-card');
            const productName = product.querySelector('h3').textContent;
            
            // Show a small notification when product is added
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50';
            notification.textContent = `${productName} added to cart!`;
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });
    
    // Search functionality
    const searchForm = document.querySelector('input[placeholder="Search products..."]')?.parentElement;
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value;
            
            if (searchTerm.trim() !== '') {
                // In a real application, this would trigger a search
                alert(`Searching for: ${searchTerm}`);
            }
        });
    }

    // Add wishlist functionality to product cards
    setupWishlistButtons();
});

/**
 * Setup wishlist buttons on product cards
 */
function setupWishlistButtons() {
    // Find all wishlist buttons
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        const productId = button.dataset.productId;
        
        // Set initial state based on whether product is in wishlist
        if (typeof isInWishlist === 'function' && productId) {
            updateWishlistButtonState(button, isInWishlist(productId));
        }
        
        // Add click event listener
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productId = this.dataset.productId;
            const productName = productCard.querySelector('h3')?.textContent || 'Product';
            const productPrice = parseFloat(productCard.querySelector('.product-price')?.dataset?.price || 0);
            const productCurrency = productCard.querySelector('.product-price')?.dataset?.currency || 'TND';
            const productImage = productCard.querySelector('img')?.src || '';
            
            const product = {
                id: productId,
                name: productName,
                currentPrice: productPrice,
                currency: productCurrency,
                image: productImage,
                stock: 'In Stock'
            };
            
            if (typeof isInWishlist === 'function' && typeof addToWishlist === 'function' && 
                typeof removeFromWishlist === 'function') {
                
                if (isInWishlist(productId)) {
                    // Remove from wishlist
                    if (removeFromWishlist(productId)) {
                        updateWishlistButtonState(this, false);
                        showNotification(`${productName} removed from wishlist!`);
                    }
                } else {
                    // Add to wishlist
                    if (addToWishlist(product)) {
                        updateWishlistButtonState(this, true);
                        showNotification(`${productName} added to wishlist!`);
                    }
                }
            }
        });
    });
}

/**
 * Update wishlist button appearance based on state
 * @param {HTMLElement} button - The wishlist button element
 * @param {boolean} inWishlist - Whether the product is in the wishlist
 */
function updateWishlistButtonState(button, inWishlist) {
    if (inWishlist) {
        button.classList.add('active');
        button.querySelector('i').classList.add('text-red-500');
    } else {
        button.classList.remove('active');
        button.querySelector('i').classList.remove('text-red-500');
    }
}

/**
 * Show notification message
 * @param {string} message - Message to display
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
