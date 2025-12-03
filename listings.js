// Listings page specific functionality
let allListings = [];
let filteredListings = [];
let currentFilters = {
    location: '',
    price: '',
    size: '',
    status: ''
};

// DOM elements
const listingsGrid = document.getElementById('listings-grid');
const listingsCount = document.getElementById('listings-count');
const listingsLoading = document.getElementById('listings-loading');
const listingsEmpty = document.getElementById('listings-empty');
const locationFilter = document.getElementById('location-filter');
const priceFilter = document.getElementById('price-filter');
const sizeFilter = document.getElementById('size-filter');
const statusFilter = document.getElementById('status-filter');
const clearFiltersBtn = document.getElementById('clear-filters');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');

// Initialize listings page
document.addEventListener('DOMContentLoaded', function() {
    initializeListingsPage();
});

function initializeListingsPage() {
    setupFilters();
    loadAllListings();
}

// Setup filter functionality
function setupFilters() {
    // Filter change events
    [locationFilter, priceFilter, sizeFilter, statusFilter].forEach(filter => {
        filter.addEventListener('change', handleFilterChange);
    });
    
    // Clear filters
    clearFiltersBtn.addEventListener('click', clearFilters);
    resetFiltersBtn.addEventListener('click', clearFilters);
    
    // Apply filters
    applyFiltersBtn.addEventListener('click', applyFilters);
}

// Handle filter changes
function handleFilterChange() {
    updateFilters();
    applyFilters();
}

// Update current filters object
function updateFilters() {
    currentFilters = {
        location: locationFilter.value,
        price: priceFilter.value,
        size: sizeFilter.value,
        status: statusFilter.value
    };
}

// Apply filters to listings
function applyFilters() {
    updateFilters();
    
    filteredListings = allListings.filter(listing => {
        // Location filter
        if (currentFilters.location && !listing.location.toLowerCase().includes(currentFilters.location.toLowerCase())) {
            return false;
        }
        
        // Price filter
        if (currentFilters.price) {
            const [min, max] = currentFilters.price.split('-').map(p => p === '' ? (p.includes('+') ? Infinity : 0) : parseInt(p));
            if (max && (listing.priceKES < min || listing.priceKES > max)) {
                return false;
            }
            if (max === undefined && listing.priceKES < min) {
                return false;
            }
        }
        
        // Size filter
        if (currentFilters.size && listing.sizeAcres !== currentFilters.size) {
            return false;
        }
        
        // Status filter
        if (currentFilters.status && listing.status !== currentFilters.status) {
            return false;
        }
        
        return true;
    });
    
    renderListings();
    updateListingsCount();
}

// Clear all filters
function clearFilters() {
    locationFilter.value = '';
    priceFilter.value = '';
    sizeFilter.value = '';
    statusFilter.value = '';
    
    currentFilters = {
        location: '',
        price: '',
        size: '',
        status: ''
    };
    
    filteredListings = [...allListings];
    renderListings();
    updateListingsCount();
}

// Load all listings
async function loadAllListings() {
    try {
        listingsLoading.style.display = 'block';
        listingsGrid.style.display = 'none';
        listingsEmpty.style.display = 'none';
        
        // Use embedded data instead of fetch to avoid CORS issues
        allListings = getListingsData();
        filteredListings = [...allListings];
        
        listingsLoading.style.display = 'none';
        listingsGrid.style.display = 'grid';
        
        renderListings();
        updateListingsCount();
    } catch (error) {
        console.error('Error loading listings:', error);
        listingsLoading.style.display = 'none';
        listingsEmpty.style.display = 'block';
        listingsEmpty.querySelector('.empty-description').textContent = 'Unable to load properties. Please try again later.';
    }
}

