"use client";
import { useAuthenticatedQuery } from "../../hooks/useAuth";
import { useAuth0 } from "@auth0/auth0-react";

// Update the type to match backend response
interface TestResponse {
	message: string;
}

export default function AuthTest() {
	const { user, isAuthenticated, isLoading } = useAuth0();

	// Note: Your namespace is missing a closing quote in the trigger
	const namespace = "https://dev-gzxs2a0e4ed1d517.us.auth0.com";

	// Try to get roles from the custom claim
	const userRoles = user?.[`${namespace}/roles`] || [];

	// Debug logs
	console.log("Full user object:", user);
	console.log("User roles:", userRoles);

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

	/// FETCH y pasarle el bearer token
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
				<div>
					Hello {user?.name}, {JSON.stringify(user)}
				</div>
			</div>

			{/* Display roles */}
			<div className="mt-4">
				<h3 className="font-semibold">User Roles:</h3>
				{isLoading ? (
					<p>Loading...</p>
				) : isAuthenticated ? (
					<div>
						{userRoles.length > 0 ? (
							<ul className="list-disc pl-5">
								{userRoles.map((role: string) => (
									<li key={role}>{role}</li>
								))}
							</ul>
						) : (
							<p>No roles assigned</p>
						)}
					</div>
				) : (
					<p>Please log in to view roles</p>
				)}
			</div>

			{/* Debug information */}
			<div className="mt-4">
				<h3 className="font-semibold">Debug Info:</h3>
				<pre className="bg-gray-100 p-2 rounded text-sm">
					{JSON.stringify({ user, roles: userRoles }, null, 2)}
				</pre>
			</div>
		</div>
	);
}
