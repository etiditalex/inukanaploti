// Cookie Consent Management
(function() {
    'use strict';

    // Cookie utility functions
    const CookieManager = {
        setCookie: function(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
        },

        getCookie: function(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        eraseCookie: function(name) {
            document.cookie = name + '=;Max-Age=-99999999;path=/';
        }
    };

    // Cookie categories
    const CookieCategories = {
        necessary: {
            name: 'Necessary',
            description: 'Essential cookies for website functionality',
            cookies: ['cookie_consent', 'cookie_preferences'],
            alwaysEnabled: true
        },
        analytics: {
            name: 'Analytics',
            description: 'Help us understand how visitors interact with our website',
            cookies: ['_ga', '_gid', '_gat'],
            enabled: false
        },
        marketing: {
            name: 'Marketing',
            description: 'Used to track visitors across websites for marketing purposes',
            cookies: ['_fbp', 'fr'],
            enabled: false
        }
    };

    // Check if consent has been given
    function hasConsent() {
        return CookieManager.getCookie('cookie_consent') !== null;
    }

    // Get cookie preferences
    function getPreferences() {
        const prefs = CookieManager.getCookie('cookie_preferences');
        if (prefs) {
            try {
                return JSON.parse(decodeURIComponent(prefs));
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    // Save cookie preferences
    function savePreferences(preferences) {
        const prefsString = encodeURIComponent(JSON.stringify(preferences));
        CookieManager.setCookie('cookie_preferences', prefsString, 365);
        CookieManager.setCookie('cookie_consent', 'true', 365);
    }

    // Create cookie banner
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3 class="cookie-banner-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1.5rem; height: 1.5rem; margin-right: 0.5rem;">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 16v-4"/>
                            <path d="M12 8h.01"/>
                        </svg>
                        We use cookies
                    </h3>
                    <p class="cookie-banner-description">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        By clicking "Accept All", you consent to our use of cookies. 
                        <a href="cookies-policy.html" class="cookie-banner-link">Learn more</a>
                    </p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-settings-btn" class="cookie-btn cookie-btn-settings">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1rem; height: 1rem; margin-right: 0.5rem;">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M12 1v6m0 6v6m10.66-11H16.5m-9 0H1.34M20.66 17H16.5m-9 0H1.34"/>
                        </svg>
                        Cookie Settings
                    </button>
                    <button id="cookie-decline-btn" class="cookie-btn cookie-btn-decline">
                        Decline
                    </button>
                    <button id="cookie-accept-btn" class="cookie-btn cookie-btn-accept">
                        Accept All
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById('cookie-accept-btn').addEventListener('click', acceptAllCookies);
        document.getElementById('cookie-decline-btn').addEventListener('click', declineAllCookies);
        document.getElementById('cookie-settings-btn').addEventListener('click', showCookieSettings);

        // Animate in
        setTimeout(() => {
            banner.classList.add('cookie-banner-visible');
        }, 500);
    }

    // Create cookie settings modal
    function createSettingsModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.className = 'cookie-modal';
        modal.innerHTML = `
            <div class="cookie-modal-overlay"></div>
            <div class="cookie-modal-content">
                <div class="cookie-modal-header">
                    <h2 class="cookie-modal-title">Cookie Settings</h2>
                    <button id="cookie-modal-close" class="cookie-modal-close" aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                <div class="cookie-modal-body">
                    <p class="cookie-modal-intro">
                        Manage your cookie preferences. You can enable or disable different types of cookies below. 
                        Note that disabling some types of cookies may impact your experience on our website.
                    </p>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <div class="cookie-category-info">
                                <h3 class="cookie-category-title">Necessary Cookies</h3>
                                <p class="cookie-category-description">
                                    These cookies are essential for the website to function properly. 
                                    They enable basic functions like page navigation and access to secure areas.
                                </p>
                            </div>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="cookie-necessary" checked disabled>
                                <label for="cookie-necessary" class="cookie-toggle-label">Always Active</label>
                            </div>
                        </div>
                    </div>

                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <div class="cookie-category-info">
                                <h3 class="cookie-category-title">Analytics Cookies</h3>
                                <p class="cookie-category-description">
                                    These cookies help us understand how visitors interact with our website by collecting 
                                    and reporting information anonymously.
                                </p>
                            </div>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="cookie-analytics" class="cookie-toggle-input">
                                <label for="cookie-analytics" class="cookie-toggle-switch"></label>
                            </div>
                        </div>
                    </div>

                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <div class="cookie-category-info">
                                <h3 class="cookie-category-title">Marketing Cookies</h3>
                                <p class="cookie-category-description">
                                    These cookies are used to track visitors across websites to display relevant 
                                    advertisements and marketing campaigns.
                                </p>
                            </div>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="cookie-marketing" class="cookie-toggle-input">
                                <label for="cookie-marketing" class="cookie-toggle-switch"></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cookie-modal-footer">
                    <button id="cookie-save-preferences" class="cookie-btn cookie-btn-accept">
                        Save Preferences
                    </button>
                    <button id="cookie-accept-all-modal" class="cookie-btn cookie-btn-secondary">
                        Accept All
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Load current preferences
        const prefs = getPreferences();
        if (prefs) {
            if (prefs.analytics) document.getElementById('cookie-analytics').checked = true;
            if (prefs.marketing) document.getElementById('cookie-marketing').checked = true;
        }

        // Add event listeners
        document.getElementById('cookie-modal-close').addEventListener('click', closeSettingsModal);
        document.querySelector('.cookie-modal-overlay').addEventListener('click', closeSettingsModal);
        document.getElementById('cookie-save-preferences').addEventListener('click', saveCustomPreferences);
        document.getElementById('cookie-accept-all-modal').addEventListener('click', acceptAllFromModal);

        // Show modal
        setTimeout(() => {
            modal.classList.add('cookie-modal-visible');
        }, 50);
    }

    // Show cookie settings
    function showCookieSettings() {
        hideBanner();
        createSettingsModal();
    }

    // Close settings modal
    function closeSettingsModal() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('cookie-modal-visible');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    // Accept all cookies
    function acceptAllCookies() {
        const preferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        savePreferences(preferences);
        hideBanner();
        loadScripts(preferences);
    }

    // Accept all from modal
    function acceptAllFromModal() {
        acceptAllCookies();
        closeSettingsModal();
    }

    // Decline all cookies
    function declineAllCookies() {
        const preferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        savePreferences(preferences);
        hideBanner();
    }

    // Save custom preferences
    function saveCustomPreferences() {
        const preferences = {
            necessary: true,
            analytics: document.getElementById('cookie-analytics').checked,
            marketing: document.getElementById('cookie-marketing').checked
        };
        savePreferences(preferences);
        closeSettingsModal();
        loadScripts(preferences);
    }

    // Hide banner
    function hideBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('cookie-banner-visible');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Load tracking scripts based on preferences
    function loadScripts(preferences) {
        // Load Google Analytics if analytics cookies are enabled
        if (preferences.analytics) {
            // Add Google Analytics code here if you have a tracking ID
            console.log('Analytics cookies enabled');
        }

        // Load Facebook Pixel if marketing cookies are enabled
        if (preferences.marketing) {
            // Add Facebook Pixel code here if you have a pixel ID
            console.log('Marketing cookies enabled');
        }
    }

    // Initialize cookie consent
    function init() {
        // Check if consent has been given
        if (!hasConsent()) {
            // Show banner after a short delay
            setTimeout(createCookieBanner, 1000);
        } else {
            // Load scripts based on saved preferences
            const prefs = getPreferences();
            if (prefs) {
                loadScripts(prefs);
            }
        }

        // Add "Manage Cookies" link functionality
        const manageCookiesLinks = document.querySelectorAll('[href="#manage-cookies"]');
        manageCookiesLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showCookieSettings();
            });
        });
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose functions globally for manual control
    window.CookieConsent = {
        show: createCookieBanner,
        showSettings: showCookieSettings,
        accept: acceptAllCookies,
        decline: declineAllCookies,
        getPreferences: getPreferences,
        hasConsent: hasConsent
    };
})();