// Embedded listings data to avoid CORS issues when opening files directly
function getListingsData() {
    return [
        {
            "id": "diani-galu",
            "title": "Diani Plots for Sale - Galu Area",
            "slug": "diani-galu",
            "priceKES": 1950000,
            "sizeAcres": "1/8",
            "location": "Galu, Diani",
            "coords": {
                "lat": -4.3000,
                "lng": 39.5800
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1763715620/Diani_Plots_for_Sale_1_ne7p2e.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1763715635/Diani_Plots_for_Sale_3_hlwdzf.jpg"
            ],
            "paymentPlan": {
                "depositKES": 500000,
                "months": 12
            },
            "features": [
                "Just 1.5KM to the Beach",
                "1KM Off the Road near Neptune Hotel",
                "Ideal for Holiday Homes, Retirement Getaways, Apartments",
                "Residential Development or Smart Investment",
                "Freehold Title Deed included"
            ],
            "shortDescription": "DIANI PLOTS FOR SALE – GALU AREA. Looking for a perfect coastal investment? Just 1.5KM to the Beach, 1KM Off the Road near Neptune Hotel. Ideal for Holiday Homes, Retirement Getaways, Apartments, Residential Development or Smart Investment.",
            "longDescription": "DIANI PLOTS FOR SALE – GALU AREA 🌴. Looking for a perfect coastal investment? We've got you covered! 📍 LOCATION: Galu, Diani. ✅ Just 1.5KM to the Beach. ✅ 1KM Off the Road near Neptune Hotel. ✅ Ideal for: Holiday Homes, Retirement Getaways, Apartments, Residential Development or Smart Investment. 📐 PLOTS SIZE: 50×100. 💰 PRICE: 1.95M (Inclusive of Freehold Title Deed). 💳 Payment Plan: Deposit: 500,000 or 50%. Balance: Cleared in 12 Monthly Installments – Interest FREE!",
            "amenities": [
                "Beach proximity",
                "Road access",
                "Freehold title",
                "Coastal location",
                "Prime investment opportunity",
                "Near Neptune Hotel"
            ]
        },
        {
            "id": "mtwapa-phase-7",
            "title": "Mtwapa Phase 7 - Prime Plots for Sale",
            "slug": "mtwapa-phase-7",
            "priceKES": 1650000,
            "sizeAcres": "1/8",
            "location": "Malindi (along Malindi-Voi Tsavo bypass)",
            "coords": {
                "lat": -3.2200,
                "lng": 40.1200
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764318692/chakama_4_aiatrb.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764318692/chakama_3_dyf9cl.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764318691/chakama_1_etvmpg.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764318691/chakama_2_lve09a.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764318691/chakama_6_dvix68.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764318691/chakama_5_ggsaol.jpg"
            ],
            "paymentPlan": {
                "depositKES": 100000,
                "months": 12
            },
            "features": [
                "Touching the tarmac",
                "Access to water, electricity & a quiet neighborhood",
                "Ready freehold title deeds",
                "Prime location along Malindi-Voi Tsavo bypass",
                "Secure your dream property"
            ],
            "shortDescription": "Mtwapa Phase 7 Prime plots for Sale! Secure your dream property along the Malindi-Voi Tsavo bypass. Touching the tarmac with access to water, electricity & a quiet neighborhood. Ready freehold title deeds.",
            "longDescription": "Mtwapa Phase 7 Prime plots for Sale! 🌿🏡 Secure your dream property along the Malindi-Voi Tsavo bypass. ✅ Touching the tarmac. ✅ Access to water, electricity & a quiet neighborhood. ✅ Ready freehold title deeds. 💰 Plots price: Ksh 1,650,000. 🔹 Deposit: Ksh 100,000/=. 🔹 Balance payable in 12 months. Call 0724 027747 today to book a free site visit!",
            "amenities": [
                "Tarmac road access",
                "Water supply",
                "Electricity connection",
                "Quiet neighborhood",
                "Freehold title",
                "Prime location"
            ]
        },
        {
            "id": "kikambala-phase-7",
            "title": "Kikambala Phase 2 - Prime Residential Plots",
            "slug": "kikambala-phase-7",
            "priceKES": 1250000,
            "sizeAcres": "1/8",
                "location": "Kikambala",
            "coords": {
                "lat": -3.9400,
                "lng": 39.7500
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764317318/Mtwapa_Phase_7_2_qkjlfa.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764317318/Mtwapa_Phase_7_3_umpbg4.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764317318/Mtwapa_Phase_7_6_awxra8.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764317318/Mtwapa_Phase_7_1_nvbqy9.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764317318/Mtwapa_Phase_7_5_ozs3w2.jpg"
            ],
            "paymentPlan": {
                "depositKES": 500000,
                "months": 12
            },
            "features": [
                "Well done access road & fence",
                "Well developed and secure neighbourhood",
                "Near social amenities, Hotels and schools",
                "Freehold Title deeds",
                "All costs inclusive"
            ],
                "shortDescription": "PRIME RESIDENTIAL PLOTS IN KIKAMBALA. Plots are approximately 1/8 acre sizes 50ft×100ft. Value added with well done access road & fence. In a well developed and secure neighbourhood near social amenities, Hotels and schools.",
                "longDescription": "🏡 PRIME RESIDENTIAL PLOTS IN KIKAMBALA 🌴. 🔹️️ Plots are approximately 1/8 acre sizes 50ft×100ft. 🔹️ Value added with well done access road & fence. 🔹️ In a well developed and secure neighbourhood. 🔹️️ Near social amenities, Hotels and schools. 🔹️ Price is Ksh 1.25M all costs inclusive. 🔹️ With ready Freehold Title deeds. 📞 0724 027747 // 0783 027747 for viewing and site visits.",
            "amenities": [
                "Access roads",
                "Perimeter fencing",
                "Secure neighbourhood",
                "Social amenities",
                "Hotels nearby",
                "Schools nearby",
                "Freehold title"
            ]
        },
        {
            "id": "mwanda-gardens-phase-3",
            "title": "Mwanda Gardens Phase 3 - Affordable Prime Investment",
            "slug": "mwanda-gardens-phase-3",
            "priceKES": 325000,
            "sizeAcres": "1/8",
            "location": "Mariakani (1KM from Kibao Kiche Town & Mariakani–Mavueni Bypass)",
            "coords": {
                "lat": -3.8700,
                "lng": 39.4700
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764264286/MWANDA_GARDENS_PHASE_3_MARIAKANI_1_ugail7.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764264285/MWANDA_GARDENS_PHASE_3_MARIAKANI_2_e1kx2t.jpg"
            ],
            "paymentPlan": {
                "depositKES": 100000,
                "months": 12
            },
            "features": [
                "Just 1KM from Kibao Kiche Town & Mariakani–Mavueni Bypass",
                "Freehold Title Deed – Transfer Fee Inclusive",
                "Water & Electricity Available",
                "Ideal for Residential Homes or Investment",
                "Site visits every day"
            ],
            "shortDescription": "Looking for a prime yet affordable investment? We've got you covered! Just 1KM from Kibao Kiche Town & Mariakani–Mavueni Bypass. Perfect for residential homes or investment.",
            "longDescription": "Looking for a prime yet affordable investment? We've got you covered! 📍 Location: Just 1KM from Kibao Kiche Town & Mariakani–Mavueni Bypass. 📏 PLOTS SIZE: 50×100. 💰 PRICE: Ksh 325,000 only. 💳 Deposit: Ksh 100,000. 🗓 Balance: Cleared in 12 Monthly Installments – Interest Free! 📜 Freehold Title Deed – Transfer Fee Inclusive! ✅ Ideal for Residential Homes or Investment. ✅ Water & Electricity Available. ✅ Site visits every day. Own your piece of land today – book your viewing now!",
            "amenities": [
                "Freehold title",
                "Water supply",
                "Electricity connection",
                "Prime location",
                "Affordable pricing",
                "Flexible payment plan"
            ]
        },
        {
            "id": "prime-bofa-plots",
            "title": "Prime Bofa Plots - Beach Investment Opportunity",
            "slug": "prime-bofa-plots",
            "priceKES": 1800000,
            "sizeAcres": "1/8",
            "location": "Kilifi – Bofa (1KM from Bofa Beach Hotel)",
            "coords": {
                "lat": -3.5107,
                "lng": 39.9093
            },
            "status": "available",
            "images": [
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764310107/Prime_Bofa_Plots_for_Sale_Kilifi_6_hwvenx.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764310108/Prime_Bofa_Plots_for_Sale_Kilifi_2_hb1has.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764310108/Prime_Bofa_Plots_for_Sale_Kilifi_5_p9gpss.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764310108/Prime_Bofa_Plots_for_Sale_Kilifi_3_tmhwhn.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764310108/Prime_Bofa_Plots_for_Sale_Kilifi_1_g2zhla.jpg",
                "https://res.cloudinary.com/dyfnobo9r/image/upload/v1764310108/Prime_Bofa_Plots_for_Sale_Kilifi_4_ldwams.jpg"
            ],
            "paymentPlan": {
                "depositKES": 500000,
                "months": 12
            },
            "features": [
                "Just 1KM from Bofa Beach Hotel & Bofa Road",
                "Only 50 meters off tarmacked road",
                "Freehold Title Deeds",
                "Water & Electricity on site",
                "Developed, Serene Neighborhood"
            ],
            "shortDescription": "Looking to invest by the beach? Here's your golden chance! Just 1KM from Bofa Beach Hotel, 50 meters off tarmacked road. Perfect for holiday homes, retirement homes, cottages, and smart investment.",
            "longDescription": "Looking to invest by the beach? Here's your golden chance! 📍 Location: Just 1KM from Bofa Beach Hotel & Bofa Road. 🛣️ Only 50 meters off the tarmacked road connecting the highway to the beach. 🏡 Ideal for: Holiday Homes, Retirement Homes, Cottages, Residential Development, Smart Investment. 📏 Plot Size: 50×100. 💰 Price: Ksh 1.8M. 💳 Deposit: Ksh 500,000 or 50%. 🗓️ Balance: Pay in 12 Monthly Installments – Interest Free! ✅ Freehold Title Deeds. ✅ Water & Electricity on site. ✅ Developed, Serene Neighborhood. 📞 Book your site visit today and own your slice of coastal paradise!",
            "amenities": [
                "Beach proximity",
                "Tarmacked road access",
                "Water supply",
                "Electricity connection",
                "Freehold title",
                "Developed neighborhood"
            ]
        },
        {
            "id": "chumani-beach-view",
            "title": "Chumani Beach View",
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
        }
    ];
}

