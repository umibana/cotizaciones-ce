import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Placeholder user data
const initialUsers = [
	{ id: 1, name: "Alice Johnson" },
	{ id: 2, name: "Bob Smith" },
	{ id: 3, name: "Charlie Brown" },
	{ id: 4, name: "Diana Ross" },
	{ id: 5, name: "Edward Norton" },
];

export default function Asignacion() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [users, setUsers] = useState(initialUsers);
	// Cambiar después por react query
	const [filterText, setFilterText] = useState("");
	const [selectedUser, setSelectedUser] = useState<number | null>(null);

	const filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(filterText.toLowerCase())
	);

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Assigning Project</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" placeholder="Project name" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="type">Type</Label>
							<Input id="type" placeholder="Project type" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="location">Location</Label>
							<Input id="location" placeholder="Project location" />
						</div>
						<div className="space-y-2">
							<Label>Assigned To</Label>
							<Input
								value={users.find((u) => u.id === selectedUser)?.name || ""}
								readOnly
								placeholder="Select a user below"
							/>
						</div>
						<Button type="submit" className="w-full" disabled={!selectedUser}>
							Assign Project
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Available Users</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Input
							placeholder="Filter users..."
							value={filterText}
							onChange={(e) => setFilterText(e.target.value)}
						/>
					</div>
					<RadioGroup
						value={selectedUser?.toString()}
						onValueChange={(value) => setSelectedUser(Number(value))}>
						{filteredUsers.map((user) => (
							<div
								key={user.id}
								className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
								<RadioGroupItem
									value={user.id.toString()}
									id={`user-${user.id}`}
								/>
								<Label htmlFor={`user-${user.id}`}>{user.name}</Label>
							</div>
						))}
					</RadioGroup>
				</CardContent>
			</Card>
		</div>
	);
}
