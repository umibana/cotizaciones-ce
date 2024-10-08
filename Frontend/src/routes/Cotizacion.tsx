import { useState } from "react";
import { Plus, Send, Trash2, X, ImageIcon } from "lucide-react";
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
import { Img } from "react-image";

interface Item {
	id: number;
	description: string;
	price: string;
	images: string[];
}

const predefinedItems: Item[] = [
	{
		id: 1,
		description: "Item 1",
		price: "10.00",
		images: [],
	},
	{
		id: 2,
		description: "Item 2",
		price: "20.00",
		images: [],
	},
	{
		id: 3,
		description: "Item 3",
		price: "30.00",
		images: [],
	},
	{
		id: 4,
		description: "Item 4",
		price: "40.00",
		images: [],
	},
	{
		id: 5,
		description: "Item 5",
		price: "50.00",
		images: [],
	},
];

export default function Component() {
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [newItemImages, setNewItemImages] = useState<string[]>([]);

	const addCustomItem = () => {
		if (description && price) {
			setItems([
				...items,
				{
					id: Date.now(),
					description,
					price,
					images: [],
				},
			]);
			setDescription("");
			setPrice("");
			setNewItemImages([]);
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
	const deleteImage = (itemId: number, imageIndex: number) => {
		setItems(
			items.map((item) =>
				item.id === itemId
					? {
							...item,
							images: item.images
								? item.images.filter((_, index) => index !== imageIndex)
								: [],
					  }
					: item
			)
		);
	};
	const deleteNewImage = (index: number) => {
		setNewItemImages(newItemImages.filter((_, i) => i !== index));
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
										{item.description} - ${item.price}
									</span>
									<div className="flex space-x-2">
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
											className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10">
											<ImageIcon className="h-4 w-4" />
											<span className="sr-only">
												Upload images for {item.description}
											</span>
										</Label>
										<Button
											variant="outline"
											size="icon"
											onClick={() => deleteItem(item.id)}>
											<Trash2 className="h-4 w-4" />
											<span className="sr-only">Delete {item.description}</span>
										</Button>
									</div>
								</div>
								{item.images && item.images.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{item.images.map((image, index) => (
											<div key={index} className="relative w-16 h-16">
												<Img
													src={image}
													alt={`Image ${index + 1} for ${item.description}`}
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
														Delete image {index + 1} for {item.description}
													</span>
												</Button>
											</div>
										))}
									</div>
								)}
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
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="new-item-image">Images</Label>
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
