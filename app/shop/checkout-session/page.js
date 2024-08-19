"use client";

// components/CheckoutSuccess.js

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function CheckoutSuccess() {
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!isProcessing) {
            setIsProcessing(true);
            async function clearCartAndAdjustStock() {
                console.log('Updating stock...');
                const cart = JSON.parse(Cookies.get('cart') || '[]');

                const response = await fetch('/api/stock', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartItems: cart }),
                });

                setTimeout(() => {
                    router.push('/shop');
                    Cookies.remove('cart');
                }, 2000);
            }

            clearCartAndAdjustStock();
        }
    }, [isProcessing]); // ajout de isProcessing dans les dépendances pour contrôler l'exécution

    return (
        <div className="container mx-auto mt-10 text-center">
            <h1 className="text-3xl font-bold mb-5">Thank you for your purchase!</h1>
            <p>Your order is being processed.</p>
        </div>
    );
}
