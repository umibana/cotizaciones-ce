import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const router = useRouter();

	const logOut = async () => {
		try {
			await signOut();
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log("An unknown error occurred");
			}
		} finally {
			router.push("/login");
		}
	};

	return (
		<div className="w-full h-14 bg-background border-b flex items-center justify-between px-4">
			<div className="flex items-center">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => router.back()}
					aria-label="Go back">
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<div className="font-semibold text-lg ml-4">Casa Experto</div>
			</div>
			<Button variant="ghost" size="sm" onClick={async () => await logOut()}>
				<LogOut className="h-4 w-4 mr-2" />
				Sign out
			</Button>
		</div>
	);
}
