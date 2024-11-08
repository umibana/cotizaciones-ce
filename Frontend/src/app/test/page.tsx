"use client";
import { useAuth, useAuthenticatedQuery } from "../../hooks/useAuth";

// Update the type to match backend response
interface TestResponse {
	message: string;
}

export default function AuthTest() {
	// Update type parameter for useAuthenticatedQuery
	const {
		data: publicData,
		isLoading: publicLoading,
		error: publicError,
	} = useAuthenticatedQuery<TestResponse>(
		["public-test"],
		"http://localhost:8080/api/public/test"
	);

	// Update type parameter for useAuthenticatedQuery
	const {
		data: privateData,
		isLoading: privateLoading,
		error: privateError,
	} = useAuthenticatedQuery<TestResponse>(
		["private-test"],
		"http://localhost:8080/api/private/test"
	);

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Auth Test</h2>

			<div className="mb-4">
				<h3 className="font-semibold">Public Endpoint:</h3>
				{publicLoading && <p>Loading public data...</p>}
				{publicError && (
					<p className="text-red-500">
						Error:{" "}
						{publicError instanceof Error
							? publicError.message
							: "Unknown error"}
					</p>
				)}
				{publicData && <p>{publicData.message}</p>}
			</div>
			<div>
				<h3 className="font-semibold">Private Endpoint:</h3>
				{privateLoading && <p>Loading private data...</p>}
				{privateError && (
					<p className="text-red-500">
						Error:{" "}
						{privateError instanceof Error
							? privateError.message
							: "Unknown error"}
					</p>
				)}
				{privateData && <p>{privateData.message}</p>}
			</div>
		</div>
	);
}
