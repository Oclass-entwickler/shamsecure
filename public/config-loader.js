// ============================================
// ShamSecure - Client-side Config Loader
// ============================================
// This loads site configuration from the API

let siteConfig = null;

async function loadSiteConfig() {
    try {
        const response = await fetch('/api/config');
        const data = await response.json();
        
        if (data.success) {
            siteConfig = data.data;
            updatePageWithConfig();
        }
    } catch (error) {
        console.error('Error loading config:', error);
        // Use default values if API fails
        useDefaultConfig();
    }
}

function updatePageWithConfig() {
    if (!siteConfig) return;

    // Update phone numbers
    const phoneElements = document.querySelectorAll('[data-phone-primary]');
    phoneElements.forEach(el => {
        el.textContent = siteConfig.contact.phone.primary;
        if (el.tagName === 'A') {
            el.href = `tel:${siteConfig.contact.phone.primary.replace(/\s/g, '')}`;
        }
    });

    const phoneSecondaryElements = document.querySelectorAll('[data-phone-secondary]');
    phoneSecondaryElements.forEach(el => {
        el.textContent = siteConfig.contact.phone.secondary;
        if (el.tagName === 'A') {
            el.href = `tel:${siteConfig.contact.phone.secondary.replace(/\s/g, '')}`;
        }
    });

    // Update emails
    const emailInfoElements = document.querySelectorAll('[data-email-info]');
    emailInfoElements.forEach(el => {
        el.textContent = siteConfig.contact.email.info;
        if (el.tagName === 'A') {
            el.href = `mailto:${siteConfig.contact.email.info}`;
        }
    });

    const emailSalesElements = document.querySelectorAll('[data-email-sales]');
    emailSalesElements.forEach(el => {
        el.textContent = siteConfig.contact.email.sales;
        if (el.tagName === 'A') {
            el.href = `mailto:${siteConfig.contact.email.sales}`;
        }
    });

    const emailSupportElements = document.querySelectorAll('[data-email-support]');
    emailSupportElements.forEach(el => {
        el.textContent = siteConfig.contact.email.support;
        if (el.tagName === 'A') {
            el.href = `mailto:${siteConfig.contact.email.support}`;
        }
    });

    // Update address
    const addressCityElements = document.querySelectorAll('[data-address-city]');
    addressCityElements.forEach(el => {
        el.textContent = siteConfig.contact.address.city;
    });

    const addressStreetElements = document.querySelectorAll('[data-address-street]');
    addressStreetElements.forEach(el => {
        el.textContent = siteConfig.contact.address.street;
    });

    const addressCountryElements = document.querySelectorAll('[data-address-country]');
    addressCountryElements.forEach(el => {
        el.textContent = siteConfig.contact.address.country;
    });

    const addressFullElements = document.querySelectorAll('[data-address-full]');
    addressFullElements.forEach(el => {
        el.textContent = `${siteConfig.contact.address.city}، ${siteConfig.contact.address.country}`;
    });

    const addressCompleteElements = document.querySelectorAll('[data-address-complete]');
    addressCompleteElements.forEach(el => {
        el.textContent = `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.country}`;
    });

    // Update site name
    const siteNameElements = document.querySelectorAll('[data-site-name]');
    siteNameElements.forEach(el => {
        el.textContent = siteConfig.site.name;
    });

    const siteNameArElements = document.querySelectorAll('[data-site-name-ar]');
    siteNameArElements.forEach(el => {
        el.textContent = siteConfig.site.nameAr;
    });

    // Update social links
    if (siteConfig.social.facebook) {
        const fbLinks = document.querySelectorAll('[data-social-facebook]');
        fbLinks.forEach(link => link.href = siteConfig.social.facebook);
    }

    if (siteConfig.social.instagram) {
        const igLinks = document.querySelectorAll('[data-social-instagram]');
        igLinks.forEach(link => link.href = siteConfig.social.instagram);
    }

    if (siteConfig.social.linkedin) {
        const liLinks = document.querySelectorAll('[data-social-linkedin]');
        liLinks.forEach(link => link.href = siteConfig.social.linkedin);
    }

    if (siteConfig.social.twitter) {
        const twLinks = document.querySelectorAll('[data-social-twitter]');
        twLinks.forEach(link => link.href = siteConfig.social.twitter);
    }

    // Update services header
    const servicesTitleElements = document.querySelectorAll('[data-services-title]');
    servicesTitleElements.forEach(el => {
        el.textContent = siteConfig.services.title || 'خدماتنا';
    });

    const servicesSubtitleElements = document.querySelectorAll('[data-services-subtitle]');
    servicesSubtitleElements.forEach(el => {
        el.textContent = siteConfig.services.subtitle || 'حلول أمنية شاملة مصممة لاحتياجاتك';
    });

    // Update hero section
    const heroTitleElements = document.querySelectorAll('[data-hero-title]');
    heroTitleElements.forEach(el => {
        el.textContent = siteConfig.hero.title || 'حمايتك هي أولويتنا';
    });

    const heroSubtitleElements = document.querySelectorAll('[data-hero-subtitle]');
    heroSubtitleElements.forEach(el => {
        el.textContent = siteConfig.hero.subtitle || 'نقدم حلول أمنية متكاملة وموثوقة لضمان سلامتك وسلامة ممتلكاتك';
    });

    // Update hero images - always set siteConfig for slider
    window.siteConfig = siteConfig;
    
    // Reinitialize slider if it exists and we have images
    if (typeof initHeroSlider === 'function') {
        // Wait a bit to ensure DOM is ready
        setTimeout(() => {
            initHeroSlider();
        }, 100);
    }
}

function useDefaultConfig() {
    // Default values if API is not available
    console.log('Using default configuration');
}

// Load config when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSiteConfig);
} else {
    loadSiteConfig();
}
