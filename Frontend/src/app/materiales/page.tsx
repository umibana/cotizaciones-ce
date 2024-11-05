"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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

export default function Materiales() {
	const [filterText, setFilterText] = useState("");
	const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
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

	const materials = [
		{ nombre: "hello", id: 1, precio: 1000, descripcion: "lol" },
	];

	const filteredMaterials = materials!.filter((material) =>
		material.nombre.toLowerCase().includes(filterText.toLowerCase())
	);

	const handleAddMaterial = async (formData: FormData) => {
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

	const handleUpdateMaterial = async () => {
		return;
		// if (editingMaterial) {
		// 	startTransition(async () => {
		// 		const result = await updateMaterial(editingMaterial.id, {
		// 			nombre: editingMaterial.nombre,
		// 			descripcion: editingMaterial.descripcion,
		// 			precio: editingMaterial.precio,
		// 		});
		// 		if (result.error) {
		// 			toast(result.error);
		// 		} else if (result.success) {
		// 			toast.success("Material updated successfully");
		// 			getMaterials();
		// 			setEditingMaterial(null);
		// 		}
		// 	});
		// }
	};

	const handleDeleteMaterial = async () => {
		return;
		// if (editingMaterial) {
		// 	startTransition(async () => {
		// 		const result = await deleteMaterial(editingMaterial.id);
		// 		if (result.error) {
		// 			toast(result.error);
		// 		} else if (result.success) {
		// 			toast(result.error);
		// 			getMaterials();
		// 			setEditingMaterial(null);
		// 		}
		// 	});
		// }
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl">
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

			<Card>
				<CardHeader>
					<CardTitle>Lista de Materiales</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Input
							placeholder="Filtrar materiales..."
							value={filterText}
							onChange={(e) => setFilterText(e.target.value)}
						/>
					</div>
					<ul className="space-y-2">
						{filteredMaterials.map((material) => (
							<li
								key={material.id}
								className="flex justify-between items-center p-2 bg-secondary rounded-md">
								<span>
									{material.nombre} - ${material.precio}/m²
								</span>
								<Button onClick={() => setEditingMaterial(material)}>
									Actualizar
								</Button>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>

			<Dialog
				open={!!editingMaterial}
				onOpenChange={(open) => !open && setEditingMaterial(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit Material</DialogTitle>
						<DialogDescription>
							Make changes to the material or delete it.
						</DialogDescription>
					</DialogHeader>
					{editingMaterial && (
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="edit-name">Name</Label>
								<Input
									id="edit-name"
									value={editingMaterial.nombre}
									onChange={(e) =>
										setEditingMaterial({
											...editingMaterial,
											nombre: e.target.value,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-price">Price per m²</Label>
								<Input
									id="edit-price"
									type="number"
									value={editingMaterial.precio}
									onChange={(e) =>
										setEditingMaterial({
											...editingMaterial,
											precio: Number.parseFloat(e.target.value),
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-descripcion">Descripción</Label>
								<Input
									id="edit-descripcion"
									value={editingMaterial.descripcion || ""}
									onChange={(e) =>
										setEditingMaterial({
											...editingMaterial,
											descripcion: e.target.value,
										})
									}
								/>
							</div>
						</div>
					)}
					<DialogFooter className="sm:justify-between">
						<Button
							variant="destructive"
							onClick={handleDeleteMaterial}
							disabled={isPending}>
							{isPending ? "Deleting..." : "Delete"}
						</Button>
						<div>
							<Button
								variant="outline"
								onClick={() => setEditingMaterial(null)}
								className="mr-2">
								Cancel
							</Button>
							<Button onClick={handleUpdateMaterial} disabled={isPending}>
								{isPending ? "Saving..." : "Save changes"}
							</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
