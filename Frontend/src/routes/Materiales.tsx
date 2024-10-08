"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

type Material = {
	id: number;
	name: string;
	pricePerM2: number;
};

export default function Materiales() {
	const [materials, setMaterials] = useState<Material[]>([
		{ id: 1, name: "Wood", pricePerM2: 15 },
		{ id: 2, name: "Steel", pricePerM2: 25 },
		{ id: 3, name: "Glass", pricePerM2: 30 },
	]);
	const [newMaterial, setNewMaterial] = useState({ name: "", pricePerM2: "" });
	const [filterText, setFilterText] = useState("");
	const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

	const filteredMaterials = materials.filter((material) =>
		material.name.toLowerCase().includes(filterText.toLowerCase())
	);

	const handleAddMaterial = () => {
		if (newMaterial.name && newMaterial.pricePerM2) {
			setMaterials([
				...materials,
				{
					id: materials.length + 1,
					name: newMaterial.name,
					pricePerM2: parseFloat(newMaterial.pricePerM2),
				},
			]);
			setNewMaterial({ name: "", pricePerM2: "" });
		}
	};

	const handleUpdateMaterial = () => {
		if (editingMaterial) {
			setMaterials(
				materials.map((m) =>
					m.id === editingMaterial.id ? editingMaterial : m
				)
			);
			setEditingMaterial(null);
		}
	};

	const handleDeleteMaterial = () => {
		if (editingMaterial) {
			setMaterials(materials.filter((m) => m.id !== editingMaterial.id));
			setEditingMaterial(null);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Material Data</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								value={newMaterial.name}
								onChange={(e) =>
									setNewMaterial({ ...newMaterial, name: e.target.value })
								}
								placeholder="Material name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="price">Price per m²</Label>
							<Input
								id="price"
								type="number"
								value={newMaterial.pricePerM2}
								onChange={(e) =>
									setNewMaterial({ ...newMaterial, pricePerM2: e.target.value })
								}
								placeholder="Price per m²"
							/>
						</div>
						<Button
							type="button"
							onClick={handleAddMaterial}
							className="w-full">
							Add Material
						</Button>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Material List</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Input
							placeholder="Filter materials..."
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
									{material.name} - ${material.pricePerM2}/m²
								</span>
								<Button onClick={() => setEditingMaterial(material)}>
									Update
								</Button>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>

			<Dialog
				open={!!editingMaterial}
				onOpenChange={() => setEditingMaterial(null)}>
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
									value={editingMaterial.name}
									onChange={(e) =>
										setEditingMaterial({
											...editingMaterial,
											name: e.target.value,
										})
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="edit-price">Price per m²</Label>
								<Input
									id="edit-price"
									type="number"
									value={editingMaterial.pricePerM2}
									onChange={(e) =>
										setEditingMaterial({
											...editingMaterial,
											pricePerM2: parseFloat(e.target.value),
										})
									}
								/>
							</div>
						</div>
					)}
					<DialogFooter className="sm:justify-between">
						<Button variant="destructive" onClick={handleDeleteMaterial}>
							Delete
						</Button>
						<div>
							<Button
								variant="outline"
								onClick={() => setEditingMaterial(null)}
								className="mr-2">
								Cancel
							</Button>
							<Button onClick={handleUpdateMaterial}>Save changes</Button>
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
