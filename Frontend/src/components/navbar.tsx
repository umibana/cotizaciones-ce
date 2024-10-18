import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const router = useRouter();

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
				<div className="font-semibold text-lg ml-4">Logo</div>
			</div>
			<Button variant="ghost" size="sm">
				<LogOut className="h-4 w-4 mr-2" />
				Sign out
			</Button>
		</div>
	);
}
