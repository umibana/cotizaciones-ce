"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import {
	useAuthenticatedQuery,
	useAuthenticatedMutation,
} from "@/hooks/useAuth";

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

// Define a type for the mutation input
type AssignWorkersInput = {
	workerIds: number[];
};

export default function Asignacion() {
	const searchParams = useSearchParams();
	const projectId = searchParams.get("id");

	// State for filters and selection
	const [selectedWorkers, setSelectedWorkers] = useState<number[]>([]);
	const [filterRole, setFilterRole] = useState<string>("");
	const [filterName, setFilterName] = useState<string>("");
	const [roles] = useState<string[]>([
		"jefe de operaciones",
		"supervisor",
		"maestro",
	]);

	// Authenticated queries
	const {
		data: projectData,
		isLoading: isProjectLoading,
		error: projectError,
	} = useAuthenticatedQuery<Project>(
		["project", projectId as string], // Cast projectId to string
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${projectId}`,
		{
			enabled: !!projectId, // Only run query if projectId exists
		}
	);

	const {
		data: workersData = [],
		isLoading: isWorkersLoading,
		error: workersError,
	} = useAuthenticatedQuery<Worker[]>(
		["workers"],
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`
	);

	// Mutation for assigning workers
	const assignWorkersMutation = useAuthenticatedMutation<AssignWorkersInput>(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${projectId}/asignar`,
		"POST"
	);

	// Filter workers based on search criteria
	const filteredWorkers = workersData.filter(
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

		assignWorkersMutation.mutate(
			{ workerIds: selectedWorkers } as unknown as void,
			{
				onSuccess: () => {
					alert("Colaboradores asignados correctamente");
					window.location.href = "/";
				},
				onError: (error) => {
					console.error("Error details:", error);
					if (error instanceof Error) {
						alert(
							`Hubo un error al asignar los colaboradores: ${error.message}`
						);
					} else {
						alert(
							`Hubo un error al asignar los colaboradores: ${JSON.stringify(
								error
							)}`
						);
					}
				},
			}
		);
	};

	// Combined loading and error states
	const isLoading = isProjectLoading || isWorkersLoading;
	const errorMessage = projectError || workersError;

	if (isLoading) return <div>Cargando proyecto...</div>;
	if (errorMessage)
		return (
			<div className="text-red-500">{(errorMessage as Error).message}</div>
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
							<Input id="name" value={projectData?.nombre || ""} readOnly />
						</div>
						<div className="space-y-2">
							<Label htmlFor="type">Descripción</Label>
							<Input
								id="type"
								value={projectData?.descripcion || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="location">Ubicación</Label>
							<Input
								id="location"
								value={projectData?.direccion || ""}
								readOnly
							/>
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
