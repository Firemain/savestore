
"use server";

import { updateOrAddSize, deleteSizeOfBob, checkStock } from "@/lib/shopping";

export default async function updateBob(formData) {
    console.log("formData", formData);
    const bobId = formData.get("bobId");
    const size = formData.get("size");
    const stock = formData.get("stock");

    await updateOrAddSize(bobId, size, stock);

}

export async function removeSizeAction(formData) {
    console.log("formData remove", formData);
    const bobId = formData.get("bobId");
    const size = formData.get("size");

    await deleteSizeOfBob(bobId, size);
}

export async function checkStockAvailability(cartItems) {
    // Assurez-vous de résoudre la promesse avant de retourner la valeur
    const result = await checkStock(cartItems);
    console.log("result available", result.isStockAvailable);
    return result.isStockAvailable;
}
