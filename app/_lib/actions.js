"use server";

import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCustomer(formData) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");

	if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
		throw new Error("Please provide a valid national ID");

	const updateData = { nationality, countryFlag, nationalID };

	const { data, error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", session.user.guestId);

	if (error) throw new Error("Guest could not be updated");

	revalidatePath("/account/profile");
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

export async function deleteBooking(bookingId) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");

	const guestBookings = await getBookings(session.user.guestId);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error("You are not allowed to delete this booking");

	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId);

	if (error) throw new Error("Booking could not be deleted");

	revalidatePath("/account/reservations");
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
