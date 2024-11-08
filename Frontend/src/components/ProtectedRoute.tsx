import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

	useQuery({
		queryKey: ["auth-check"],
		queryFn: async () => {
			if (!isAuthenticated) {
				await loginWithRedirect({
					appState: { returnTo: window.location.pathname },
				});
				return null;
			}
			return true;
		},
		enabled: !isLoading && !isAuthenticated,
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-gray-500">Loading...</div>
			</div>
		);
	}

	return isAuthenticated ? <>{children}</> : null;
}
