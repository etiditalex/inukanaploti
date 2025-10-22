// Global variables
let listingsData = [];
let currentYear = new Date().getFullYear();

// DOM elements
const header = document.getElementById('header');
const navMobile = document.getElementById('nav-mobile');
const navMobileToggle = document.querySelector('.nav-mobile-toggle');
const shareBtn = document.getElementById('share-btn');
const newsletterForm = document.getElementById('newsletter-form');
const currentYearElement = document.getElementById('current-year');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    setupScrollHeader();
    setupMobileNavigation();
    setupShareButton();
    setupNewsletterForm();
    setupCurrentYear();
    loadListings();
    setupAnimations();
}

// Setup scroll header effect
function setupScrollHeader() {
    let isScrolled = false;
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const shouldBeScrolled = scrollY > 20;
        
        if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            header.classList.toggle('scrolled', isScrolled);
        }
    }, { passive: true });
}

// Setup mobile navigation
function setupMobileNavigation() {
    if (!navMobileToggle || !navMobile) return;
    
    navMobileToggle.addEventListener('click', function() {
        navMobile.classList.toggle('open');
        
        // Update button icon
        const icon = navMobileToggle.querySelector('.nav-mobile-icon');
        if (navMobile.classList.contains('open')) {
            // Show X icon
            icon.innerHTML = `
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            `;
        } else {
            // Show hamburger icon
            icon.innerHTML = `
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            `;
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMobile.classList.contains('open') && 
            !navMobile.contains(event.target) && 
            !navMobileToggle.contains(event.target)) {
            navMobile.classList.remove('open');
            
            // Reset button icon
            const icon = navMobileToggle.querySelector('.nav-mobile-icon');
            icon.innerHTML = `
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            `;
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = navMobile.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('open');
            
            // Reset button icon
            const icon = navMobileToggle.querySelector('.nav-mobile-icon');
            icon.innerHTML = `
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            `;
        });
    });
}

// Setup share button
function setupShareButton() {
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', async function() {
        const shareData = {
            title: 'Inuka na Ploti - Premium Land Investments in Kenya',
            text: 'Discover premium land investments in Kenya with flexible payment plans, guaranteed title deeds, and prime locations.',
            url: window.location.href
        };
        
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            // Fallback: copy to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                showToast('Link copied to clipboard!');
            } catch (clipboardError) {
                console.error('Error copying to clipboard:', clipboardError);
                showToast('Unable to share. Please copy the URL manually.');
            }
        }
    });
}

// Setup newsletter form
function setupNewsletterForm() {
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(newsletterForm);
        const email = formData.get('email');
        
        if (!email) {
            showToast('Please enter a valid email address.');
            return;
        }
        
        try {
            // Here you would typically send the data to your server
            // For now, we'll just show a success message
            showToast('Thank you for subscribing!');
            newsletterForm.reset();
        } catch (error) {
            console.error('Error submitting newsletter:', error);
            showToast('Sorry, there was an error. Please try again.');
        }
    });
}

// Setup current year
function setupCurrentYear() {
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }
}

// Load listings data
async function loadListings() {
    try {
        // Use embedded data instead of fetch to avoid CORS issues
        listingsData = getListingsData();
        renderFeaturedListings();
    } catch (error) {
        console.error('Error loading listings:', error);
        showToast('Unable to load property listings.');
    }
}

