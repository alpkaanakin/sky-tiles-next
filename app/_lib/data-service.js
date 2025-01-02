import { notFound } from "next/navigation";
import { supabase } from "./supabase";

/////////////
// GET

export async function getProduct(id) {
	const { data, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", id)
		.single();

	// For testing
	// await new Promise((res) => setTimeout(res, 2000));

	if (error) {
		console.error(error);
		notFound();
	}

	return data;
}

export async function GetShoppingCart(customer_id) {
	const { data, error } = await supabase
		.from("carts")
		.select("*")
		.eq("customer_id", customer_id)
		.single();

	if (error) {
		console.error(error);
	}

	return data;
}

export async function GetCartItems(cart_id) {
	const { data, error } = await supabase
		.from("cart_items")
		.select("id,quantity,price,cart_id,products(id,name,price,image)")
		.eq("cart_id", cart_id);

	if (error) {
		console.error(error);
	}

	return data;
}

export async function getProductPrice(id) {
	const { data, error } = await supabase
		.from("products")
		.select("regularPrice, discount")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
	}

	return data;
}

export const getProducts = async function () {
	const { data, error } = await supabase
		.from("products")
		.select("id, name, stock, regular_price, discount, image")
		.order("name");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
};

export async function getCustomer(email) {
	const { data, error } = await supabase
		.from("customers")
		.select("*")
		.eq("email", email)
		.single();

	return data;
}

export async function getOrder(id) {
	const { data, error, count } = await supabase
		.from("orders")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not get loaded");
	}

	return data;
}

export async function getOrders(customerId) {
	const { data, error, count } = await supabase
		.from("orders")
		// We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
		.select("*")
		.eq("customer_id", customerId);

	if (error) {
		console.error(error);
		throw new Error("Orders could not get loaded");
	}

	return data;
}

export async function getCountries() {
	try {
		const res = await fetch(
			"https://restcountries.com/v2/all?fields=name,flag"
		);
		const countries = await res.json();
		return countries;
	} catch {
		throw new Error("Could not fetch countries");
	}
}

/////////////
// CREATE

export async function createCustomer(customer) {
	const { data, error } = await supabase.from("customers").insert([customer]);

	if (error) {
		console.error(error);
		throw new Error("Guest could not be created");
	}

	return data;
}

export async function createCustomerCart(cart) {
	const { data, error } = await supabase.from("carts").insert([cart]);

	if ((data, error)) {
		console.error(error);
		throw new Error("Cart could not be created");
	}

	return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateCustomerDb(id, updatedFields) {
	const { data, error } = await supabase
		.from("customers")
		.update(updatedFields)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Guest could not be updated");
	}
	return data;
}
