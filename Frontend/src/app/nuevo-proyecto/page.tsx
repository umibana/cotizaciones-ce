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

type ProjectData = {
	name: string;
	context: string;
	tipo: string;
	ubicacion: string;
	imagen: string | null;
	fechaVisita: Date | undefined;
	clienteName: string;
	clienteNumber: string;
	clienteCorreo: string;
};

export default function NuevoProyecto() {
	const [projectData, setProjectData] = useState<ProjectData>({
		name: "",
		context: "",
		tipo: "",
		ubicacion: "",
		imagen: null,
		fechaVisita: undefined,
		clienteName: "",
		clienteNumber: "",
		clienteCorreo: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProjectData((prev) => ({ ...prev, [name]: value }));
	};

	const handleDateChange = (date: Date | undefined) => {
		setProjectData((prev) => ({ ...prev, fechaVisita: date }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Submitting project data:", projectData);
		// Here you would typically send the data to your backend
	};
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setProjectData((prev) => ({ ...prev, imagen: imageUrl }));
		}
	};

	const handleClear = () => {
		setProjectData({
			name: "",
			context: "",
			tipo: "",
			ubicacion: "",
			imagen: null,
			fechaVisita: undefined,
			clienteName: "",
			clienteNumber: "",
			clienteCorreo: "",
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
						<Label htmlFor="name">Nombre</Label>
						<Input
							id="name"
							name="name"
							value={projectData.name}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="context">Contexto</Label>
						<Input
							id="context"
							name="context"
							value={projectData.context}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="tipo">Tipo</Label>
						<Input
							id="tipo"
							name="tipo"
							value={projectData.tipo}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="ubicacion">Ubicación</Label>
						<Input
							id="ubicacion"
							name="ubicacion"
							value={projectData.ubicacion}
							onChange={handleInputChange}
							required
						/>
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
						{projectData.imagen && (
							<div className="mt-2">
								<Img
									src={projectData.imagen}
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

					<div className="space-y-2">
						<Label>Fecha Visita</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-full justify-start text-left font-normal",
										!projectData.fechaVisita && "text-muted-foreground"
									)}>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{projectData.fechaVisita ? (
										format(projectData.fechaVisita, "PPP")
									) : (
										<span>Elige una fecha</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									className=" text-pretty"
									mode="single"
									selected={projectData.fechaVisita}
									onSelect={handleDateChange}
									initialFocus
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
							id="clienteName"
							name="clienteName"
							value={projectData.clienteName}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="clienteNumber">Número del Cliente</Label>
						<Input
							id="clienteNumber"
							name="clienteNumber"
							value={projectData.clienteNumber}
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
							value={projectData.clienteCorreo}
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