// Render listings
function renderListings() {
    if (filteredListings.length === 0) {
        listingsGrid.style.display = 'none';
        listingsEmpty.style.display = 'block';
        return;
    }
    
    listingsGrid.style.display = 'grid';
    listingsEmpty.style.display = 'none';
    
    listingsGrid.innerHTML = filteredListings.map(listing => `
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

// Update listings count
function updateListingsCount() {
    const count = filteredListings.length;
    listingsCount.textContent = count;
}

// Format price utility function
function formatPrice(price) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0,
    }).format(price);
}

// Add CSS for listings page
const listingsStyles = `
/* Listings Page Styles */
.listings-hero {
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, rgba(45, 171, 225, 0.05) 0%, rgba(236, 28, 38, 0.05) 100%);
}

.listings-hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.listings-hero-title {
  font-size: 2.5rem;
  font-family: var(--font-montserrat);
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 640px) {
  .listings-hero-title {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .listings-hero-title {
    font-size: 3.75rem;
  }
}

.listings-hero-description {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--color-neutral-600);
  text-align: justify;
}

/* Filters Section */
.listings-filters {
  padding: var(--spacing-xl) 0;
  background-color: var(--color-neutral-50);
}

.filters-content {
  max-width: 1000px;
  margin: 0 auto;
}

.filters-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.filters-title {
  font-size: 1.5rem;
  font-family: var(--font-montserrat);
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-sm);
}

