"use client";

import { useState } from "react";
import SubmitButton from "./SubmitButton";
import { updateCustomer } from "../_lib/actions";

function UpdateProfileForm({ customer, children, success }) {
	const {
		fullName,
		email,
		nationality,
		national_id,
		countryFlag,
		phone_number,
	} = customer;

	return (
		<form
			action={updateCustomer}
			className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
		>
			<div className="space-y-2">
				<label>Full name</label>
				<input
					disabled
					defaultValue={fullName}
					name="fullName"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					disabled
					defaultValue={email}
					name="email"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label htmlFor="phone_number">Phone Number</label>
				<input
					defaultValue={phone_number}
					name="phone_number"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label htmlFor="national_id">National ID number</label>
				<input
					defaultValue={national_id}
					name="national_id"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
				/>
			</div>

			<div className="space-y-2">
				<label htmlFor="nationality">Nationality</label>
				{children}
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="adress">Your Adress</label>
				</div>
				<input
					defaultValue={national_id}
					name="adress"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
				/>
			</div>

			<div className="flex justify-end items-center gap-6">
				<SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
			</div>
			{success && (
				<p className="text-green-500">Customer updated successfully!</p>
			)}
		</form>
	);
}

export default UpdateProfileForm;
