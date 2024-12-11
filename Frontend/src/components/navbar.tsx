import { useAuth0 } from "@auth0/auth0-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
export default function Navbar() {
	const { isAuthenticated, isLoading, loginWithRedirect, logout, user } =
		useAuth0();

	const router = useRouter();

	return (
		<nav className="bg-muted-foreground text-muted shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Left side - Back Arrow and Logo */}
					<div className="flex items-center space-x-4">
						<Button
							onClick={() => router.back()}
							className="p-2 hover:brightness-110 rounded-full transition-transform"
							aria-label="Go back">
							<ArrowLeft className="h-5 w-5" />
						</Button>
					</div>

					{/* Center - Navigation Links */}
					<div className="hidden md:flex items-center">
						<Link href="/" className="hover:text-gray-600">
							<div className=" flex items-center">
								<img src="/casaexperto.png" alt="Logo" width={80} />
								<h1 className="text-2xl font-bold text-zinc-200">
									Casa Experto
								</h1>
							</div>
						</Link>
					</div>

					{/* Right side - Auth buttons */}
					<div className="flex items-center space-x-4">
						{isLoading ? (
							<div className="text-gray-500">Loading...</div>
						) : isAuthenticated ? (
							<div className="flex items-center space-x-4">
								{/* User Profile */}
								<div className="flex items-center space-x-2">
									{user?.picture && (
										<img
											src={user.picture}
											alt={user.name || "User"}
											className="h-8 w-8 rounded-full"
										/>
									)}
									<span className="hidden md:block">{user?.name}</span>
								</div>

								{/* Logout Button */}
								<Button
									onClick={() =>
										logout({
											logoutParams: {
												returnTo: window.location.origin,
											},
										})
									}
									className="bg-destructive hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">
									Cerrar sesión
								</Button>
							</div>
						) : (
							<Button
								onClick={() => loginWithRedirect()}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
								Login
							</Button>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
