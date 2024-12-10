"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { useQuery } from "@tanstack/react-query";

interface Material {
	id: number;
	nombre: string;
	precio: number;
	descripcion?: string;
}

// interface MaterialesProps {
// 	isDialog?: boolean;
// 	onMaterialAdd?: (material: Material) => void;
// }

export default function Materiales({ isDialog = false, onMaterialAdd }) {
	const [isPending] = useTransition();

	// const {
	// 	data: materials,
	// 	// isLoading,
	// 	// isError,
	// } = useQuery<Material[]>({
	// 	queryKey: ["materials"],
	// 	queryFn: async () => {
	// 		const result = await fetch();
	// 		// fetch(servidor)

	// 		if (result.error) {
	// 			throw new Error(result.error);
	// 		}
	// 		return result.data || [];
	// 	},
	// });

	const handleAddMaterial = async (
		formDataOrEvent: FormData | React.FormEvent
	) => {
		if (isDialog) {
			const event = formDataOrEvent as React.FormEvent;
			event.preventDefault();
			event.stopPropagation();

			const form = event.target as HTMLFormElement;
			const formData = new FormData(form);

			// Create new material object from form data
			const newMaterial: Material = {
				id: Date.now(), // Temporary ID until backend integration
				nombre: formData.get("nombre") as string,
				precio: Number(formData.get("precio")),
				descripcion: formData.get("descripcion") as string,
			};

			// Call the callback if it exists
			onMaterialAdd?.(newMaterial);

			// Reset form
			form.reset();

			return;
		}

		const formData = formDataOrEvent as FormData;
		console.log(formData);
		// startTransition(async () => {
		// 	return;
		// 	const result = await addMaterial(formData);
		// 	if (result.error) {
		// 		toast(result.error);
		// 	} else if (result.success) {
		// 		toast.success("Material added successfully");
		// 		getMaterials();
		// 	}
		// });
	};

	return isDialog ? (
		<div className="space-y-6">
			<form
				onSubmit={handleAddMaterial}
				className="space-y-4"
				onClick={(e) => e.stopPropagation()}>
				<div className="space-y-2">
					<Label htmlFor="nombre">Nombre</Label>
					<Input
						id="nombre"
						name="nombre"
						placeholder="Material nombre"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="precio">Precio per m²</Label>
					<Input
						id="precio"
						name="precio"
						type="number"
						placeholder="Precio por m²"
						required
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="descripcion">Descripción</Label>
					<Input
						id="descripcion"
						name="descripcion"
						placeholder="Descripción del material"
					/>
				</div>
				<Button type="submit" className="w-full" disabled={isPending}>
					{isPending ? "Agregando..." : "Agregar material"}
				</Button>
			</form>
		</div>
	) : (
		<Card className="mb-8">
			<CardHeader>
				<CardTitle>Creación de Materiales</CardTitle>
			</CardHeader>
			<CardContent>
				<form action={handleAddMaterial} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="nombre">Nombre</Label>
						<Input
							id="nombre"
							name="nombre"
							placeholder="Material nombre"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="precio">Precio per m²</Label>
						<Input
							id="precio"
							name="precio"
							type="number"
							placeholder="Precio por m²"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="descripcion">Descripción</Label>
						<Input
							id="descripcion"
							name="descripcion"
							placeholder="Descripción del material"
						/>
					</div>
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Agregando..." : "Agregar material"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