// Embedded listings data to avoid CORS issues when opening files directly
function getListingsData() {
    return [
        {
            "id": "chumani-beach-view",
            "title": "Chumani Beach View - Oceanfront Investment",
            "slug": "chumani-beach-view",
            "priceKES": 650000,
            "sizeAcres": "1/8",
            "location": "Kilifi – Chumani Beach",
            "coords": {
                "lat": -3.4500,
                "lng": 39.8500
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858195/Chumani_Beach_view_3_4_o5viok.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_2_zfbnem.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_3_rlwbmb.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_6_bnzwti.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_7_kbriha.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_1_sttzkr.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758858194/Chumani_Beach_view_3_5_dkxhkl.jpg"
            ],
            "paymentPlan": {
                "depositKES": 250000,
                "months": 12
            },
            "features": [
                "Walking distance to beach",
                "White sandy beach access",
                "Chain link perimeter fences",
                "9m access roads",
                "Water & electricity available"
            ],
            "shortDescription": "Chumani Beach View plots - only 700m to white sandy beach! Perfect for holiday homes, Airbnb, and cottages with excellent infrastructure.",
            "longDescription": "Chumani Beach View plots offer an incredible opportunity to own land just 700m from a pristine white sandy beach. These 1/8 acre plots (50x100 sqft) are perfect for building holiday homes, Airbnb rentals, or cottages. The development includes chain link perimeter fences, beacons, 9m access roads, water, and electricity. Some plots are just 600m from the ocean, while others are 500m to Chumani Mavuneni Beach. With a deposit of Ksh 250,000 and the balance payable in 12 months interest-free, this is an excellent investment opportunity in a prime coastal location.",
            "amenities": [
                "Beach access",
                "Perimeter fencing",
                "Access roads",
                "Water supply",
                "Electricity connection"
            ]
        },
        {
            "id": "bofa-phase-20",
            "title": "Bofa Phase 20 - Premium Land Investment",
            "slug": "bofa-phase-20",
            "priceKES": 1950000,
            "sizeAcres": "1/8",
            "location": "Kilifi – Bofa Phase 20",
            "coords": {
                "lat": -3.5107,
                "lng": 39.9093
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_3_lynzhw.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797826/Bofa_phase_20_4_lxgg40.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_6_uv65ig.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_1_ywo92o.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758797825/Bofa_phase_20_2_b05ppv.jpg"
            ],
            "paymentPlan": {
                "depositKES": 500000,
                "months": 12
            },
            "features": [
                "Tarmacked roads",
                "Water & electricity",
                "Prime location",
                "Fast-selling opportunity",
                "Title deeds guaranteed"
            ],
            "shortDescription": "BOFA-WHERE DREAMS & INVESTMENTS MEET! Prime location with tarmacked roads, water & electricity. Land in Bofa is selling fast!",
            "longDescription": "Bofa has quickly become the top hotspot for smart investors and it's easy to see why! This prime location offers tarmacked roads for smooth access, water & electricity already in place, making it perfect for homes or rentals. Land in Bofa is selling fast, and this is your chance to secure your piece of paradise before prices rise!",
            "amenities": [
                "Tarmacked roads",
                "Water supply",
                "Electricity",
                "Security",
                "Easy access"
            ]
        },
        {
            "id": "bofa-phase-21",
            "title": "Bofa Phase 21 - Coastal Paradise",
            "slug": "bofa-phase-21",
            "priceKES": 1695000,
            "sizeAcres": "1/8",
            "location": "Kilifi – Bofa Phase 21",
            "coords": {
                "lat": -3.5107,
                "lng": 39.9093
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821399/Bofa_phase_21_6_y46ggc.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821399/Bofa_phase_21_5_uuf1yq.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821399/Bofa_phase_21_1_g34gck.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821400/Bofa_phase_21_8_qw4czx.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758821398/Bofa_phase_21_7_pmvxtt.jpg"
            ],
            "paymentPlan": {
                "depositKES": 500000,
                "months": 12
            },
            "features": [
                "Just 100m off B69 road",
                "1KM from Bofa Beach",
                "Coastal charm",
                "Serene location",
                "Flexible payment plans"
            ],
            "shortDescription": "Just 100m off the B69 road and only 1KM from the breathtaking Bofa Beach! A perfect blend of convenience, serenity, and coastal charm.",
            "longDescription": "Just 100m off the B69 road and only 1KM from the breathtaking Bofa Beach! A perfect blend of convenience, serenity, and coastal charm. Own your 1/8 acre plot today at a massively discounted all-inclusive price of KES 1.695M (down from 1.85M). Flexible payment plan options available! Don't miss out—secure your piece of paradise today!",
            "amenities": [
                "Road access",
                "Beach proximity",
                "Coastal location",
                "Serene environment",
                "Investment opportunity"
            ]
        },
        {
            "id": "kilifi-bofa-1",
            "title": "Prime Beachfront Plot - Bofa",
            "slug": "prime-beachfront-plot-bofa",
            "priceKES": 2500000,
            "sizeAcres": "1/8",
            "location": "Kilifi – Bofa",
            "coords": {
                "lat": -3.5107,
                "lng": 39.9093
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696813/Inuka_na_ploti_4_c9jcj4.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696810/Inuka_na_ploti_22_hvpnid.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696809/Inuka_na_ploti_7_imlokv.jpg"
            ],
            "paymentPlan": {
                "depositKES": 500000,
                "months": 24
            },
            "features": [
                "Near Beach",
                "Serviced",
                "Gated Community",
                "Title Deed Ready"
            ],
            "shortDescription": "Stunning beachfront plot with panoramic ocean views, perfect for your dream home or investment.",
            "longDescription": "This exceptional 1/8 acre beachfront plot in Bofa, Kilifi offers unparalleled ocean views and direct beach access. Located in a secure, gated community with full infrastructure including water, electricity, and paved roads. The property comes with a clear title deed and flexible payment plan. Perfect for building your dream home or as a lucrative investment opportunity.",
            "amenities": [
                "Beach Access",
                "Security",
                "Water Supply",
                "Electricity",
                "Paved Roads",
                "Nearby Schools",
                "Shopping Centers"
            ]
        },
        {
            "id": "mtwapa-hills-2",
            "title": "Hillside View Plot - Mtwapa",
            "slug": "hillside-view-plot-mtwapa",
            "priceKES": 1800000,
            "sizeAcres": "1/8",
            "location": "Mtwapa Hills",
            "coords": {
                "lat": -3.9333,
                "lng": 39.7500
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696806/Inuka_na_ploti_17_wonzwy.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696806/Inuka_na_ploti_23_h9lpfs.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696806/Inuka_na_ploti_3_o3knpc.jpg"
            ],
            "paymentPlan": {
                "depositKES": 360000,
                "months": 18
            },
            "features": [
                "Hillside Views",
                "Serviced",
                "Gated",
                "Title Deed Ready"
            ],
            "shortDescription": "Elevated plot with breathtaking hillside views, ideal for a peaceful residential development.",
            "longDescription": "This premium 1/8 acre plot in Mtwapa Hills offers stunning panoramic views of the surrounding landscape. The property is fully serviced with utilities and comes with a clear title deed. Located in a secure, gated community with excellent road access. Perfect for building a family home or investment property.",
            "amenities": [
                "Hillside Views",
                "Security",
                "Water Supply",
                "Electricity",
                "Good Road Access",
                "Nearby Amenities"
            ]
        },
        {
            "id": "vipingo-golf-3",
            "title": "Golf Course View Plot - Vipingo",
            "slug": "golf-course-view-plot-vipingo",
            "priceKES": 3200000,
            "sizeAcres": "1/4",
            "location": "Vipingo Ridge",
            "coords": {
                "lat": -3.7833,
                "lng": 39.8500
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696805/Inuka_na_ploti_15_yyna4g.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696804/Inuka_na_ploti_14_qawfdz.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696804/Inuka_na_ploti_12_fhfceq.jpg"
            ],
            "paymentPlan": {
                "depositKES": 640000,
                "months": 30
            },
            "features": [
                "Golf Course Views",
                "Luxury Development",
                "Serviced",
                "Title Deed Ready"
            ],
            "shortDescription": "Exclusive plot overlooking the prestigious Vipingo Ridge Golf Course, perfect for luxury development.",
            "longDescription": "This exceptional 1/4 acre plot offers stunning views of the Vipingo Ridge Golf Course and Indian Ocean. Located in one of Kenya's most prestigious developments, this property offers the ultimate in luxury living. The plot is fully serviced and comes with a clear title deed. Perfect for building a luxury home or high-end investment property.",
            "amenities": [
                "Golf Course Views",
                "Ocean Views",
                "Luxury Amenities",
                "Security",
                "Water Supply",
                "Electricity",
                "Paved Roads"
            ]
        },
        {
            "id": "malindi-north-4",
            "title": "Coastal Plot - Malindi North",
            "slug": "coastal-plot-malindi-north",
            "priceKES": 1500000,
            "sizeAcres": "1/8",
            "location": "Malindi North",
            "coords": {
                "lat": -3.2167,
                "lng": 40.1167
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696803/Inuka_na_ploti_13_hvpoqk.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696803/Inuka_na_ploti_11_xj6cx5.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696802/Inuka_na_ploti_25_jgkx1e.jpg"
            ],
            "paymentPlan": {
                "depositKES": 300000,
                "months": 20
            },
            "features": [
                "Coastal Location",
                "Serviced",
                "Gated",
                "Title Deed Ready"
            ],
            "shortDescription": "Beautiful coastal plot in Malindi North, perfect for a beachside retreat or investment.",
            "longDescription": "This charming 1/8 acre plot in Malindi North offers easy access to the beautiful beaches and vibrant coastal lifestyle. The property is fully serviced with all utilities and comes with a clear title deed. Located in a secure, gated community with excellent infrastructure. Perfect for building a beach house or vacation rental investment.",
            "amenities": [
                "Beach Access",
                "Coastal Views",
                "Security",
                "Water Supply",
                "Electricity",
                "Good Road Access"
            ]
        },
        {
            "id": "kilifi-town-5",
            "title": "Town Center Plot - Kilifi",
            "slug": "town-center-plot-kilifi",
            "priceKES": 1200000,
            "sizeAcres": "1/8",
            "location": "Kilifi Town Center",
            "coords": {
                "lat": -3.5107,
                "lng": 39.9093
            },
            "status": "sold",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696802/Inuka_na_ploti_8_uuunib.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696800/Inuka_na_ploti_9_o95o8d.jpg"
            ],
            "paymentPlan": {
                "depositKES": 240000,
                "months": 15
            },
            "features": [
                "Town Center",
                "Commercial Potential",
                "Serviced",
                "Title Deed Ready"
            ],
            "shortDescription": "Strategic town center plot with excellent commercial potential and easy access to amenities.",
            "longDescription": "This well-located 1/8 acre plot in Kilifi Town Center offers excellent commercial potential with high foot traffic and easy access to all town amenities. The property is fully serviced and comes with a clear title deed. Perfect for commercial development or mixed-use investment.",
            "amenities": [
                "Town Center Location",
                "High Foot Traffic",
                "Commercial Potential",
                "Water Supply",
                "Electricity",
                "Paved Roads"
            ]
        },
        {
            "id": "watamu-beach-6",
            "title": "Beachside Plot - Watamu",
            "slug": "beachside-plot-watamu",
            "priceKES": 2800000,
            "sizeAcres": "1/4",
            "location": "Watamu Beach",
            "coords": {
                "lat": -3.3667,
                "lng": 40.0167
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1758696801/Inuka_na_ploti_26_rudemo.jpg"
            ],
            "paymentPlan": {
                "depositKES": 560000,
                "months": 25
            },
            "features": [
                "Beachside Location",
                "Tourist Area",
                "Serviced",
                "Title Deed Ready"
            ],
            "shortDescription": "Premium beachside plot in Watamu, perfect for tourism-related development or luxury residence.",
            "longDescription": "This exceptional 1/4 acre beachside plot in Watamu offers direct beach access and is located in one of Kenya's most popular tourist destinations. The property is fully serviced and comes with a clear title deed. Perfect for developing a luxury beach house, boutique hotel, or high-end vacation rental.",
            "amenities": [
                "Direct Beach Access",
                "Tourist Area",
                "Luxury Amenities",
                "Security",
                "Water Supply",
                "Electricity",
                "Paved Roads"
            ]
        }
    ];
}

