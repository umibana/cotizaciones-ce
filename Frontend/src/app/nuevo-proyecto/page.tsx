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
import { Img } from "react-image";
import { useMutation } from "@tanstack/react-query";

type proyectoData = {
	nombre: string;
	descripcion: string;
	direccion: string;
	imagen: string | null;
	fechaVisita: Date | undefined;
	clienteCorreo: string;
	clienteRut: string;
	clienteNombre: string;
	clienteNumero: string;
	clienteDireccion: string;
};

const createProject = async (proyectoData: proyectoData) => {
	try {
		const proyectoDTO = {
			...proyectoData,
			imagenes: proyectoData.imagen ? [proyectoData.imagen] : [],
		};

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/nuevo`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(proyectoDTO),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to create project");
		}

		const data = await response.json();
		return { success: true, message: data };
	} catch (error) {
		console.error("Error creating project:", error);
		return { success: false, error: (error as Error).message };
	}
};

export default function NuevoProyecto() {
	const [proyecto, setProyecto] = useState<proyectoData>({
		nombre: "",
		descripcion: "",
		direccion: "",
		imagen: null,
		fechaVisita: undefined,
		clienteNombre: "",
		clienteRut: "",
		clienteNumero: "",
		clienteCorreo: "",
		clienteDireccion: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProyecto((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (date: Date | undefined) => {
		setProyecto((prev) => ({ ...prev, fechaVisita: date }));
	};

	const createProjectMutation = useMutation({
		mutationFn: createProject,
		onSuccess: (data) => {
			if (data.success) {
				handleClear();
				// Add success notification here if needed
			}
		},
		onError: (error) => {
			console.error("Error creating project:", error);
			// Add error notification here if needed
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createProjectMutation.mutate(proyecto);
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setProyecto((prev) => ({ ...prev, imagen: imageUrl }));
		}
	};

	const handleClear = () => {
		setProyecto({
			nombre: "",
			descripcion: "",
			direccion: "",
			imagen: null,
			fechaVisita: undefined,
			clienteNombre: "",
			clienteRut: "",
			clienteNumero: "",
			clienteCorreo: "",
			clienteDireccion: "",
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
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<div className="space-y-2">
						<Label htmlFor="imagen">Imagen del Proyecto</Label>
						<Input
							id="imagen"
							name="imagen"
							type="file"
							accept="image/*"
							onChange={handleImageUpload}
						/>
						{proyecto.imagen && (
							<div className="mt-2">
								<Img
									src={proyecto.imagen}
									alt="Project Image"
									className="w-32 h-32 object-cover rounded-md"
									loader={
										<div className="w-32 h-32 bg-gray-200 animate-pulse rounded-md" />
									}
									unloader={
										<div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
											<span className="text-gray-400">Error loading image</span>
										</div>
									}
								/>
							</div>
						)}
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
				<Button type="submit">Enviar Solicitud</Button>
			</div>
		</form>
	);
}
