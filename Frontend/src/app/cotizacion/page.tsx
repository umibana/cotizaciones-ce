"use client";

import { useState } from "react";
import { Plus, Send, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Material {
	id: number;
	nombre: string;
	descripcion: string;
	precio: string;
}

interface MaterialItem extends Material {
	quantity: number;
}

interface ExtraItem {
	nombre: string;
	descripcion: string;
	precio: string;
	m2?: number;
}

export default function QuotationForm() {
	const [materials, setMaterials] = useState<MaterialItem[]>([]);
	const [extraItems, setExtraItems] = useState<ExtraItem[]>([]);
	const [extraItemForm, setExtraItemForm] = useState<ExtraItem>({
		nombre: "",
		descripcion: "",
		precio: "",
	});
	const [filter, setFilter] = useState("");
	const [quotationName, setQuotationName] = useState("");
	const [quotationDescription, setQuotationDescription] = useState("");

	const {
		data: availableMaterials,
		isLoading,
		isError,
	} = useQuery<Material[], Error>({
		queryKey: ["materials"],
		queryFn: async () => {
			return;

			const result = await getMaterials();
			if (result.error) throw new Error(result.error);
			return result.data ?? [];
		},
	});

	const filteredMaterials =
		availableMaterials?.filter((material) =>
			material.nombre.toLowerCase().includes(filter.toLowerCase())
		) ?? [];

	const addMaterial = (material: Material) => {
		setMaterials((prev) => {
			const existingMaterial = prev.find((m) => m.id === material.id);
			if (existingMaterial) {
				return prev.map((m) =>
					m.id === material.id ? { ...m, quantity: m.quantity + 1 } : m
				);
			} else {
				return [...prev, { ...material, quantity: 1 }];
			}
		});
	};

	const updateMaterialQuantity = (id: number, quantity: number) => {
		setMaterials((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
			)
		);
	};

	const removeMaterial = (id: number) => {
		setMaterials((prev) => prev.filter((item) => item.id !== id));
	};

	const addExtraItem = () => {
		if (
			extraItemForm.nombre &&
			extraItemForm.descripcion &&
			extraItemForm.precio
		) {
			setExtraItems((prev) => [...prev, extraItemForm]);
			setExtraItemForm({ nombre: "", descripcion: "", precio: "" });
		}
	};

	const removeExtraItem = (index: number) => {
		setExtraItems((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmitQuotation = async (event: React.FormEvent) => {
		return;

		event.preventDefault();
		const quotationData = {
			nombre: quotationName,
			descripcion: quotationDescription,
			materials: materials.map(({ id, quantity }) => ({ id, quantity })),
			extraItems,
		};

		const result = await createQuotation(quotationData);

		if (result.error) {
			toast.error("Failed to create quotation. Please try again.");
		} else {
			toast.success(`Quotation created with ID: ${result.quotationId}`);
			// Reset form
			setMaterials([]);
			setExtraItems([]);
			setQuotationName("");
			setQuotationDescription("");
		}
	};

	return (
		<form
			onSubmit={handleSubmitQuotation}
			className="container mx-auto p-4 max-w-2xl">
			<h1 className="text-3xl font-bold mb-6">Cotización</h1>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Detalles de la Cotización</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<Label htmlFor="quotationName">Nombre de la Cotización</Label>
							<Input
								id="quotationName"
								value={quotationName}
								onChange={(e) => setQuotationName(e.target.value)}
								placeholder="Ingrese el nombre de la cotización"
								required
							/>
						</div>
						<div>
							<Label htmlFor="quotationDescription">
								Descripción de la Cotización
							</Label>
							<Textarea
								id="quotationDescription"
								value={quotationDescription}
								onChange={(e) => setQuotationDescription(e.target.value)}
								placeholder="Ingrese la descripción de la cotización"
								required
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Materiales</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-4 mb-4">
						{materials.map((item) => (
							<li
								key={`material-${item.id}`}
								className="flex items-center justify-between">
								<span>
									{item.nombre} - ${parseFloat(item.precio) * item.quantity}
								</span>
								<div className="flex items-center space-x-2">
									<Input
										type="number"
										value={item.quantity}
										onChange={(e) =>
											updateMaterialQuantity(item.id, parseInt(e.target.value))
										}
										className="w-16 h-8 text-center"
										min="1"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() => removeMaterial(item.id)}>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</li>
						))}
					</ul>

					{isLoading ? (
						<p>Loading materials...</p>
					) : isError ? (
						<p>Error loading materials</p>
					) : (
						<div>
							<div className="flex items-center space-x-2 mb-2">
								<Search className="w-4 h-4 text-gray-500" />
								<Input
									type="text"
									placeholder="Filter materials..."
									value={filter}
									onChange={(e) => setFilter(e.target.value)}
								/>
							</div>
							<ScrollArea className="h-60 w-full rounded-md border p-4">
								{filteredMaterials.map((material) => (
									<Button
										key={material.id}
										onClick={() => addMaterial(material)}
										className="w-full justify-start mb-2">
										<Plus className="h-4 w-4 mr-2" />
										{material.nombre} - ${material.precio}
									</Button>
								))}
							</ScrollArea>
						</div>
					)}
				</CardContent>
			</Card>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Items Extra</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-4 mb-4">
						{extraItems.map((item, index) => (
							<li
								key={`extra-${index}`}
								className="flex items-center justify-between">
								<span>
									{item.nombre} - ${item.precio}
									{item.m2 && ` (${item.m2} m²)`}
								</span>
								<Button
									variant="outline"
									size="icon"
									onClick={() => removeExtraItem(index)}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</li>
						))}
					</ul>
					<div className="space-y-4">
						<div>
							<Label htmlFor="extraItemName">Nombre</Label>
							<Input
								id="extraItemName"
								value={extraItemForm.nombre}
								onChange={(e) =>
									setExtraItemForm((prev) => ({
										...prev,
										nombre: e.target.value,
									}))
								}
								placeholder="Nombre del item extra"
							/>
						</div>
						<div>
							<Label htmlFor="extraItemDescription">Descripción</Label>
							<Textarea
								id="extraItemDescription"
								value={extraItemForm.descripcion}
								onChange={(e) =>
									setExtraItemForm((prev) => ({
										...prev,
										descripcion: e.target.value,
									}))
								}
								placeholder="Descripción del item extra"
							/>
						</div>
						<div>
							<Label htmlFor="extraItemPrice">Precio</Label>
							<Input
								id="extraItemPrice"
								value={extraItemForm.precio}
								onChange={(e) =>
									setExtraItemForm((prev) => ({
										...prev,
										precio: e.target.value,
									}))
								}
								placeholder="Precio del item extra"
							/>
						</div>
						<div>
							<Label htmlFor="extraItemM2">m² (opcional)</Label>
							<Input
								id="extraItemM2"
								type="number"
								value={extraItemForm.m2 ?? ""}
								onChange={(e) =>
									setExtraItemForm((prev) => ({
										...prev,
										m2: e.target.value ? parseFloat(e.target.value) : undefined,
									}))
								}
								placeholder="m² del item extra (opcional)"
							/>
						</div>
						<Button onClick={addExtraItem} className="w-full">
							<Plus className="h-4 w-4 mr-2" />
							Agregar Item Extra
						</Button>
					</div>
				</CardContent>
			</Card>

			<Button type="submit" className="w-full">
				<Send className="h-4 w-4 mr-2" />
				Enviar Cotización
			</Button>
		</form>
	);
}
