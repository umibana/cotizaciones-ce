"use client";

import { useState } from "react";
import { Plus, Image, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface Item {
	id: number;
	description: string;
	price: string;
}

const predefinedItems: Item[] = [
	{ id: 1, description: "Item 1", price: "10.00" },
	{ id: 2, description: "Item 2", price: "20.00" },
	{ id: 3, description: "Item 3", price: "30.00" },
	{ id: 4, description: "Item 4", price: "40.00" },
	{ id: 5, description: "Item 5", price: "50.00" },
];

export default function Component() {
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	const addCustomItem = () => {
		if (description && price) {
			setItems([...items, { id: Date.now(), description, price }]);
			setDescription("");
			setPrice("");
		}
	};

	const addImage = (id: number) => {
		// Implement image addition logic here
		console.log(`Add image to item ${id}`);
	};

	const handleItemSelection = (itemId: number) => {
		setSelectedItems((prev) =>
			prev.includes(itemId)
				? prev.filter((id) => id !== itemId)
				: [...prev, itemId]
		);
	};

	const addSelectedItems = () => {
		const newItems = predefinedItems.filter((item) =>
			selectedItems.includes(item.id)
		);
		setItems((prev) => [...prev, ...newItems]);
		setSelectedItems([]);
	};

	const deleteItem = (id: number) => {
		setItems((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<h1 className="text-3xl font-bold mb-6">Cotización</h1>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Items</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2">
						{items.map((item) => (
							<li key={item.id} className="flex justify-between items-center">
								<span>
									{item.description} - ${item.price}
								</span>
								<div className="flex space-x-2">
									<Button
										variant="outline"
										size="icon"
										onClick={() => addImage(item.id)}>
										<Image className="h-4 w-4" />
										<span className="sr-only">
											Add image to {item.description}
										</span>
									</Button>
									<Button
										variant="outline"
										size="icon"
										onClick={() => deleteItem(item.id)}>
										<Trash2 className="h-4 w-4" />
										<span className="sr-only">Delete {item.description}</span>
									</Button>
								</div>
							</li>
						))}
					</ul>
					<Dialog>
						<DialogTrigger asChild>
							<Button className="mt-4 rounded-full">
								<Plus className="h-4 w-4 mr-2" />
								Add Predefined Item
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px] ">
							<DialogHeader>
								<DialogTitle>Add Predefined Items</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								{predefinedItems.map((item) => (
									<div key={item.id} className="flex items-center space-x-2">
										<Checkbox
											id={`item-${item.id}`}
											checked={selectedItems.includes(item.id)}
											onCheckedChange={() => handleItemSelection(item.id)}
										/>
										<Label
											htmlFor={`item-${item.id}`}
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
											{item.description} - ${item.price}
										</Label>
									</div>
								))}
							</div>
							<Button onClick={addSelectedItems}>Add Selected Items</Button>
						</DialogContent>
					</Dialog>
				</CardContent>
			</Card>

			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Add Custom Item</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								className=" rounded-xl"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Enter item description"
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="price">Price</Label>
							<Input
								className=" rounded-xl"
								id="price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								placeholder="Enter item price"
							/>
						</div>
						<Button variant="outline" className="w-full rounded-full">
							<Image className="h-4 w-4 mr-2" />
							Subir Imagen
						</Button>

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
