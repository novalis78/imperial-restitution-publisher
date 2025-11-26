# Stripe Integration Setup Guide

This guide will help you set up Stripe payments for Imperial Restitution Press.

## Prerequisites

1. A Stripe account (https://stripe.com)
2. Your book product information ready

## Step 1: Get Your API Keys

1. Log in to your Stripe Dashboard
2. Go to **Developers** > **API Keys**
3. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
4. Keep your **Secret key** secure (starts with `sk_test_` or `sk_live_`)

## Step 2: Create Products in Stripe

For each book, create a product:

1. Go to **Products** in your Stripe Dashboard
2. Click **Add Product**
3. Fill in:
   - **Name**: e.g., "The Roman Art of War"
   - **Description**: Brief book description
   - **Image**: Upload book cover
   - **Price**: Set the price (e.g., $19.99)
   - **One-time** payment (not recurring)
4. After creating, copy the **Price ID** (starts with `price_`)

### Products to Create:

| Book | Suggested Price |
|------|----------------|
| The Roman Art of War | $19.99 |
| Strategemata I | $29.99 |
| Strategemata II | $29.99 |
| Strategemata III | $38.99 |
| 1983 | $19.99 |
| We Do Not Come In Peace | $24.99 |

## Step 3: Configure Your Website

### Option A: Static Configuration (Current Setup)

Edit `js/main.js` and update the `StripeCheckout.priceIds` object:

```javascript
priceIds: {
    'roman-art-of-war': 'price_YOUR_PRICE_ID_HERE',
    'strategemata-1': 'price_YOUR_PRICE_ID_HERE',
    'strategemata-2': 'price_YOUR_PRICE_ID_HERE',
    'strategemata-3': 'price_YOUR_PRICE_ID_HERE',
    '1983': 'price_YOUR_PRICE_ID_HERE',
    'oumuamua': 'price_YOUR_PRICE_ID_HERE'
}
```

Then initialize Stripe in your pages:

```html
<script>
    // Add this before </body> in your HTML pages
    StripeCheckout.init('pk_live_YOUR_PUBLISHABLE_KEY');
</script>
```

### Option B: Environment-Based (Recommended for Production)

1. Copy `.env.example` to `.env`
2. Fill in your actual keys
3. Use a build tool or server-side rendering to inject the keys

## Step 4: Configure Checkout Settings

In Stripe Dashboard:

1. Go to **Settings** > **Checkout**
2. Configure:
   - **Success URL**: `https://yourdomain.com/success.html?session_id={CHECKOUT_SESSION_ID}`
   - **Cancel URL**: `https://yourdomain.com/` (or specific book page)

## Step 5: Testing

1. Use test mode keys (pk_test_, sk_test_)
2. Use Stripe's test card numbers:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
3. Any future expiry date and any 3-digit CVC

## Step 6: Go Live

1. Complete Stripe account verification
2. Switch to live API keys
3. Test with a real (small) purchase
4. Monitor the Stripe Dashboard for orders

## Security Notes

- NEVER expose your Secret Key in client-side code
- NEVER commit `.env` files to git
- Use HTTPS in production
- The current setup uses Stripe Checkout (hosted payment page), which is the most secure option

## Support

For Stripe-specific issues, consult:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

For website issues, contact the development team.
