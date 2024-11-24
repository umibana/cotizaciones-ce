"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
// Placeholder user data
// const initialUsers = [
// 	{ id: 1, name: "Alice Johnson" },
// 	{ id: 2, name: "Bob Smith" },
// 	{ id: 3, name: "Charlie Brown" },
// 	{ id: 4, name: "Diana Ross" },
// 	{ id: 5, name: "Edward Norton" },
// ];

interface Worker {
	idUser: number;
	name: string;
	role: string;
}

interface Project {
	nombre: string;
	descripcion: string;
	direccion: string;
}

export default function Asignacion() {
	const searchParams = useSearchParams();
	const projectId = searchParams.get("id"); // Obtener ID del proyecto de la URL

	// Comentado porque no se usa por ahora

	// const [users] = useState(initialUsers);
	// const [filterText, setFilterText] = useState("");
	// const [selectedUser, setSelectedUser] = useState<number | null>(null);
	const [project, setProject] = useState<Project | null>(null); // Estado para guardar los datos del proyecto
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	// const filteredUsers = users.filter((user) =>
	// 	user.name.toLowerCase().includes(filterText.toLowerCase())
	// );

	//Seccion para trabajar con el filtro de trabajadores
	const [workers, setWorkers] = useState([]); // Para almacenar los colaboradores
	const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]); // Para almacenar los IDs seleccionados

	const [roles] = useState<string[]>([
		"Jefe de operaciones",
		"Supervisor",
		"Maestro",
	]); // Roles disponibles
	const [filterRole, setFilterRole] = useState<string>(""); // Filtro por rol
	const [filterName, setFilterName] = useState<string>(""); // Filtro por nombre

	const filteredWorkers = workers.filter(
		(worker: Worker) =>
			worker.name.toLowerCase().includes(filterName.toLowerCase()) &&
			(filterRole ? worker.role === filterRole : true)
	);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (selectedWorkers.length === 0) {
			alert("Debe seleccionar al menos un colaborador");
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8080/api/proyectos/${projectId}/asignar`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ workerIds: selectedWorkers }),
				}
			);

			if (!response.ok) {
				throw new Error("Error al asignar colaboradores al proyecto");
			}

			alert("Colaboradores asignados correctamente");
		} catch (err) {
			alert(`Hubo un error al asignar los colaboradores${err}`);
		}
	};

	// Cargar los datos del proyecto
	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/proyectos/${projectId}`
				);
				if (!response.ok) {
					throw new Error("Error al obtener los datos del proyecto");
				}
				const data = await response.json();
				setProject(data);
				setIsLoading(false);
			} catch (err) {
				setError(
					`No se pudo cargar la información del proyecto ${projectId}: ${err}`
				);
				setIsLoading(false);
			}
		};

		if (projectId) {
			fetchProject();
		}
	}, [projectId]);

	useEffect(() => {
		const fetchWorkers = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/users/all"); // Cambia esta URL según tu API
				if (!response.ok) {
					throw new Error("Error al obtener los colaboradores");
				}
				const data = await response.json();
				setWorkers(data); // Almacena los colaboradores en el estado
			} catch (err) {
				setError(
					`No se pudo cargar la información de los colaboradores, ${err}`
				);
			}
		};

		fetchWorkers();
	}, []);

	// Mostrar loading/error
	if (isLoading) return <div>Cargando proyecto...</div>;
	if (error) return <div className="text-red-500">{error}</div>;

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
							<Input id="name" value={project?.nombre || ""} readOnly />
						</div>
						<div className="space-y-2">
							<Label htmlFor="type">Descripción</Label>
							<Input id="type" value={project?.descripcion || ""} readOnly />
						</div>
						<div className="space-y-2">
							<Label htmlFor="location">Ubicación</Label>
							<Input id="location" value={project?.direccion || ""} readOnly />
						</div>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Trabajadores disponibles</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Input
							placeholder="Filtrar por nombre..."
							value={filterName}
							onChange={(e) => setFilterName(e.target.value)}
						/>
						<select
							value={filterRole}
							onChange={(e) => setFilterRole(e.target.value)}
							className="mt-2">
							<option value="">Elegir filtro por rol</option>
							{roles.map((role) => (
								<option key={role} value={role}>
									{role}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						{filteredWorkers.map((worker: Worker) => (
							<div
								key={worker.idUser}
								className="flex items-center space-x-2 p-2 bg-secondary rounded-md">
								<input
									type="checkbox"
									id={`worker-${worker.idUser}`}
									checked={selectedWorkers.includes(worker.idUser)}
									onChange={() => {
										setSelectedWorkers((prevSelected) =>
											prevSelected.includes(worker.idUser)
												? prevSelected.filter((id) => id !== worker.idUser)
												: [...prevSelected, worker.idUser]
										);
									}}
								/>
								<Label htmlFor={`worker-${worker.idUser}`}>
									{worker.name} ({worker.role})
								</Label>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Button
				type="submit"
				className="w-full"
				disabled={selectedWorkers.length === 0}
				onClick={handleSubmit}>
				Asignar
			</Button>
		</div>
	);
}
