"use server";

import { auth, signIn, signOut } from "./auth";
import {
	createCustomerCart,
	GetCartItems,
	GetExistCartItem,
	GetShoppingCart,
	updateCustomerDb,
} from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCustomer(formData) {
	const session = await auth();
	if (!session) throw new Error("you must logged in");

	const national_id = formData.get("national_id");
	const adress = formData.get("adress");
	const phone_number = formData.get("phone_number");
	const nationality = formData.get("nationality");
	const regex = /^[A-Za-z0-9]{6,13}$/;

	if (!regex.test(national_id)) {
		throw new Error(
			"Please provide a valid national ID (6-12 alphanumeric characters)."
		);
	}

	const updatedData = { national_id, adress, phone_number, nationality };
	await updateCustomerDb(session.user.customerId, updatedData);

	revalidatePath(`/account/profile`);
	redirect(`/account/profile?success=true`);
}

export async function addToCart(formData) {
	const session = await auth();
	let customerCart = await GetShoppingCart(session.user.customerId);

	if (!customerCart) {
		customerCart = createCustomerCart(session.user.id);
	}

	const productId = formData.get("id");
	const quantity = formData.get("quantity");

	const newCartItem = {
		quantity: quantity,
		product_id: productId,
		cart_id: customerCart.id,
	};

	const existCartItem = await GetExistCartItem(customerCart.id, productId);
	if (existCartItem) {
		const updatedQuantity = +existCartItem.quantity + +quantity;
		const { data, error } = await supabase
			.from("cart_items")
			.update({ quantity: updatedQuantity })
			.eq("id", existCartItem.id)
			.single();

		revalidatePath(`/products/${productId}`);
		redirect(`/products/${productId}?success=true`);
	}

	const { data, error } = await supabase
		.from("cart_items")
		.insert([newCartItem]); // Must pass an array of objects

	// 4) Handle any errors
	if (error) {
		console.error("Error inserting cart item:", error);
		throw new Error("Cart item could not be created.");
	}

	console.log("Inserted cart item:", data);

	revalidatePath(`/products/${productId}`);
	redirect(`/products/${productId}?success=true`);
}

export async function deleteCartItem(itemId) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	const customerCart = await GetShoppingCart(session.user.customerId);
	const customerCartItems = await GetCartItems(customerCart.id);
	const customerCartItemsIds = customerCartItems.map((item) => item.id);

	if (!customerCartItemsIds.includes(itemId))
		throw new Error("You are not allowed to delete this booking");

	const { data, error } = await supabase
		.from("cart_items")
		.delete()
		.eq("id", itemId);

	if (error) throw new Error("Item could not be deleted");

	revalidatePath("/account/cart");
}

export async function incItemQuantity(itemId, amount) {
	// 1) Fetch current quantity
	const { data: item, error: fetchError } = await supabase
		.from("cart_items")
		.select("quantity")
		.eq("id", itemId)
		.single();

	if (fetchError) {
		console.error("Error fetching item:", fetchError);
		throw new Error("Could not fetch item quantity.");
	}

	const newQuantity = (item?.quantity || 0) + amount;

	// 2) Update the quantity
	const { data: updatedItem, error: updateError } = await supabase
		.from("cart_items")
		.update({ quantity: newQuantity })
		.eq("id", itemId)
		.single();

	if (updateError) {
		console.error("Error incrementing quantity:", updateError);
		throw new Error("Could not increment item quantity.");
	}

	console.log("Quantity incremented:", updatedItem);
	revalidatePath("/account/reservations");
	return updatedItem;
}

export async function decItemQuantity(itemId, amount) {
	// 1) Fetch current quantity
	const { data: item, error: fetchError } = await supabase
		.from("cart_items")
		.select("quantity")
		.eq("id", itemId)
		.single();

	if (fetchError) {
		console.error("Error fetching item:", fetchError);
		throw new Error("Could not fetch item quantity.");
	}

	if (item?.quantity <= 1) {
		return;
	}
	const newQuantity = (item?.quantity || 0) - amount;

	// 2) Update the quantity
	const { data: updatedItem, error: updateError } = await supabase
		.from("cart_items")
		.update({ quantity: newQuantity })
		.eq("id", itemId)
		.single();

	if (updateError) {
		console.error("Error incrementing quantity:", updateError);
		throw new Error("Could not increment item quantity.");
	}

	console.log("Quantity incremented:", updatedItem);
	revalidatePath("/account/reservations");
	return updatedItem;
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
