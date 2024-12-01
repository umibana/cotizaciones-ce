"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRoles } from "@/hooks/useRoles";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaTrash } from "react-icons/fa";
import { useAuthenticatedQuery } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Interfaces de typescript
interface ProjectListProps {
	projects: any[]; // Reemplazar con la interfaz de proyecto cuando esté lista
	onAssign?: (id: string) => void;
	onReview?: (id: string) => void;
	role: "admin" | "maestro" | "supervisor";
}

const UnassignedProjectList = ({
	projects,
	onAssign,
	role,
}: ProjectListProps) => {
	return (
		<Card className="flex-1">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Proyectos sin asignar</CardTitle>
				{role === "admin" && (
					<Link href="/nuevo-proyecto">
						<Button size="default" aria-label="Crear nueva cotización">
							Crear Nuevo Proyecto
						</Button>
					</Link>
				)}
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[200px] w-full rounded-md border p-4">
					{projects.map((project: any) => (
						<div
							key={project.idProyecto}
							className="mb-2 flex items-center justify-between rounded-lg bg-muted p-2">
							<span className="text-lg font-bold">{project.nombre}</span>
							<div className="flex gap-2">
								<Button size="sm">Crear Cotización</Button>
								{(role === "admin" || role === "supervisor") && (
									<Link
										href={{
											pathname: "/asignacion",
											query: { id: project.idProyecto },
										}}>
										<Button size="sm">Asignar</Button>
									</Link>
								)}
								{role === "admin" ||
									(role === "supervisor" && (
										<Button size="sm" onClick={() => onAssign?.(project.id)}>
											<FaTrash />
										</Button>
									))}
							</div>
						</div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const AssignedProjectList = ({
	projects,
	onReview,
}: // role,
ProjectListProps) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Proyectos asignados</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[200px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.idProyecto}
						className="mb-2 flex items-center justify-between bg-muted  p-2">
						<span className="text-lg font-bold">{project.nombre}</span>
						<Badge>En progreso</Badge>
						<div className="flex items-center gap-2">
							<span className="font-medium">${project.price}</span>
							<Link
								href={{
									pathname: "/revisar-cotizacion",
									query: { id: project.idProyecto },
								}}>
								<Button size="sm">Revisar Cotizacion</Button>
							</Link>
							<Button size="sm" onClick={() => onReview?.(project.id)}>
								Revisar Proyecto
							</Button>
						</div>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

export const AdminCard = ({ role }) => {
	if (role !== "admin") return null;

	return (
		<Card className="flex-1">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Administración</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-2 flex items-center justify-between bg-muted p-2">
					<span className="text-lg font-bold">Gestión de Usuarios</span>
					<div className="flex gap-2">
						<Link href="/admin">
							<Button size="sm" aria-label="Gestión de usuarios">
								Administrar
							</Button>
						</Link>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

interface ProyectosProps {
	role: "admin" | "maestro" | "supervisor";
}

function Proyectos({ role }: ProyectosProps) {
	// Endpoint de la API según el rol, deberia cambiarse después
	const endpoint = role === "maestro" ? "/proyectos/all" : "/proyectos/all";

	// Obtener los datos de la API usando hook de useAuth
	const { data, isLoading, error } = useAuthenticatedQuery<any[]>(
		["projects", role],
		`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
		{
			staleTime: 0,
			cacheTime: 0,
			refetchOnMount: true,
		}
	);

	if (isLoading) return <div className="text-center p-4">Cargando...</div>;

	if (error)
		return (
			<div className="text-center p-4 text-red-500">
				Hubo un error al cargar los proyectos, intente de nuevo:{" "}
				{(error as Error).message}
			</div>
		);

	// Aca esta temporal, deberia manejarse diferente si es maestro
	const projects = {
		unassigned:
			role === "maestro"
				? []
				: data?.filter((project) => project.estado === "Sin asignar") ?? [],
		assigned:
			role === "maestro"
				? data ?? []
				: data?.filter((project) => project.estado !== "Sin asignar") ?? [],
	};

	return (
		<div className="container mx-auto p-4 space-y-4">
			{(role === "admin" || role === "supervisor") && (
				<UnassignedProjectList
					projects={projects.unassigned}
					// onAssign={handleAssign}
					role={role}
				/>
			)}
			<AssignedProjectList
				projects={projects.assigned}
				// onReview={handleReview}
				role={role}
			/>
			<AdminCard role={role} />
		</div>
	);
}

function App() {
	const { isAdmin, isMaestro, isSupervisor, isAuthenticated } = useRoles();

	// Si no está autenticado, no se muestra nada
	if (!isAuthenticated) {
		return <p>No tienes permisos para acceder a esta vista</p>;
	}

	// Determinar el rol del usuario
	const role = isAdmin
		? "admin"
		: isMaestro
		? "maestro"
		: isSupervisor
		? "supervisor"
		: null;

	if (!role) {
		return <p>No tienes permisos para acceder a esta vista</p>;
	}

	return (
		<div className="flex flex-auto align-middle flex-col justify-center items-center container mx-auto p-4 space-y-4">
			<Proyectos role={role} />
		</div>
	);
}

export default App;