// Render featured listings
function renderFeaturedListings() {
    const container = document.getElementById('featured-listings');
    if (!container || !listingsData.length) return;
    
    // Get first 3 listings
    const featuredListings = listingsData.slice(0, 3);
    
    container.innerHTML = featuredListings.map(listing => `
        <div class="listing-card" data-listing-id="${listing.id}">
            <a href="property-${listing.slug}.html" class="listing-card-link">
                <div class="listing-card-image">
                    <img src="${listing.images[0]}" alt="${listing.title} - Premium land investment in ${listing.location} - ${listing.sizeAcres} acres available" class="listing-card-img">
                    <div class="listing-card-badge">
                        <span class="badge ${listing.status === 'available' ? 'badge-success' : 'badge-neutral'}">
                            ${listing.status === 'available' ? 'Available' : 'Sold'}
                        </span>
                    </div>
                </div>
                <div class="listing-card-content">
                    <h3 class="listing-card-title">${listing.title}</h3>
                    <div class="listing-card-location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>${listing.location}</span>
                    </div>
                    <div class="listing-card-price">${formatPrice(listing.priceKES)}</div>
                    <div class="listing-card-details">
                        <div class="listing-card-detail">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 3h18v18H3z"/>
                                <path d="M9 9h6v6H9z"/>
                            </svg>
                            <span>${listing.sizeAcres} acres</span>
                        </div>
                        <div class="listing-card-detail">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span>${listing.paymentPlan.months} months</span>
                        </div>
                    </div>
                    <div class="listing-card-payment">
                        <div class="listing-card-payment-label">Payment Plan</div>
                        <div class="listing-card-payment-deposit">${formatPrice(listing.paymentPlan.depositKES)} deposit</div>
                        <div class="listing-card-payment-monthly">${formatPrice((listing.priceKES - listing.paymentPlan.depositKES) / listing.paymentPlan.months)}/month</div>
                    </div>
                    <div class="listing-card-features">
                        ${listing.features.slice(0, 3).map(feature => `
                            <span class="listing-card-feature">${feature}</span>
                        `).join('')}
                        ${listing.features.length > 3 ? `
                            <span class="listing-card-feature">+${listing.features.length - 3} more</span>
                        ` : ''}
                    </div>
                    <p class="listing-card-description">${listing.shortDescription}</p>
                    <div class="listing-card-actions">
                        <a href="property-${listing.slug}.html" class="btn btn-primary btn-sm">
                            View Details
                        </a>
                        <a href="tel:+254724027747" class="btn btn-outline btn-sm">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                        </a>
                        <a href="https://wa.me/254783027747?text=Hi, I'm interested in ${encodeURIComponent(listing.title)}" target="_blank" rel="noopener noreferrer" class="btn btn-success btn-sm">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.highlight-card, .listing-card, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0,
    }).format(price);
}

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

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Handle form submissions
document.addEventListener('submit', function(e) {
    if (e.target.matches('form')) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Handle different forms
        if (e.target.id === 'newsletter-form') {
            handleNewsletterSubmission(data);
        } else if (e.target.matches('.contact-form')) {
            handleContactSubmission(data);
        }
    }
});

function handleNewsletterSubmission(data) {
    console.log('Newsletter submission:', data);
    showToast('Thank you for subscribing to our newsletter!', 'success');
}

function handleContactSubmission(data) {
    console.log('Contact form submission:', data);
    showToast('Thank you for your message! We will get back to you soon.', 'success');
}

// Handle WhatsApp clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href*="wa.me"]')) {
        // Track WhatsApp clicks
        console.log('WhatsApp link clicked');
    }
});

// Handle phone clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="tel:"]')) {
        // Track phone clicks
        console.log('Phone link clicked');
    }
});

// Performance optimization: Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are lazy images
if (document.querySelectorAll('img[data-src]').length > 0) {
    setupLazyLoading();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        console.log('Page hidden');
    } else {
        // Page is visible, resume animations or timers
        console.log('Page visible');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    showToast('Connection restored!', 'success');
});

window.addEventListener('offline', function() {
    showToast('You are now offline. Some features may not work.', 'error');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You could send error reports to your analytics service here
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send error reports to your analytics service here
});

// Export functions for use in other scripts
window.InukaNaPloti = {
    formatPrice,
    showToast,
    loadListings,
    renderFeaturedListings
};
