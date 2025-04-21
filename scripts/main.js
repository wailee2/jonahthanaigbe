document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    const searchCancel = document.querySelector('.search-cancel');
    const searchInput = document.querySelector('.search-input');

    // Scroll behavior for header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('hide');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('hide')) {
            // Scrolling down
            header.classList.add('hide');
        } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
            // Scrolling up
            header.classList.remove('hide');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    // Search functionality
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.add('active');
        searchInput.focus();
    });
    
    searchCancel.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    });

    // Search functionality
    searchIcon.addEventListener('click', () => {
        searchContainer.classList.add('active');
        searchInput.focus();
    });
    
    searchCancel.addEventListener('click', () => {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    });

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const paginationContainer = document.getElementById('pagination');
const filterBtns = document.querySelectorAll('.filter-btn');
const filterOptions = document.querySelectorAll('.filter-options');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Check for search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    
    if (searchTerm) {
        document.getElementById('search-input').value = searchTerm;
        filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    renderProducts();
    renderPagination();
});



// Render products for current page
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        paginationContainer.innerHTML = '';
        return;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-type">${product.type.charAt(0).toUpperCase() + product.type.slice(1)}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
        
        productCard.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                window.location.href = `product-detail.html?id=${product.id}`;
            }
        });
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Render pagination controls
function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" id="prev-page">
            <i class="fas fa-chevron-left"></i> Previous
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `;
    }
    
    // Next button
    paginationHTML += `
        <button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" id="next-page">
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add event listeners
    document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.getAttribute('data-page'));
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    document.getElementById('prev-page')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    document.getElementById('next-page')?.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}
});



/*
// Common functionality for all pages

// Sample product data (shared between pages)
const products = [
    // ... same product data as before ...
];

// Cart functionality
let cart = [];

// DOM Elements
const header = document.getElementById('main-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const searchIcon = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-container');
const searchCancel = document.querySelector('.search-cancel');
const searchInput = document.getElementById('search-input');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cart-modal');
const overlay = document.getElementById('overlay');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const whatsappOrder = document.getElementById('whatsapp-order');

// Scroll behavior for header
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hide');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
        // Scrolling down
        header.classList.add('hide');
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
        // Scrolling up
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
});

// Search functionality
searchIcon.addEventListener('click', () => {
    searchContainer.classList.add('active');
    searchInput.focus();
});

searchCancel.addEventListener('click', () => {
    searchContainer.classList.remove('active');
    searchInput.value = '';
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Redirect to products page with search query
            window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
});

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showAddToCartFeedback();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showAddToCartFeedback() {
    const feedback = document.createElement('div');
    feedback.textContent = 'Added to cart!';
    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.right = '20px';
    feedback.style.backgroundColor = '#333';
    feedback.style.color = 'white';
    feedback.style.padding = '10px 20px';
    feedback.style.borderRadius = '5px';
    feedback.style.zIndex = '1000';
    feedback.style.animation = 'fadeInOut 2s ease-in-out';
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)} (${item.quantity}x)</p>
                <p class="cart-item-remove" data-id="${item.id}">Remove</p>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `$${calculateTotal().toFixed(2)}`;
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Cart icon click
cartIcon.addEventListener('click', () => {
    cartModal.classList.add('open');
    overlay.classList.add('active');
    renderCartItems();
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
});

// WhatsApp order
whatsappOrder?.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    let message = "Hello, I'd like to place an order for the following artworks:\n\n";
    
    cart.forEach(item => {
        message += `- ${item.title} ($${item.price.toFixed(2)})\n`;
    });
    
    message += `\nTotal: $${calculateTotal().toFixed(2)}\n\nPlease let me know about payment and delivery options.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
});

// Load cart from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    
    // Gallery auto-scroll (for index.html)
    if (document.getElementById('gallery-scroll')) {
        startGalleryAutoScroll();
    }
});

// Gallery auto-scroll functions
let galleryAutoScroll;

function startGalleryAutoScroll() {
    const galleryScroll = document.getElementById('gallery-scroll');
    let scrollPosition = 0;
    const scrollWidth = galleryScroll.scrollWidth - galleryScroll.clientWidth;
    
    galleryAutoScroll = setInterval(() => {
        scrollPosition += 1;
        
        if (scrollPosition >= scrollWidth) {
            scrollPosition = 0;
            galleryScroll.scrollTo({
                left: 0,
                behavior: 'instant'
            });
        } else {
            galleryScroll.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, 30);
}

function pauseGalleryAutoScroll() {
    clearInterval(galleryAutoScroll);
}

const galleryScroll = document.getElementById('gallery-scroll');
if (galleryScroll) {
    galleryScroll.addEventListener('mouseenter', pauseGalleryAutoScroll);
    galleryScroll.addEventListener('mouseleave', startGalleryAutoScroll);
    galleryScroll.addEventListener('touchstart', pauseGalleryAutoScroll);
    galleryScroll.addEventListener('touchend', startGalleryAutoScroll);
}*/