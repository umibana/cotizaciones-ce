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
	// agregar setUsers cuando tengamos query
	const [users] = useState(initialUsers);
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
					<CardTitle>Asignación de Proyectos</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nombre</Label>
							<Input id="name" placeholder="Nombre del Proyecto" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="type">Tipo</Label>
							<Input id="type" placeholder="Tipo de Proyecto" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="location">Ubicación</Label>
							<Input id="location" placeholder="Ubicación del Proyecto" />
						</div>
						<div className="space-y-2">
							<Label>Asignado a</Label>
							<Input
								value={users.find((u) => u.id === selectedUser)?.name || ""}
								readOnly
								placeholder="Seleccione un colaborador"
							/>
						</div>
						<Button type="submit" className="w-full" disabled={!selectedUser}>
							Asignar Proyecto
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Colaboradores disponibles</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Input
							placeholder="Filtrar colaboradores..."
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
