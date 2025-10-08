// FAQs functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById(`faq-${faqId}`);
            const icon = this.querySelector('.faq-icon');
            
            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherFaqId = otherQuestion.getAttribute('data-faq');
                    const otherAnswer = document.getElementById(`faq-${otherFaqId}`);
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    
                    otherAnswer.classList.remove('active');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Search functionality for FAQs
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search FAQs...';
    searchInput.className = 'faq-search';
    
    const faqsSection = document.querySelector('.faqs');
    if (faqsSection) {
        const container = faqsSection.querySelector('.container');
        const faqsContent = container.querySelector('.faqs-content');
        
        // Insert search input at the top
        const searchContainer = document.createElement('div');
        searchContainer.className = 'faq-search-container';
        searchContainer.appendChild(searchInput);
        container.insertBefore(searchContainer, faqsContent);
        
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // FAQ category filtering
    const categoryButtons = document.createElement('div');
    categoryButtons.className = 'faq-category-filters';
    
    const categories = [
        { name: 'All', id: 'all' },
        { name: 'General', id: 'general' },
        { name: 'Payment', id: 'payment' },
        { name: 'Title Deeds', id: 'title' },
        { name: 'Site Visits', id: 'site' },
        { name: 'Legal', id: 'legal' }
    ];
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.className = 'faq-category-filter';
        button.setAttribute('data-category', category.id);
        categoryButtons.appendChild(button);
    });
    
    if (faqsSection) {
        const container = faqsSection.querySelector('.container');
        const faqsContent = container.querySelector('.faqs-content');
        
        // Insert category filters
        container.insertBefore(categoryButtons, faqsContent);
        
        // Category filter functionality
        const filterButtons = document.querySelectorAll('.faq-category-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter FAQs
                const faqItems = document.querySelectorAll('.faq-item');
                faqItems.forEach(item => {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else {
                        const faqId = item.querySelector('.faq-question').getAttribute('data-faq');
                        if (faqId.startsWith(category)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
        
        // Set 'All' as active by default
        filterButtons[0].classList.add('active');
    }
    
    // FAQ statistics
    const faqStats = document.createElement('div');
    faqStats.className = 'faq-stats';
    faqStats.innerHTML = `
        <div class="faq-stat">
            <span class="faq-stat-number">${faqQuestions.length}</span>
            <span class="faq-stat-label">Total Questions</span>
        </div>
        <div class="faq-stat">
            <span class="faq-stat-number">${categories.length - 1}</span>
            <span class="faq-stat-label">Categories</span>
        </div>
    `;
    
    if (faqsSection) {
        const container = faqsSection.querySelector('.container');
        const faqsContent = container.querySelector('.faqs-content');
        container.insertBefore(faqStats, faqsContent);
    }
    
    // FAQ sharing functionality
    const shareButtons = document.createElement('div');
    shareButtons.className = 'faq-share-buttons';
    shareButtons.innerHTML = `
        <button class="faq-share-btn" data-platform="facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            Share on Facebook
        </button>
        <button class="faq-share-btn" data-platform="twitter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
            Share on Twitter
        </button>
        <button class="faq-share-btn" data-platform="whatsapp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Share on WhatsApp
        </button>
    `;
    
    if (faqsSection) {
        const container = faqsSection.querySelector('.container');
        const faqsContent = container.querySelector('.faqs-content');
        container.insertBefore(shareButtons, faqsContent);
        
        // Share functionality
        const shareBtns = document.querySelectorAll('.faq-share-btn');
        shareBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Check out these FAQs about land investment in Kenya');
                
                let shareUrl = '';
                switch (platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${text}%20${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    // FAQ print functionality
    const printButton = document.createElement('button');
    printButton.className = 'faq-print-btn';
    printButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6,9 6,2 18,2 18,9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
        </svg>
        Print FAQs
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    if (faqsSection) {
        const container = faqsSection.querySelector('.container');
        const faqsContent = container.querySelector('.faqs-content');
        container.insertBefore(printButton, faqsContent);
    }
    
    // FAQ feedback functionality
    const feedbackForm = document.createElement('div');
    feedbackForm.className = 'faq-feedback';
    feedbackForm.innerHTML = `
        <h3>Was this helpful?</h3>
        <div class="faq-feedback-buttons">
            <button class="faq-feedback-btn" data-feedback="yes">Yes</button>
            <button class="faq-feedback-btn" data-feedback="no">No</button>
        </div>
        <div class="faq-feedback-message" style="display: none;">
            <p>Thank you for your feedback!</p>
        </div>
    `;
    
    if (faqsSection) {
        const container = faqsSection.querySelector('.container');
        const faqsContent = container.querySelector('.faqs-content');
        container.insertBefore(feedbackForm, faqsContent);
        
        // Feedback functionality
        const feedbackBtns = document.querySelectorAll('.faq-feedback-btn');
        const feedbackMessage = document.querySelector('.faq-feedback-message');
        
        feedbackBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const feedback = this.getAttribute('data-feedback');
                
                // Store feedback in localStorage
                localStorage.setItem('faq-feedback', feedback);
                
                // Show thank you message
                feedbackMessage.style.display = 'block';
                
                // Hide feedback buttons
                this.parentElement.style.display = 'none';
            });
        });
    }
    
    // FAQ keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all open FAQs
            const openFaqs = document.querySelectorAll('.faq-answer.active');
            openFaqs.forEach(faq => {
                faq.classList.remove('active');
                const icon = faq.previousElementSibling.querySelector('.faq-icon');
                icon.style.transform = 'rotate(0deg)';
            });
        }
    });
    
    // FAQ analytics (if you want to track which FAQs are most viewed)
    const trackFaqView = (faqId) => {
        // You can implement analytics tracking here
        console.log(`FAQ viewed: ${faqId}`);
    };
    
    // Track FAQ views
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            trackFaqView(faqId);
        });
    });
});
