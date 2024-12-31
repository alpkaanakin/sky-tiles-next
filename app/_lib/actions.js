"use server";

import { auth, signIn, signOut } from "./auth";
import {
	getBookings,
	GetCartItems,
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

export async function createOrder(orderData, formData) {
	// Optionally check server-side session again
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	// Extract form fields:
	const quantity = Number(formData.get("quantity") || 1);
	const notes = formData.get("notes")?.slice(0, 1000) ?? "";

	// Extract user + product data from orderData
	const { productId, finalPrice, userId } = orderData;

	// Build the new order object for DB insert
	const newOrder = {
		product_id: productId,
		cost: finalPrice,
		customer_id: userId,
		amount: quantity,
		notes,
		// Example: store user info if your DB schema has columns for them
		isPaid: false,
		status: "pending",
	};

	// Insert into your "orders" table
	const { error } = await supabase.from("orders").insert([newOrder]);
	if (error) throw new Error(error.message);

	// revalidate if necessary
	revalidatePath(`/products/${productId}`);

	return { success: true };
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
	console.log(data);

	revalidatePath("/account/cart");
}

export async function updateBooking(formData) {
	const bookingId = Number(formData.get("bookingId"));

	// 1) Authentication
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	// 2) Authorization
	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error("You are not allowed to update this booking");

	// 3) Building update data
	const updateData = {
		numGuests: Number(formData.get("numGuests")),
		observations: formData.get("observations").slice(0, 1000),
	};

	// 4) Mutation
	const { error } = await supabase
		.from("bookings")
		.update(updateData)
		.eq("id", bookingId)
		.select()
		.single();

	// 5) Error handling
	if (error) throw new Error("Booking could not be updated");

	// 6) Revalidation
	revalidatePath(`/account/reservations/edit/${bookingId}`);
	revalidatePath("/account/reservations");

	// 7) Redirecting
	redirect("/account/reservations");
}

export async function signInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
	await signOut({ redirectTo: "/" });
}
