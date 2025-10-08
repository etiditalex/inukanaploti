// Gallery page specific functionality
let galleryData = [];

// DOM elements
const galleryGrid = document.getElementById('gallery-grid');

// Initialize gallery page
document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryPage();
});

function initializeGalleryPage() {
    loadGalleryData();
}

// Load gallery data from listings
async function loadGalleryData() {
    try {
        const response = await fetch('data/listings.json');
        const listings = await response.json();
        
        // Extract all images from listings
        galleryData = [];
        listings.forEach(listing => {
            listing.images.forEach((image, index) => {
                galleryData.push({
                    id: `${listing.id}-${index}`,
                    src: image,
                    alt: `${listing.title} - Image ${index + 1}`,
                    title: listing.title,
                    location: listing.location,
                    price: listing.priceKES,
                    size: listing.sizeAcres,
                    listingId: listing.id,
                    isMainImage: index === 0
                });
            });
        });
        
        renderGallery();
    } catch (error) {
        console.error('Error loading gallery data:', error);
        showGalleryError();
    }
}

// Render gallery grid
function renderGallery() {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = galleryData.map(item => `
        <div class="gallery-item" data-item-id="${item.id}">
            <div class="gallery-item-image">
                <img src="${item.src}" alt="${item.alt}" class="gallery-item-img" loading="lazy">
                <div class="gallery-item-overlay">
                    <div class="gallery-item-info">
                        <h3 class="gallery-item-title">${item.title}</h3>
                        <p class="gallery-item-location">${item.location}</p>
                        <div class="gallery-item-details">
                            <span class="gallery-item-price">${formatPrice(item.price)}</span>
                            <span class="gallery-item-size">${item.size} acres</span>
                        </div>
                    </div>
                    <div class="gallery-item-actions">
                        <a href="/listings/${item.listingId}.html" class="btn btn-primary btn-sm">
                            View Property
                        </a>
                        <button class="btn btn-outline btn-sm gallery-zoom-btn" data-image="${item.src}" data-title="${item.title}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for zoom functionality
    setupGalleryInteractions();
}

// Setup gallery interactions
function setupGalleryInteractions() {
    const zoomButtons = document.querySelectorAll('.gallery-zoom-btn');
    zoomButtons.forEach(button => {
        button.addEventListener('click', function() {
            const imageSrc = this.dataset.image;
            const imageTitle = this.dataset.title;
            openImageModal(imageSrc, imageTitle);
        });
    });
}

// Open image modal
function openImageModal(src, title) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-backdrop"></div>
        <div class="gallery-modal-content">
            <button class="gallery-modal-close" aria-label="Close modal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
            <div class="gallery-modal-image">
                <img src="${src}" alt="${title}" class="gallery-modal-img">
            </div>
            <div class="gallery-modal-info">
                <h3 class="gallery-modal-title">${title}</h3>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add close functionality
    const closeBtn = modal.querySelector('.gallery-modal-close');
    const backdrop = modal.querySelector('.gallery-modal-backdrop');
    
    const closeModal = () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Show gallery error
function showGalleryError() {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = `
        <div class="gallery-error">
            <div class="gallery-error-content">
                <svg class="gallery-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <h3 class="gallery-error-title">Unable to Load Gallery</h3>
                <p class="gallery-error-description">
                    We're having trouble loading the gallery. Please try refreshing the page or contact us for assistance.
                </p>
                <button class="btn btn-primary" onclick="location.reload()">
                    Refresh Page
                </button>
            </div>
        </div>
    `;
}

// Format price utility function
function formatPrice(price) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0,
    }).format(price);
}

// Add CSS for gallery page
const galleryStyles = `
/* Gallery Page Styles */
.gallery-hero {
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, rgba(45, 171, 225, 0.05) 0%, rgba(236, 28, 38, 0.05) 100%);
}

.gallery-hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.gallery-hero-title {
  font-size: 2.5rem;
  font-family: var(--font-montserrat);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 640px) {
  .gallery-hero-title {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .gallery-hero-title {
    font-size: 3.75rem;
  }
}

.gallery-hero-description {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--color-neutral-600);
  text-align: justify;
}

/* Gallery Section */
.gallery-section {
  padding: var(--spacing-3xl) 0;
}

.gallery-grid {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  }
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
}

.gallery-item-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.gallery-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-item-img {
  transform: scale(1.05);
}

.gallery-item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--spacing-lg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-item-overlay {
  opacity: 1;
}

.gallery-item-info {
  color: white;
  margin-bottom: var(--spacing-md);
}

.gallery-item-title {
  font-size: 1.25rem;
  font-family: var(--font-montserrat);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
}

.gallery-item-location {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: var(--spacing-sm);
}

.gallery-item-details {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.875rem;
  font-weight: 500;
}

.gallery-item-price {
  color: var(--color-primary);
}

.gallery-item-size {
  opacity: 0.9;
}

.gallery-item-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.gallery-zoom-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  min-width: auto;
}

.gallery-zoom-btn svg {
  width: 1rem;
  height: 1rem;
}

/* Gallery Modal */
.gallery-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.gallery-modal-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.gallery-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background-color: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.gallery-modal-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  z-index: 10;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.gallery-modal-close:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.gallery-modal-close svg {
  width: 1.25rem;
  height: 1.25rem;
}

.gallery-modal-image {
  max-height: 70vh;
  overflow: hidden;
}

.gallery-modal-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.gallery-modal-info {
  padding: var(--spacing-lg);
  text-align: center;
}

.gallery-modal-title {
  font-size: 1.5rem;
  font-family: var(--font-montserrat);
  font-weight: 600;
  color: var(--color-neutral-900);
}

/* Gallery Error */
.gallery-error {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) 0;
}

.gallery-error-content {
  text-align: center;
  max-width: 400px;
}

.gallery-error-icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-neutral-400);
  margin: 0 auto var(--spacing-lg);
}

.gallery-error-title {
  font-size: 1.5rem;
  font-family: var(--font-montserrat);
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-sm);
}

.gallery-error-description {
  color: var(--color-neutral-600);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}
`;

// Inject gallery styles
const styleSheet = document.createElement('style');
styleSheet.textContent = galleryStyles;
document.head.appendChild(styleSheet);
