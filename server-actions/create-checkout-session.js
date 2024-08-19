// /server-actions/create-checkout-session.js
"use server";

import { stripe } from "@/lib/stripe";
import { getStripePriceId } from '@/lib/shopping'; // Fonction pour obtenir l'ID de prix Stripe

export async function createCheckoutSession(cartItems) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const line_items = cartItems.map(item => ({

        price: getStripePriceId(item.id), // Utilisez l'ID de prix Stripe
        quantity: item.quantity,
    }));

    const shipping_options = [{
        shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 340, // Frais de livraison de 3.40 EUR, spécifié en centimes
                currency: 'eur',
            },
            display_name: 'A domicile',
        }
    }];

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: `${baseUrl}/shop/checkout-session?session_id={CHECKOUT_SESSION_ID}`,  // Redirect to a custom processing page
        cancel_url: `${baseUrl}/shop/cart?canceled=true`,
        automatic_tax: {enabled: true},
        shipping_address_collection: {
            allowed_countries: ['FR'],
        },
        shipping_options,
        payment_intent_data: {
            metadata: {
                orderDetails: JSON.stringify(cartItems.map(item => ({
                    id: item.id,
                    bob: item.title,
                    size: item.size,
                    quantity: item.quantity
                })))
            }
        }
    });
    

    return session.url;
}