@media (min-width: 640px) {
  .filters-title {
    font-size: 2rem;
  }
}

.filters-description {
  color: var(--color-neutral-600);
}

.filters-grid {
  display: grid;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 640px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .filters-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-neutral-700);
  margin-bottom: var(--spacing-xs);
}

.filter-select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  background-color: white;
  font-size: 1rem;
  color: var(--color-neutral-900);
  transition: border-color 0.2s ease;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 171, 225, 0.1);
}

.filters-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

/* Listings Section */
.listings-section {
  padding: var(--spacing-3xl) 0;
}

.listings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-direction: column;
  gap: var(--spacing-sm);
}

@media (min-width: 640px) {
  .listings-header {
    flex-direction: row;
  }
}

.listings-title {
  font-size: 2rem;
  font-family: var(--font-montserrat);
  font-weight: 700;
  color: var(--color-neutral-900);
}

@media (min-width: 640px) {
  .listings-title {
    font-size: 2.5rem;
  }
}

.listings-count {
  color: var(--color-neutral-600);
  font-weight: 500;
}

.listings-loading {
  text-align: center;
  padding: var(--spacing-3xl) 0;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid var(--color-neutral-200);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--spacing-md);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.listings-empty {
  text-align: center;
  padding: var(--spacing-3xl) 0;
}

.empty-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  color: var(--color-neutral-400);
  margin: 0 auto var(--spacing-lg);
}

.empty-title {
  font-size: 1.5rem;
  font-family: var(--font-montserrat);
  font-weight: 600;
  color: var(--color-neutral-900);
  margin-bottom: var(--spacing-sm);
}

.empty-description {
  color: var(--color-neutral-600);
  margin-bottom: var(--spacing-lg);
  line-height: 1.6;
}
`;

// Inject listings styles
const styleSheet = document.createElement('style');
styleSheet.textContent = listingsStyles;
document.head.appendChild(styleSheet);
