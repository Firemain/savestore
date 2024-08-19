

import React, {Suspense } from 'react';
import NewBobForm from '@/component/admin/NewBobForm';
import InventoryManagement from '@/component/admin/InventoryManagement';
import { getBobs, getSizesForBob, getOrders } from '@/lib/shopping';
import Loading from './loading';
import OrderHistory from '@/component/admin/order-history';
import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function Bobs() {
    try {
        const bobs = await getBobs();  // Récupération de tous les bobs
        const sizesPromises = bobs.map(bob => getSizesForBob(bob.id)); // Création d'un tableau de promesses pour récupérer les tailles pour chaque bob
        const sizesArrays = await Promise.all(sizesPromises); // Résolution de toutes les promesses en parallèle

        // Association des tailles à chaque bob
        const bobsWithSizes = bobs.map((bob, index) => ({
            ...bob,
            sizes: sizesArrays[index]
        }));

        return <InventoryManagement bobs={bobsWithSizes} />;
    } catch (error) {
        console.error("Failed to fetch bobs or sizes", error);
        return <p>Error loading data.</p>;  // Gestion des erreurs
    }
}

async function Orders() {
    try {
        const orders = await getOrders();  // Récupération de tous les bobs*

        return <OrderHistory orders={orders} />;
    } catch (error) {
        console.error("Failed to fetch bobs or sizes", error);
        return <p>Error loading commands.</p>;  // Gestion des erreurs
    }
}





export default async function AdminPage() {
    const result = await verifyAuth();

    if(!result.user) {
        return redirect('/shop');
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center mb-8">Bob Shop Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>
                        <Suspense fallback={<Loading></Loading>}>
                            <Bobs/>
                        </Suspense>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Historique des commandes</h2>
                        <Suspense fallback={<Loading></Loading>}>
                            <Orders/>
                        </Suspense>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Add New Bob</h2>
                        <NewBobForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
