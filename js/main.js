/**
 * Imperial Restitution Press
 * Main JavaScript - Refined Interactions
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // NAVIGATION
    // ═══════════════════════════════════════════════════════════════

    const nav = document.getElementById('nav');
    let lastScrollY = 0;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // REVEAL ANIMATIONS
    // ═══════════════════════════════════════════════════════════════

    const revealElements = document.querySelectorAll('.book-card, .pillar, .philosophy-quote, .philosophy-text, .about-portrait, .about-text, .grand-quote');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // ═══════════════════════════════════════════════════════════════
    // NEWSLETTER FORM
    // ═══════════════════════════════════════════════════════════════

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Placeholder for actual newsletter integration
            console.log('Newsletter signup:', email);

            // Show success state
            const btn = this.querySelector('.newsletter-btn');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed';
            btn.style.background = '#2a5a3a';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // BOOK CARD HOVER EFFECTS
    // ═══════════════════════════════════════════════════════════════

    document.querySelectorAll('.book-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.zIndex = '';
            }, 300);
        });
    });

    // ═══════════════════════════════════════════════════════════════
    // PRELOAD CRITICAL FONTS
    // ═══════════════════════════════════════════════════════════════

    if ('fonts' in document) {
        Promise.all([
            document.fonts.load('400 1em Cinzel'),
            document.fonts.load('300 1em Cormorant Garamond'),
            document.fonts.load('400 1em Spectral')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }

    // ═══════════════════════════════════════════════════════════════
    // HERO PARALLAX (SUBTLE)
    // ═══════════════════════════════════════════════════════════════

    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        }, { passive: true });
    }

    // ═══════════════════════════════════════════════════════════════
    // CONSOLE BRANDING
    // ═══════════════════════════════════════════════════════════════

    console.log(
        '%c Imperial Restitution Press ',
        'background: #0a0a0a; color: #c9a227; font-family: Georgia, serif; font-size: 16px; padding: 10px 20px; border: 1px solid #c9a227;'
    );
    console.log(
        '%c Where Empires of Thought Endure ',
        'color: #6b6b6b; font-family: Georgia, serif; font-style: italic;'
    );

})();


// ═══════════════════════════════════════════════════════════════
// STRIPE CHECKOUT INTEGRATION
// ═══════════════════════════════════════════════════════════════

/**
 * Stripe Checkout Module
 *
 * To use Stripe checkout:
 * 1. Add your publishable key to the STRIPE_PUBLIC_KEY environment variable
 * 2. Create products in Stripe dashboard
 * 3. Call initializeStripeCheckout() with your book data
 */

const StripeCheckout = {
    // Stripe will be loaded dynamically when needed
    stripe: null,

    // Book price IDs from Stripe (set these in your Stripe dashboard)
    priceIds: {
        'roman-art-of-war': null, // Replace with actual Stripe price ID
        'strategemata-1': null,
        'strategemata-2': null,
        'strategemata-3': null,
        '1983': null,
        'oumuamua': null
    },

    /**
     * Initialize Stripe with your publishable key
     * Call this when the page loads if you want to enable purchases
     */
    async init(publishableKey) {
        if (!publishableKey) {
            console.warn('Stripe publishable key not provided. Checkout will be disabled.');
            return false;
        }

        // Dynamically load Stripe.js
        if (!window.Stripe) {
            await this.loadStripeScript();
        }

        this.stripe = window.Stripe(publishableKey);
        return true;
    },

    /**
     * Load Stripe.js script dynamically
     */
    loadStripeScript() {
        return new Promise((resolve, reject) => {
            if (window.Stripe) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    /**
     * Redirect to Stripe Checkout
     * @param {string} bookId - The book identifier
     * @param {string} priceId - The Stripe price ID
     */
    async checkout(bookId, priceId) {
        if (!this.stripe) {
            console.error('Stripe not initialized. Call StripeCheckout.init() first.');
            return;
        }

        if (!priceId) {
            console.error('No price ID provided for book:', bookId);
            return;
        }

        try {
            const { error } = await this.stripe.redirectToCheckout({
                lineItems: [{ price: priceId, quantity: 1 }],
                mode: 'payment',
                successUrl: window.location.origin + '/success.html?book=' + bookId,
                cancelUrl: window.location.origin + '/book-' + bookId + '.html'
            });

            if (error) {
                console.error('Stripe checkout error:', error);
                alert('Unable to process checkout. Please try again.');
            }
        } catch (err) {
            console.error('Checkout failed:', err);
        }
    },

    /**
     * Set price ID for a book
     * @param {string} bookId - The book identifier
     * @param {string} priceId - The Stripe price ID
     */
    setPrice(bookId, priceId) {
        this.priceIds[bookId] = priceId;
    }
};

// Export for use in book pages
window.StripeCheckout = StripeCheckout;


// ═══════════════════════════════════════════════════════════════
// PURCHASE BUTTON HANDLER
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    // Handle all purchase buttons
    document.querySelectorAll('[data-purchase]').forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();

            const bookId = this.dataset.purchase;
            const priceId = StripeCheckout.priceIds[bookId];

            if (priceId && StripeCheckout.stripe) {
                // Use Stripe checkout
                await StripeCheckout.checkout(bookId, priceId);
            } else {
                // Fallback: show alternative purchase options
                const modal = document.getElementById('purchase-modal');
                if (modal) {
                    modal.classList.add('active');
                    modal.dataset.book = bookId;
                }
            }
        });
    });

    // Close modal handler
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
            }
        });
    });
});
