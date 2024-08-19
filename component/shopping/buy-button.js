// component/shopping/buy-button.js
import React from 'react';
import { createCheckoutSession } from '@/server-actions/create-checkout-session';
import { checkStockAvailability } from '@/actions/stocks';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default function BuyButton() {
    const handleCheckout = async () => {
        const cart = JSON.parse(Cookies.get('cart') || '[]');

        // Vérifier la disponibilité des stocks pour chaque article dans le panier
        const isStockAvailable = await checkStockAvailability(cart);

        console.log("isStockAvailable", isStockAvailable);

        if (!isStockAvailable) {
            alert("Some items in your cart are no longer available in the desired quantity.");
            return;
        }

        const checkoutUrl = await createCheckoutSession(cart);
        if (!checkoutUrl) {
            alert("There was an error processing your checkout. Please try again.");
            return;
        }
        window.location.href = checkoutUrl;
    };

    return (
        <button onClick={handleCheckout} className="bg-green-500 text-white border-none py-4 px-8 text-center no-underline inline-block text-base my-1 mx-1 cursor-pointer rounded-full">
            Checkout
        </button>
    );
}
