"use client";

import { useState } from "react";
import { Plus, Send, Trash2, X, ImageIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Img } from "react-image";
import { useQuery } from "@tanstack/react-query";
import { getMaterials } from "./actions";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Material {
	id: number;
	nombre: string;
	descripcion: string;
	precio: string;
}

interface Item extends Material {
	images: string[];
	m2?: number;
	quantity: number;
}

export default function Component() {
	const [items, setItems] = useState<Item[]>([]);
	const [descripcion, setDescripcion] = useState("");
	const [precio, setPrecio] = useState("");
	const [nombre, setNombre] = useState("");
	const [newItemImages, setNewItemImages] = useState<string[]>([]);
	const [filter, setFilter] = useState("");
	const [m2, setM2] = useState<number | undefined>(undefined);
	const [availableMaterials, setAvailableMaterials] = useState<Material[]>([]);

	const {
		data: materials,
		isLoading,
		isError,
	} = useQuery<Material[], Error>({
		queryKey: ["materials"],
		queryFn: async () => {
			const result = await getMaterials();
			if (result.error) {
				throw new Error(result.error);
			}
			const data = result.data ?? [];
			setAvailableMaterials(data);
			return data;
		},
	});

	const filteredMaterials = availableMaterials.filter((material) =>
		material.nombre.toLowerCase().includes(filter.toLowerCase())
	);

	const addCustomItem = () => {
		if (descripcion && precio) {
			setItems([
				...items,
				{
					id: Date.now(),
					nombre,
					descripcion,
					precio,
					images: newItemImages,
					m2,
					quantity: 1,
				},
			]);
			setNombre("");
			setDescripcion("");
			setPrecio("");
			setNewItemImages([]);
			setM2(undefined);
		}
	};

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>,
		itemId?: number
	) => {
		const files = event.target.files;
		if (files) {
			const newImages = Array.from(files).map((file) =>
				URL.createObjectURL(file)
			);
			if (itemId) {
				setItems(
					items.map((item) =>
						item.id === itemId
							? { ...item, images: [...item.images, ...newImages] }
							: item
					)
				);
			} else {
				setNewItemImages([...newItemImages, ...newImages]);
			}
		}
	};

	const deleteItem = (id: number) => {
		const removedItem = items.find((item) => item.id === id);
		setItems((prev) => prev.filter((item) => item.id !== id));
		if (removedItem && materials?.some((m) => m.id === removedItem.id)) {
			setAvailableMaterials((prev) => [...prev, removedItem]);
		}
	};

	const deleteImage = (itemId: number, imageIndex: number) => {
		setItems(
			items.map((item) =>
				item.id === itemId
					? {
							...item,
							images: item.images.filter((_, index) => index !== imageIndex),
					  }
					: item
			)
		);
	};

	const deleteNewImage = (index: number) => {
		setNewItemImages(newItemImages.filter((_, i) => i !== index));
	};

	const addMaterial = (material: Material) => {
		setItems([...items, { ...material, images: [], m2, quantity: 1 }]);
		setAvailableMaterials((prev) => prev.filter((m) => m.id !== material.id));
		setM2(undefined);
	};

	const calculatePrice = (price: string, m2?: number, quantity: number = 1) => {
		const basePrice = parseFloat(price);
		return (m2 ? basePrice * m2 : basePrice) * quantity;
	};

	const updateItemQuantity = (id: number, quantity: number) => {
		setItems(
			items.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
			)
		);
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<h1 className="text-3xl font-bold mb-6">Cotización</h1>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Items</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-4">
						{items.map((item) => (
							<li key={item.id} className="flex flex-col space-y-2">
								<div className="flex items-center justify-between">
									<span>
										{item.nombre} - $
										{calculatePrice(
											item.precio,
											item.m2,
											item.quantity
										).toFixed(2)}
										{item.m2 && ` (${item.m2} m²)`}
									</span>
									<div className="flex space-x-2 items-center">
										<Input
											type="number"
											value={item.quantity}
											onChange={(e) =>
												updateItemQuantity(item.id, parseInt(e.target.value))
											}
											className="w-16 h-8 text-center"
											min="1"
										/>
										<Input
											type="file"
											accept="image/*"
											onChange={(e) => handleImageUpload(e, item.id)}
											className="hidden"
											id={`image-upload-${item.id}`}
											multiple
										/>
										<Label
											htmlFor={`image-upload-${item.id}`}
											className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8">
											<ImageIcon className="h-4 w-4" />
											<span className="sr-only">
												Upload images for {item.nombre}
											</span>
										</Label>
										<Button
											variant="outline"
											size="icon"
											className="h-8 w-8"
											onClick={() => deleteItem(item.id)}>
											<Trash2 className="h-4 w-4" />
											<span className="sr-only">Delete {item.nombre}</span>
										</Button>
									</div>
								</div>
								{item.images.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{item.images.map((image, index) => (
											<div key={index} className="relative w-16 h-16">
												<Img
													src={image}
													alt={`Image ${index + 1} for ${item.nombre}`}
													className="w-full h-full object-cover rounded-md"
													loader={
														<div className="w-16 h-16 bg-gray-200 animate-pulse rounded-md" />
													}
													unloader={
														<div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
															<X className="w-6 h-6 text-gray-400" />
														</div>
													}
												/>
												<Button
													variant="destructive"
													size="icon"
													className="absolute -top-2 -right-2 h-6 w-6"
													onClick={() => deleteImage(item.id, index)}>
													<X className="h-4 w-4" />
													<span className="sr-only">
														Delete image {index + 1} for {item.descripcion}
													</span>
												</Button>
											</div>
										))}
									</div>
								)}
							</li>
						))}
					</ul>

					{isLoading ? (
						<p>Loading materials...</p>
					) : isError ? (
						<p>Error loading materials</p>
					) : (
						<div className="mt-4">
							<h3 className="text-lg font-semibold mb-2">Add Material</h3>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Search className="w-4 h-4 text-gray-500" />
									<Input
										type="text"
										placeholder="Filter materials..."
										value={filter}
										onChange={(e) => setFilter(e.target.value)}
										className="flex-grow"
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
						</div>
					)}
				</CardContent>
			</Card>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Agregar Item Extra</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="nombre">Nombre</Label>
							<Input
								id="nombre"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
								placeholder="Enter item name"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="description">Descripción</Label>
							<Textarea
								id="description"
								className="rounded-xl"
								value={descripcion}
								onChange={(e) => setDescripcion(e.target.value)}
								placeholder="Enter item description"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="price">Precio</Label>
							<Input
								className="rounded-xl"
								id="price"
								value={precio}
								onChange={(e) => setPrecio(e.target.value)}
								placeholder="Enter item price"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="m2">m² (opcional)</Label>
							<Input
								className="rounded-xl"
								id="m2"
								type="number"
								value={m2 ?? ""}
								onChange={(e) =>
									setM2(e.target.value ? parseFloat(e.target.value) : undefined)
								}
								placeholder="Enter m² (optional)"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="new-item-image">Imágenes</Label>
							<Input
								id="new-item-image"
								type="file"
								accept="image/*"
								onChange={(e) => handleImageUpload(e)}
								className="flex-grow"
								multiple
							/>
							{newItemImages.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{newItemImages.map((image, index) => (
										<div key={index} className="relative w-16 h-16">
											<Img
												src={image}
												alt={`New item image ${index + 1}`}
												className="w-full h-full object-cover rounded-md"
												loader={
													<div className="w-16 h-16 bg-gray-200 animate-pulse rounded-md" />
												}
												unloader={
													<div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
														<X className="w-6 h-6 text-gray-400" />
													</div>
												}
											/>
											<Button
												variant="destructive"
												size="icon"
												className="absolute -top-2 -right-2 h-6 w-6"
												onClick={() => deleteNewImage(index)}>
												<X className="h-4 w-4" />
												<span className="sr-only">
													Delete new image {index + 1}
												</span>
											</Button>
										</div>
									))}
								</div>
							)}
						</div>
						<Button onClick={addCustomItem} className="w-full rounded-full">
							<Plus className="h-4 w-4 mr-2" />
							Agregar
						</Button>
					</div>
				</CardContent>
			</Card>

			<Button className="w-full rounded-full">
				<Send className="h-4 w-4 mr-2" />
				Enviar Cotización
			</Button>
		</div>
	);
}
