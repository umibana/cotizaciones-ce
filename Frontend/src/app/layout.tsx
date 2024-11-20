"use client";
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { Auth0Provider } from "@auth0/auth0-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
	display: "swap",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
	display: "swap",
});

// export const metadata: Metadata = {
// 	title: "Create Next App",
// 	description: "Generated by create next app",
// };

const Providers = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			})
	);

	const redirectUri =
		typeof window !== "undefined" ? process.env.NEXT_PUBLIC_REDIRECT_URI || window.location.origin : "";
		
	return (
		<Auth0Provider
			domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
			clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
			authorizationParams={{
				redirect_uri: redirectUri,
				audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
			}}
			cacheLocation="localstorage"
			useRefreshTokens={true}
			// Add these options
			skipRedirectCallback={false}
			onRedirectCallback={(appState) => {
				// Handle redirect with the saved path
				if (appState?.returnTo && typeof appState.returnTo === "string") {
					window.location.href = appState.returnTo;
				} else {
					window.location.href = "/";
				}
			}}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Auth0Provider>
	);
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body suppressHydrationWarning={true}
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>
					{/* Sacar <ProtectedRoute> para probar sin cuenta */}
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
