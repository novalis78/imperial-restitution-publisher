/**
 * Stripe Configuration for Imperial Restitution Press
 *
 * INSTRUCTIONS:
 * 1. Replace 'YOUR_PUBLISHABLE_KEY' with your actual Stripe publishable key
 * 2. Replace each price ID with your actual Stripe price IDs
 * 3. Include this file after main.js in your HTML pages
 *
 * For production, consider loading these values from a secure backend
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // STRIPE CONFIGURATION
    // Replace these values with your actual Stripe credentials
    // ═══════════════════════════════════════════════════════════════

    const STRIPE_CONFIG = {
        // Your Stripe publishable key
        // Get this from: https://dashboard.stripe.com/apikeys
        publishableKey: 'YOUR_PUBLISHABLE_KEY', // e.g., 'pk_live_xxxxx' or 'pk_test_xxxxx'

        // Price IDs for each book
        // Create products in Stripe Dashboard and copy the price IDs here
        prices: {
            'roman-art-of-war': null,  // e.g., 'price_1234567890'
            'strategemata-1': null,
            'strategemata-2': null,
            'strategemata-3': null,
            '1983': null,
            'oumuamua': null
        }
    };

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION
    // This runs automatically when the page loads
    // ═══════════════════════════════════════════════════════════════

    document.addEventListener('DOMContentLoaded', async function() {
        // Check if Stripe is properly configured
        if (STRIPE_CONFIG.publishableKey === 'YOUR_PUBLISHABLE_KEY') {
            console.warn(
                '%c Stripe not configured ',
                'background: #ff6b6b; color: white; padding: 4px 8px;',
                '\nEdit js/stripe-config.js to add your Stripe credentials.'
            );
            return;
        }

        // Initialize Stripe
        const initialized = await StripeCheckout.init(STRIPE_CONFIG.publishableKey);

        if (initialized) {
            // Set price IDs
            Object.entries(STRIPE_CONFIG.prices).forEach(([bookId, priceId]) => {
                if (priceId) {
                    StripeCheckout.setPrice(bookId, priceId);
                }
            });

            console.log(
                '%c Stripe initialized ',
                'background: #4caf50; color: white; padding: 4px 8px;'
            );
        }
    });

})();
