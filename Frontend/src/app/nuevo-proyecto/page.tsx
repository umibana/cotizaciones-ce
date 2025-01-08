"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthenticatedMutation } from "@/hooks/useAuth";
import { useAuth0 } from "@auth0/auth0-react";

// Add a type for the API response
type ProjectResponse = {
	success: boolean;
	message?: string;
	error?: string;
};

type proyectoData = {
	nombre: string;
	descripcion: string;
	direccion: string;
	estado: string;
	fechaVisita: Date | undefined;
	clienteCorreo: string;
	clienteRut: string;
	clienteNombre: string;
	clienteNumero: string;
	clienteDireccion: string;
	idCreador: string | undefined;
};

export default function NuevoProyecto() {
	const usuario_info = useAuth0();
	const usuario_info_email = usuario_info?.user?.email ?? null;

	const [userId, setUserId] = useState<string | null>(null);
	const getUserId = async (email: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/idporemail`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email: email }),
				}
			);

			if (response.ok) {
				const idUser = await response.json();
				setUserId(idUser); // Establecer el ID en el estado
				console.log("se logro");
			} else {
				console.error("Error al obtener el ID del usuario");
			}
		} catch (error) {
			console.error("Error al hacer la solicitud:", error);
		}
	};

	if (usuario_info_email && !userId) {
		getUserId(usuario_info_email);
	}

	const [proyecto, setProyecto] = useState<proyectoData>({
		nombre: "",
		descripcion: "",
		direccion: "",
		estado: "Sin asignar",
		fechaVisita: undefined,
		clienteNombre: "",
		clienteRut: "",
		clienteNumero: "",
		clienteCorreo: "",
		clienteDireccion: "",
		idCreador: userId,
	});

	// Obtener los datos de la API usando hook de useAuth

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProyecto((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (date: Date | undefined) => {
		setProyecto((prev) => ({ ...prev, fechaVisita: date }));
	};

	// Specify both input and output types
	const createProjectMutation = useAuthenticatedMutation<
		ProjectResponse,
		proyectoData
	>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/nuevo`);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Asigna el ID del creador (userId) al proyecto antes de enviarlo
		const proyectoConId = {
			...proyecto,
			idCreador: userId?.toString() ?? undefined, // Asigna el ID si está disponible
		};

		createProjectMutation.mutate(proyectoConId, {
			onSuccess: () => {
				alert("Proyecto creado exitosamente!");
				handleClear();
				window.location.href = "/";
			},
			onError: (error) => {
				console.error("Error creando el proyecto:", error);
				alert("Error al crear el proyecto");
			},
		});
	};

	const handleClear = () => {
		setProyecto({
			nombre: "",
			descripcion: "",
			direccion: "",
			estado: "",
			fechaVisita: undefined,
			clienteNombre: "",
			clienteRut: "",
			clienteNumero: "",
			clienteCorreo: "",
			clienteDireccion: "",
			idCreador: "",
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="container mx-auto p-4 max-w-2xl space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Nuevo Proyecto</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="nombre">Nombre del Proyecto</Label>
						<Input
							id="nombre"
							name="nombre"
							value={proyecto.nombre}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="descripcion">Descripción</Label>
						<Input
							id="descripcion"
							name="descripcion"
							value={proyecto.descripcion}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="direccion">Dirección</Label>
						<Input
							id="direccion"
							name="direccion"
							value={proyecto.direccion}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label>Fecha Visita</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal",
										!proyecto.fechaVisita && "text-muted-foreground"
									)}>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{proyecto.fechaVisita ? (
										format(proyecto.fechaVisita, "PPP")
									) : (
										<span>Elige una fecha</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									className=" text-pretty"
									mode="single"
									selected={proyecto.fechaVisita}
									onSelect={handleDateChange}
								/>
							</PopoverContent>
						</Popover>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Contacto del Cliente</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="clienteName">Nombre del Cliente</Label>
						<Input
							id="clienteNombre"
							name="clienteNombre"
							value={proyecto.clienteNombre}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="clienteNumber">Número del Cliente</Label>
						<Input
							id="clienteNumero"
							name="clienteNumero"
							value={proyecto.clienteNumero}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="clienteCorreo">Correo del Cliente</Label>
						<Input
							id="clienteCorreo"
							name="clienteCorreo"
							type="email"
							value={proyecto.clienteCorreo}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="clienteRut">RUT del Cliente</Label>
						<Input
							id="clienteRut"
							name="clienteRut"
							value={proyecto.clienteRut}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="clienteDireccion">Dirección del Cliente</Label>
						<Input
							id="clienteDireccion"
							name="clienteDireccion"
							value={proyecto.clienteDireccion}
							onChange={handleInputChange}
							required
						/>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-end space-x-4">
				<Button type="button" variant="outline" onClick={handleClear}>
					Cancelar
				</Button>
				<Button type="submit">Registrar proyecto</Button>
			</div>
		</form>
	);
}
