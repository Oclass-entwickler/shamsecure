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
    });

    const phoneSecondaryElements = document.querySelectorAll('[data-phone-secondary]');
    phoneSecondaryElements.forEach(el => {
        el.textContent = siteConfig.contact.phone.secondary;
    });

    // Update emails
    const emailElements = document.querySelectorAll('[data-email-info]');
    emailElements.forEach(el => {
        el.textContent = siteConfig.contact.email.info;
        if (el.tagName === 'A') {
            el.href = `mailto:${siteConfig.contact.email.info}`;
        }
    });

    // Update address
    const addressElements = document.querySelectorAll('[data-address]');
    addressElements.forEach(el => {
        el.textContent = `${siteConfig.contact.address.street}, ${siteConfig.contact.address.city}, ${siteConfig.contact.address.country}`;
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
