// Blog page functionality
let blogPosts = [];

// DOM elements
const blogGrid = document.getElementById('blog-grid');
const blogNewsletterForm = document.getElementById('blog-newsletter-form');

// Initialize blog page
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogPage();
});

function initializeBlogPage() {
    loadBlogPosts();
    setupNewsletterForm();
}

// Blog posts data
function getBlogPostsData() {
    return [
        {
            id: 'coastal-land-investment-2025',
            title: 'Why Coastal Land in Kenya is a Smart Investment in 2025',
            slug: 'coastal-land-investment-2025',
            category: 'Investment Tips',
            excerpt: 'Discover why coastal properties in Kilifi, Watamu, and Malindi are becoming the hottest investment opportunities in Kenya. Learn about ROI potential, tourism growth, and infrastructure development.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696813/Inuka_na_ploti_4_c9jcj4.jpg',
            date: 'January 25, 2025',
            readTime: '6 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'title-deeds-guide',
            title: 'Understanding Title Deeds in Kenya: A Complete Guide',
            slug: 'title-deeds-guide',
            category: 'Legal Guides',
            excerpt: 'Everything you need to know about title deeds in Kenya - types, verification process, transfer procedures, and how to protect yourself from fraud. Essential reading for all land buyers.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696810/Inuka_na_ploti_22_hvpnid.jpg',
            date: 'January 22, 2025',
            readTime: '10 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'flexible-payment-plans',
            title: '5 Benefits of Flexible Payment Plans for Land Buyers',
            slug: 'flexible-payment-plans',
            category: 'Financing',
            excerpt: 'Learn how flexible payment plans make land ownership accessible. Discover the advantages of 0% interest installments, lower deposits, and how to choose the right payment plan for your budget.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696809/Inuka_na_ploti_7_imlokv.jpg',
            date: 'January 20, 2025',
            readTime: '5 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'bofa-area-spotlight',
            title: 'Bofa Area Spotlight: Why Land Prices Are Rising Fast',
            slug: 'bofa-area-spotlight',
            category: 'Market Trends',
            excerpt: 'Explore why Bofa has become the hottest land investment location in Kilifi. Infrastructure developments, beach proximity, and investment potential analyzed.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_3_lynzhw.jpg',
            date: 'January 18, 2025',
            readTime: '7 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'land-buying-mistakes',
            title: '7 Common Mistakes to Avoid When Buying Land in Kenya',
            slug: 'land-buying-mistakes',
            category: 'Buyer Tips',
            excerpt: 'Protect your investment by avoiding these common pitfalls. From skipping due diligence to ignoring access roads, learn what NOT to do when purchasing land.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696806/Inuka_na_ploti_17_wonzwy.jpg',
            date: 'January 15, 2025',
            readTime: '8 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'airbnb-investment-guide',
            title: 'How to Build a Profitable Airbnb on Your Coastal Plot',
            slug: 'airbnb-investment-guide',
            category: 'Investment Tips',
            excerpt: 'Turn your coastal land into a profitable Airbnb business. Complete guide covering construction costs, design tips, licensing, and revenue potential in Kenya\'s coastal region.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858195/Chumani_Beach_view_3_4_o5viok.jpg',
            date: 'January 12, 2025',
            readTime: '12 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'land-valuation-factors',
            title: 'What Determines Land Value in Kenya? 10 Key Factors',
            slug: 'land-valuation-factors',
            category: 'Market Trends',
            excerpt: 'Understand what makes land valuable. From location and accessibility to infrastructure and zoning, learn the factors that affect property prices in Kenya.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696805/Inuka_na_ploti_15_yyna4g.jpg',
            date: 'January 10, 2025',
            readTime: '9 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'site-visit-checklist',
            title: 'The Ultimate Site Visit Checklist for Land Buyers',
            slug: 'site-visit-checklist',
            category: 'Buyer Tips',
            excerpt: 'Don\'t skip the site visit! Use this comprehensive checklist to inspect your land properly. Covers terrain, boundaries, access, utilities, and more.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696804/Inuka_na_ploti_14_qawfdz.jpg',
            date: 'January 8, 2025',
            readTime: '6 min read',
            author: 'Inuka na Ploti Team'
        },
        {
            id: 'beach-land-vs-inland',
            title: 'Beach Land vs Inland Property: Which is Better for You?',
            slug: 'beach-land-vs-inland',
            category: 'Comparison',
            excerpt: 'Compare the pros and cons of beachfront versus inland properties. Investment potential, costs, maintenance, and lifestyle factors analyzed.',
            image: 'https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696803/Inuka_na_ploti_13_hvpoqk.jpg',
            date: 'January 5, 2025',
            readTime: '7 min read',
            author: 'Inuka na Ploti Team'
        }
    ];
}

// Load and render blog posts
function loadBlogPosts() {
    blogPosts = getBlogPostsData();
    renderBlogPosts();
}

// Render blog posts grid
function renderBlogPosts() {
    if (!blogGrid) return;
    
    blogGrid.innerHTML = blogPosts.map(post => `
        <article class="blog-card">
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}" class="blog-card-img">
                <span class="blog-card-category">${post.category}</span>
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-card-date">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.875rem; height: 0.875rem; margin-right: 0.25rem;">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${post.date}
                    </span>
                    <span class="blog-card-read-time">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.875rem; height: 0.875rem; margin-right: 0.25rem;">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        ${post.readTime}
                    </span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                    <div class="blog-card-author">
                        <img src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1758705419/inukanaploti_logo_v7btur.jpg" alt="${post.author}" class="blog-card-author-img">
                        <span class="blog-card-author-name">${post.author}</span>
                    </div>
                    <a href="blog-ultimate-guide-buying-land-kenya.html" class="blog-card-link">
                        Read More
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 0.875rem; height: 0.875rem; margin-left: 0.25rem;">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `).join('');
}

// Setup newsletter form
function setupNewsletterForm() {
    if (!blogNewsletterForm) return;
    
    blogNewsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(blogNewsletterForm);
        const email = formData.get('email');
        
        if (!email) {
            showToast('Please enter a valid email address.');
            return;
        }
        
        // Simulate newsletter subscription
        showToast('Thank you for subscribing to our newsletter!', 'success');
        blogNewsletterForm.reset();
    });
}

// Show toast notification (reusing from script.js)
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2dabe1',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '9999',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '300px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

