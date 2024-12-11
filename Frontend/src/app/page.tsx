"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRoles } from "@/hooks/useRoles";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaTrash } from "react-icons/fa";
import { useAuthenticatedQuery } from "@/hooks/useAuth";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";

/* eslint-disable @typescript-eslint/no-explicit-any */

// Interfaces de typescript
interface ProjectListProps {
	projects: any[]; // Reemplazar con la interfaz de proyecto cuando esté lista
	onAssign?: (id: string) => void;
	onReview?: (id: string) => void;
	role: "jefe de operaciones" | "maestro" | "supervisor";
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
				{role === "jefe de operaciones" && (
					<Link href="/nuevo-proyecto">
						<Button size="default" aria-label="Crear nueva cotización">
							Crear Nuevo Proyecto
						</Button>
					</Link>
				)}
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[350px] w-full rounded-md border p-4">
					{projects.map((project: any) => (
						<div
							key={project.idProyecto}
							className="mb-2 flex items-center justify-between rounded-lg bg-muted p-2">
							<span className="md:text-lg font-bold">{project.nombre}</span>
							<div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
								{/* Dropdown Menu */}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="sm">Acciones</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Opciones</DropdownMenuLabel>
										<DropdownMenuItem>
											<Link
												href={{
													pathname: "/asignacion",
													query: {id: project.idProyecto},
												}}>
												Asignar
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Link
												href={{
													pathname: "/revisar-proyecto",
													query: { id: project.idProyecto },
												}}>
												Revisar Proyecto
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator/>
										{/* Aquí puedes agregar más opciones si es necesario */}
									</DropdownMenuContent>
								</DropdownMenu>
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
								 role,
							 }: ProjectListProps) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Proyectos asignados</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[350px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.idProyecto}
						className="mb-2 flex flex-wrap items-center justify-between bg-muted p-2">
						{/* Nombre del proyecto con texto truncado en pantallas pequeñas */}
						<span className="md:text-lg font-bold w-full sm:w-auto overflow-hidden text-ellipsis">
							{project.nombre}
						</span>
						<div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
							{/* Dropdown Menu */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="sm">Acciones</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Opciones</DropdownMenuLabel>
									<DropdownMenuItem>
										<Link
											href={{
												pathname: "/cotizacion",
												query: { id: project.idProyecto },
											}}>
											Crear Cotización
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link
											href={{
												pathname: "/revisar-proyecto",
												query: { id: project.idProyecto },
											}}>
											Revisar Proyecto
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									{/* Aquí puedes agregar más opciones si es necesario */}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

const ProyectosCotizados = ({ projects,role }: ProjectListProps) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Proyectos cotizados</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[350px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.idProyecto}
						className="mb-2 flex flex-wrap items-center justify-between bg-muted p-2">
						{/* Nombre del proyecto con texto truncado en pantallas pequeñas */}
						<span className="text-lg font-bold w-full sm:w-auto overflow-hidden text-ellipsis">
							{project.nombre}
						</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="sm">Acciones</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Opciones</DropdownMenuLabel>
								{(role === "jefe de operaciones" || role === "supervisor" ) && (<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-cotizacion",
											query: { id: project.idProyecto },
										}}>
										Actualizar: Aprobado
									</Link>
								</DropdownMenuItem>)}
								<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-cotizacion",
											query: { id: project.idProyecto },
										}}>
										Revisar Cotización
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-proyecto",
											query: { id: project.idProyecto },
										}}>
										Revisar Proyecto
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								{/* Aquí puedes agregar más opciones si es necesario */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

const ProyectosAprobados = ({ projects, role}: ProjectListProps) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Proyectos aprobados</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[350px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.idProyecto}
						className="mb-2 flex flex-wrap items-center justify-between bg-muted p-2">
						{/* Nombre del proyecto con texto truncado en pantallas pequeñas */}
						<span className="text-lg font-bold w-full sm:w-auto overflow-hidden text-ellipsis">
							{project.nombre}
						</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="sm">Acciones</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Opciones</DropdownMenuLabel>
								{(role === "jefe de operaciones" || role === "supervisor" ) && (<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-cotizacion",
											query: { id: project.idProyecto },
										}}>
										Actualizar: Terminado
									</Link>
								</DropdownMenuItem>)}
								<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-cotizacion",
											query: { id: project.idProyecto },
										}}>
										Revisar Cotización
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-proyecto",
											query: { id: project.idProyecto },
										}}>
										Revisar Proyecto
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								{/* Aquí puedes agregar más opciones si es necesario */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

const ProyectosTerminados = ({ projects, role }: ProjectListProps) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Proyectos terminados</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[350px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.idProyecto}
						className="mb-2 flex flex-wrap items-center justify-between bg-muted p-2">
						{/* Nombre del proyecto con texto truncado en pantallas pequeñas */}
						<span className="text-lg font-bold w-full sm:w-auto overflow-hidden text-ellipsis">
							{project.nombre}
						</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="sm">Acciones</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Opciones</DropdownMenuLabel>
								<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-cotizacion",
											query: { id: project.idProyecto },
										}}>
										Revisar Cotización
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link
										href={{
											pathname: "/revisar-proyecto",
											query: { id: project.idProyecto },
										}}>
										Revisar Proyecto
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								{/* Aquí puedes agregar más opciones si es necesario */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

export const AdminCard = ({ role }) => {
	if (role !== "jefe de operaciones") return null;

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
	role: "jefe de operaciones" | "maestro" | "supervisor";
}

function Proyectos({ role }: ProyectosProps) {
	// Estado para controlar el filtro seleccionado de proyectos
	const [selectedFilter, setSelectedFilter] = useState<string>(() => {
		switch (role) {
			case "maestro":
				return "Cotizado";
			case "supervisor":
				return "Preparacion cotizacion";
			case "jefe de operaciones":
				return "Sin asignar";
			default:
				return "Terminado";
		}
	});

	// Endpoint de la API según el rol, deberia cambiarse después
	const endpoint =
		role === "maestro" || role === "supervisor"
			? "/proyectos/asignadosEmail"
			: role === "jefe de operaciones"
			? "/proyectos/all"
			: null;

	const usuario_info = useAuth0();
	const usuario_info_email = usuario_info?.user?.email ?? null;
	// console.log(usuario_info_email);
	const requestBody =
		endpoint === "/proyectos/asignadosEmail"
			? { email: usuario_info_email }
			: undefined;

	// Obtener los datos de la API usando hook de useAuth
	const { data, isLoading, error } = useAuthenticatedQuery<any[]>(
		["projects", role],
		`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
		{
			queryFn: async () => {
				const requestConfig: RequestInit = {
					method: requestBody ? "POST" : "GET",
					headers: {
						"Content-Type": "application/json",
					},
				};

				if (requestBody) {
					requestConfig.body = JSON.stringify(requestBody);
				}

				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
					requestConfig
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			},
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
			data?.filter((project) => project.estado === "Sin asignar") ?? [],
		assigned:
			data?.filter((project) => project.estado === "Preparacion cotizacion") ??
			[],
		cotizados: data?.filter((project) => project.estado === "Cotizado") ?? [],
		aprobados: data?.filter((project) => project.estado === "Aprobado") ?? [],
		terminados: data?.filter((project) => project.estado === "Terminado") ?? [],
	};

	return (
		<div className="container mx-auto p-4 space-y-4">
			{/* Botones de filtros con flechas */}
			<div className="flex flex-wrap items-center gap-2 mb-4">
				{role === "jefe de operaciones" && (
				<Button
					size="sm"
					variant={selectedFilter === "Sin asignar" ? "default" : "outline"}
					onClick={() => setSelectedFilter("Sin asignar")}
					className={
						selectedFilter === "Sin asignar"
							? "bg-red-500 text-white"
							: "bg-white text-red-500 border border-red-500"
					}>
					Sin asignar ({projects.unassigned.length})
				</Button>)
				}

				{/* Flecha */}
				{role === "jefe de operaciones" && (
					<span className="text-muted-foreground">→</span>)}

				{(role === "jefe de operaciones" || role === "supervisor" ) && (<Button
					size="sm"
					variant={
						selectedFilter === "Preparacion cotizacion" ? "default" : "outline"
					}
					onClick={() => setSelectedFilter("Preparacion cotizacion")}
					className={
						selectedFilter === "Preparacion cotizacion"
							? "bg-orange-500 text-white"
							: "bg-white text-orange-500 border border-orange-500"
					}>
					Preparacion cotizacion ({projects.assigned.length})
				</Button>)}

				{/* Flecha */}
				{(role === "jefe de operaciones" || role === "supervisor" ) && (<span className="text-muted-foreground">→</span>)}

				<Button
					size="sm"
					variant={selectedFilter === "Cotizado" ? "default" : "outline"}
					onClick={() => setSelectedFilter("Cotizado")}
					className={
						selectedFilter === "Cotizado"
							? "bg-cyan-500 text-white"
							: "bg-white text-cyan-500 border border-cyan-500"
					}>
					Cotizado ({projects.cotizados.length})
				</Button>

				{/* Flecha */}
				<span className="text-muted-foreground">→</span>

				<Button
					size="sm"
					variant={selectedFilter === "Aprobado" ? "default" : "outline"}
					onClick={() => setSelectedFilter("Aprobado")}
					className={
						selectedFilter === "Aprobado"
							? "bg-green-500 text-white"
							: "bg-white text-green-500 border border-green-500"
					}>
					Aprobado ({projects.aprobados.length})
				</Button>

				{/* Flecha */}
				<span className="text-muted-foreground">→</span>

				<Button
					size="sm"
					variant={selectedFilter === "Terminado" ? "default" : "outline"}
					onClick={() => setSelectedFilter("Terminado")}
					className={
						selectedFilter === "Terminado"
							? "bg-gray-500 text-white"
							: "bg-white text-gray-500 border border-gray-500"
					}>
					Terminado ({projects.terminados.length})
				</Button>
			</div>

			{/* Renderizado condicional basado en el filtro seleccionado */}
			{selectedFilter === "Sin asignar" && role === "jefe de operaciones" && (
				<UnassignedProjectList projects={projects.unassigned} role={role} />
			)}
			{selectedFilter === "Preparacion cotizacion" && (role === "jefe de operaciones" || role === "supervisor" ) && (
				<AssignedProjectList projects={projects.assigned} role={role} />
			)}
			{selectedFilter === "Cotizado" && (
				<ProyectosCotizados projects={projects.cotizados} role={role}/>
			)}
			{selectedFilter === "Aprobado" && <ProyectosAprobados projects={projects.aprobados}/>}
			{selectedFilter === "Terminado" && <ProyectosTerminados projects={projects.terminados}/>}

			{/* Mostrar la tarjeta de administración si corresponde */}
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
		? "jefe de operaciones"
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
