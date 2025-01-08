"use client";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuthenticatedQuery } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import {useRoles} from "@/hooks/useRoles";

const ProjectDetailsPage = () => {
	const searchParams = useSearchParams();
	const projectId = searchParams.get("id");

	const queryClient = useQueryClient();

	// =============================
	//  1) FETCH DEL PROYECTO
	// =============================
	const {
		data: projectData,
		isLoading: isProjectLoading,
		error: projectError,
	} = useAuthenticatedQuery(
		["project", projectId],
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${projectId}`,
		{
			enabled: !!projectId,
			refetchOnMount: "always", 
			staleTime: 0,             
		}
	);

	// FETCH DEL CLIENTE
	const {
		data: clientData,
		isLoading: isClientLoading,
		error: clientError,
	} = useAuthenticatedQuery(
		["client", projectData?.idCliente],
		projectData?.idCliente
		? `${process.env.NEXT_PUBLIC_BACKEND_URL}/clientes/${projectData.idCliente}`
		: null,
		{
		enabled: !!projectData?.idCliente,
		}
	);

	// FETCH DEL USUARIO QUE CREÓ EL PROYECTO
	const {
		data: nombreCreador,
		isLoading: isNameLoading,
		error: nameError,
	} = useAuthenticatedQuery(
		["creador", projectData?.idUserBase],
		projectData?.idUserBase
		? `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${projectData?.idUserBase}`
		: null,
		{
		enabled: !!projectData?.idUserBase,
		}
	);
	// Bloque para determinar el rol del usuario y habilitar opciones de modificacion
	const { isAdmin, isMaestro, isSupervisor } = useRoles();
	const role = isAdmin
		? "jefe de operaciones"
		: isMaestro
			? "maestro"
			: isSupervisor
				? "supervisor"
				: null;

	// ====================================================
	//     MANEJO DE FECHAS DE TRABAJO
	// ====================================================
	const [selectedDates, setSelectedDates] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const today = startOfDay(new Date());


	// Función para parsear fechas del formato dd-MM-yyyy a Date
	const parseDate = (dateString) => {
		const [year, month, day] = dateString.split("-").map(Number); // Divide la fecha
		return new Date(year, month - 1, day); // Devuelve objeto Date
	};



	useEffect(() => {
		if (projectData && projectData.fechaDiasTrabajo) {
		  const initialDates = projectData.fechaDiasTrabajo.map(parseDate);
		  setSelectedDates(initialDates);
		}
	  }, [projectData]);

	const formatDateForBackend = (date) => {
		return format(new Date(date), "dd-MM-yyyy");
	};
	const handleDateChange = async (dates) => {
		const filteredDates = dates.filter(
			(date) => !isBefore(startOfDay(new Date(date)), today)
		);

		if (filteredDates.length !== dates.length) {
			setErrorMessage("No puedes seleccionar fechas pasadas.");
		} else {
			setErrorMessage("");
		}

		setSelectedDates(filteredDates);

		// Transformar las fechas al formato requerido por el backend
		const formattedDates = filteredDates.map(formatDateForBackend);
		await updateProjectDates(projectId, formattedDates);
	};
	const resetDates = () => {
		setSelectedDates([]);
		setErrorMessage("");
	};

	const updateProjectDates = async (projectId, dates) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/diastrabajo/${projectId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dates),
				}
			);
			if (!response.ok) {
				throw new Error("Error al actualizar las fechas.");
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (isProjectLoading || isClientLoading) return <p>Cargando...</p>;
	if (projectError || clientError) return <p>Error al cargar los datos.</p>;

	return (
		<div className="container mx-auto p-4 max-w-4xl">
			{/* Project Details */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Detalles del Proyecto</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="nombre">Nombre del proyecto</Label>
							<Input
								id="nombre"
								type="text"
								value={projectData?.nombre || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="direccion">Dirección</Label>
							<Input
								id="direccion"
								type="text"
								value={projectData?.direccion || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="descripcion">Descripción</Label>
							<Input
								id="descripcion"
								type="text"
								value={projectData?.descripcion || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="estado">Estado</Label>
							<Input
								id="estado"
								type="text"
								value={projectData?.estado || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="estado">Fecha visita tecnica</Label>
							<Input
								id="estado"
								type="date"
								value={projectData?.fechaVisita || ""}
								readOnly
							/>
						</div>
						<div>
							<Label htmlFor="fechaDiasTrabajo">Días de Trabajo</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={`w-full justify-start text-left font-normal group ${
											!selectedDates.length && "text-muted-foreground"
										}`}>
										<CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
											<div className="text-sm overflow-x-auto scrollbar-hide scrollbar-thin whitespace-nowrap">
												{selectedDates.length > 0 ? (
													[...selectedDates]
														.sort((a, b) => {
															// Validar que a y b sean objetos Date
															const dateA = a instanceof Date ? a : new Date(a);
															const dateB = b instanceof Date ? b : new Date(b);

															// Comparar fechas usando getTime()
															return dateA.getTime() - dateB.getTime();
														})
														.map((date) => {
															// Asegurarnos de que cada fecha se renderice correctamente
															const validDate = date instanceof Date ? date : new Date(date);
															return format(validDate, "dd-MM-yy");
														})
														.join(", ")
												) : (
													<span>Elige las fechas</span>
												)}
											</div>
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto h-auto">
									<Calendar
										mode="multiple"
										selected={selectedDates}
										onSelect={(dates) => {
											if (role === "jefe de operaciones" || role === "supervisor") {
												handleDateChange(dates);
											}
										}}
										disabled={(date) => isBefore(startOfDay(date), today)}
										locale={es}
										weekStartsOn={1}
										classNames={{
											day_selected:
												"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
											day_today: "bg-accent opacity-70 text-accent-foreground",
											day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
										}}
									/>
								</PopoverContent>
							</Popover>
							{errorMessage && (
								<p className="text-red-500 text-sm">{errorMessage}</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Client Details */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Detalles del Cliente</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="clienteNombre">Nombre</Label>
							<Input
								id="clienteNombre"
								type="text"
								value={clientData?.nombre || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="rut">RUT</Label>
							<Input
								id="rut"
								type="text"
								value={clientData?.rut || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="telefono">Teléfono</Label>
							<Input
								id="telefono"
								type="text"
								value={clientData?.telefono || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="text"
								value={clientData?.email || ""}
								readOnly
							/>
						</div>
					</div>
				</CardContent>
			</Card>
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Autor de creacion de proyecto</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="clienteNombre">Nombre</Label>
							<Input
								id="clienteNombre"
								type="text"
								value={nombreCreador?.name || ""}
								readOnly
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="clienteNombre">Rol</Label>
							<Input
								id="clienteNombre"
								type="text"
								value={nombreCreador?.role || ""}
								readOnly
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProjectDetailsPage;
