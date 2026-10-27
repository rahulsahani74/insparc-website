# Shopify WhatsApp Cart Recovery — Implementation Guide

### Overview
This workflow listens for abandoned checkouts from Shopify, waits 30 minutes, checks if the customer purchased, and if not, triggers a WhatsApp message via Meta Cloud API with a 1-click cart restore link.

### Meta WhatsApp Template Copy
Submit this template in your Meta WhatsApp Manager under Marketing > Cart Recovery:
- **Template Name**: `abandoned_cart_recovery_10`
- **Category**: Marketing
- **Language**: English (US)
- **Body**:
  `Hey {{1}}, you left something in your shopping bag! Complete your order today and get {{2}} your total order.`
- **Button**:
  - Type: URL (Dynamic)
  - Text: `Complete Checkout`
  - URL: `https://yourstore.com/cart/{{1}}`

