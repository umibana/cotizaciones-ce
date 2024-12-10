"use client";

import { useEffect, useState } from "react";
import { Plus, Send, Trash2, Search, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { pdf } from "@react-pdf/renderer";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Materiales from "../materiales/page";

import { QuotationPDF } from "./GenerarPdf";

interface ApiMaterial {
	idMaterial: number;
	nombre: string;
	descripcion: string;
	precio: number;
}

interface Material {
	id: number;
	nombre: string;
	descripcion: string;
	precio: number;
}

interface MaterialItem extends Material {
	quantity: number;
}

interface ExtraItem {
	nombre: string;
	descripcion: string;
	precio: number;
	m2?: number;
}

interface ManoObraDTO {
	nombreMaterial: string;
	areaTrabajarM2: number;
	rendimientoMaterialM2: number;
	costoMaterialUnitario: number;
	manoObraPorM2: number;
  }

interface CotizacionRequestDTO {
	nombre: string;
	descripcion: string;
	notas: string;
	idProyecto?: number;
	materials: { idMaterial: number; cantidad: number }[];
	extraItems: {
		nombre: string;
		descripcion: string;
		metros?: number;
		precio: number;
	}[];
	manoObras: ManoObraDTO[];
	validezOferta: number;
	condPagoAdelantado: number;
	condPagoContraEntrega: number;
	plazoDeEntrega: number;

}

const getMaterials = async (): Promise<Material[]> => {
	const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/materiales/all`;
	console.log(url);
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data: ApiMaterial[] = await response.json();

	return data.map((item) => ({
		id: item.idMaterial,
		...item,
	}));
};
const createQuotation = async (quotationData: CotizacionRequestDTO) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/cotizaciones/crear`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(quotationData),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to create quotation");
		}

		const data = await response.json();
		return { success: true, message: data };
	} catch (error) {
		console.error("Error creating quotation:", error);
		return { success: false, error: (error as Error).message };
	}
};

export default function QuotationForm() {
	const [materials, setMaterials] = useState<MaterialItem[]>([]);
	const [extraItems, setExtraItems] = useState<ExtraItem[]>([]);
	const [filter, setFilter] = useState("");
	const [quotationName, setQuotationName] = useState("");
	const [quotationDescription, setQuotationDescription] = useState("");
	const [materialesOpen, setMaterialesOpen] = useState(false);
	const [quotationNotes, setQuotationNotes] = useState("");
	const [validezOferta, setValidezOferta] = useState(10);
	const [condPagoAdelantado, setCondPagoAdelantado] = useState(50);
	const [condPagoContraEntrega, setCondPagoContraEntrega] = useState(50);
	const [plazoDeEntrega, setplazoDeEntrega] = useState(15);
	const [manoObras, setManoObras] = useState<ManoObraDTO[]>([]);

	const [manoObraOpen, setManoObraOpen] = useState(false);
	const [manoObraTemp, setManoObraTemp] = useState<ManoObraDTO>({
	nombreMaterial: "",
	areaTrabajarM2: 0,
	rendimientoMaterialM2: 0,
	costoMaterialUnitario: 0,
	manoObraPorM2: 0,
	});

	useEffect(() => {
		if (condPagoAdelantado + condPagoContraEntrega > 100) {
		  toast.error("El porcentaje total no puede superar el 100%");
		}
	  }, [condPagoAdelantado, condPagoContraEntrega]);

	const {
		data: availableMaterials,
		isLoading,
		isError,
	} = useQuery<Material[], Error>({
		queryKey: ["materials"],
		queryFn: async () => {
			const result = await getMaterials();
			return result ?? [];
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

	const addManoObra = () => {
		setManoObras((prev) => [
		  ...prev,
		  {
			nombreMaterial: "",
			areaTrabajarM2: 0,
			rendimientoMaterialM2: 0,
			costoMaterialUnitario: 0,
			manoObraPorM2: 0,
		  },
		]);
	};

	const updateManoObra = (index: number, field: keyof ManoObraDTO, value: any) => {
		setManoObras((prev) => {
		  const updated = [...prev];
		  updated[index] = { ...updated[index], [field]: value };
		  return updated;
		});
	};

	const removeManoObra = (index: number) => {
		setManoObras((prev) => prev.filter((_, i) => i !== index));
	};
	

	const removeMaterial = (id: number) => {
		setMaterials((prev) => prev.filter((item) => item.id !== id));
	};

	const validatePayments = (): boolean => {
		const total = condPagoAdelantado + condPagoContraEntrega;
		if (total !== 100) {
		  toast.error(`El porcentaje total debe ser 100%. Actualmente es ${total}%`);
		  return false;
		}
		return true;
	  };

	const handleSubmitQuotation = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!validatePayments()) return;

		const quotationData: CotizacionRequestDTO = {
			nombre: quotationName,
			descripcion: quotationDescription,
			materials: materials.map(({ id, quantity }) => ({
				idMaterial: id,
				cantidad: quantity,
			})),
			extraItems: extraItems.map((item) => ({
				nombre: item.nombre,
				descripcion: item.descripcion,
				metros: item.m2,
				precio: item.precio,
			})),
			manoObras: manoObras,
			notas: quotationNotes,
			validezOferta: validezOferta,
			condPagoAdelantado: condPagoAdelantado,
			condPagoContraEntrega: condPagoContraEntrega,
			plazoDeEntrega: plazoDeEntrega,
		};

		console.log(quotationData);
		const result = await createQuotation(quotationData);

		if (result.error) {
			toast.error("Failed to create quotation. Please try again.");
		} else {
			toast.success(`Quotation created with ID: ${result}`);

			// Generate PDF using the same function
			await generatePDF();

			// Reset form
			setMaterials([]);
			setExtraItems([]);
			setQuotationName("");
			setQuotationDescription("");
			setManoObras([]);
		}
	};

	const generatePDF = async () => {

		if (!validatePayments()) return;

		try {
			// Format items for the PDF
			const formattedItems = [
				// Format materials
				...materials.map((material) => ({
					description: material.nombre,
					units: material.quantity,
					unitPrice: material.precio,
				})),
				// Format extra items
				...extraItems.map((item) => ({
					description: `${item.nombre}${item.m2 ? ` (${item.m2} m²)` : ""}`,
					units: 1,
					unitPrice: item.precio,
				})),
			];

			const blob = await pdf(
				<QuotationPDF
					quotationName={quotationName}
					clientName="Cliente Ejemplo"
					clientPhone="123456789"
					clientEmail="cliente@ejemplo.com"
					clientAddress="Dirección del Cliente"
					date={new Date().toLocaleDateString("es-CL")}
					items={formattedItems}
					notes={quotationNotes}
					manoObras={manoObras}
					offerValidity={validezOferta}
					advancePayment={condPagoAdelantado}
					remainingPayment={condPagoContraEntrega}
					workTime={plazoDeEntrega}
				/>
			).toBlob();

			// Create download link
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `cotizacion-${quotationName}.pdf`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			toast.success("PDF generated successfully");
		} catch (error) {
			console.error("Error generating PDF:", error);
			toast.error("Error generating PDF");
		}
	};

	const handleMaterialAdd = (material: Material) => {
		// Add the material to the selected materials list with quantity 1
		setMaterials((prev) => [...prev, { ...material, quantity: 1 }]);
		// Close the dialog
		setMaterialesOpen(false);
		// Show success toast
		toast.success("Material added successfully");
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl">
			<form onSubmit={handleSubmitQuotation} className="space-y-6">
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
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Materiales</CardTitle>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={(e) => {
								e.stopPropagation();
								setMaterialesOpen(true);
							}}
							aria-label="Open materials management">
							<Plus className="h-4 w-4" />
						</Button>
					</CardHeader>
					<CardContent>
						<ul className="space-y-4 mb-4">
							{materials.map((item) => (
								<li
									key={`material-${item.id}`}
									className="flex items-center justify-between">
									<span>
										{item.nombre} - ${item.precio * item.quantity}
									</span>
									<div className="flex items-center space-x-2">
										<Input
											type="number"
											value={item.quantity}
											onChange={(e) =>
												updateMaterialQuantity(
													item.id,
													parseInt(e.target.value)
												)
											}
											className="w-16 h-8 text-center"
											min="1"
										/>
										<Button
											type="button"
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
									{filteredMaterials
										.filter(
											(material) => !materials.some((m) => m.id === material.id)
										)
										.map((material) => (
											<Button
												type="button"
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
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Mano de Obra</CardTitle>
						<Button
							type="button"
							variant="outline"
							size="icon"
							onClick={() => setManoObraOpen(true)}
						>
							<Plus className="h-4 w-4" />
						</Button>
					</CardHeader>
					<CardContent>
						{/* Tabla de Mano de Obra */}
						<div className="overflow-x-auto">
							<table className="table-auto w-full border-collapse border border-gray-300">
								<thead className="bg-gray-100">
									<tr>
										<th className="border border-gray-300 px-4 py-2 text-left">Nombre del Material</th>
										<th className="border border-gray-300 px-4 py-2 text-center">Área (m²)</th>
										<th className="border border-gray-300 px-4 py-2 text-center">Rendimiento (m²/unidad)</th>
										<th className="border border-gray-300 px-4 py-2 text-center">Costo Unitario</th>
										<th className="border border-gray-300 px-4 py-2 text-center">Mano de Obra</th>
										<th className="border border-gray-300 px-4 py-2 text-center">Acciones</th>
									</tr>
								</thead>
								<tbody>
									{manoObras.map((obra, index) => (
										<tr key={index} className="hover:bg-gray-50">
											<td className="border border-gray-300 px-4 py-2">{obra.nombreMaterial}</td>
											<td className="border border-gray-300 px-4 py-2 text-center">{obra.areaTrabajarM2}</td>
											<td className="border border-gray-300 px-4 py-2 text-center">{obra.rendimientoMaterialM2}</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												${obra.costoMaterialUnitario.toLocaleString()}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												${obra.manoObraPorM2.toLocaleString()}
											</td>
											<td className="border border-gray-300 px-4 py-2 text-center">
												<Button
													variant="destructive"
													size="icon"
													onClick={() => removeManoObra(index)}
													aria-label="Eliminar mano de obra"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>



				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Notas de la Cotización</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<Textarea
								id="quotationNotes"
								value={quotationNotes}
								onChange={(e) => setQuotationNotes(e.target.value)}
								placeholder="Ingrese las notas de la cotización"
							/>
						</div>
					</CardContent>
				</Card>

				<Card className="mb-6">
					<CardHeader>
						<CardTitle>Detalles de la Oferta</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div>
								<Label htmlFor="validezOferta">Validez de la Oferta (días)</Label>
								<Input
									id="validezOferta"
									type="number"
									value={validezOferta}
									onChange={(e) => setValidezOferta(parseInt(e.target.value) || 0)}
									placeholder="Ingrese la validez de la oferta en días"
									required
								/>
							</div>
							<div>
								<Label htmlFor="condPagoAdelantado">% Adelantado</Label>
								<Input
									id="condPagoAdelantado"
									type="number"
									value={condPagoAdelantado}
									onChange={(e) => setCondPagoAdelantado(parseInt(e.target.value) || 0)}
									placeholder="Ingrese el porcentaje de pago adelantado"
									required
								/>
							</div>
							<div>
								<Label htmlFor="condPagoContraEntrega">% Contra Entrega</Label>
								<Input
									id="condPagoContraEntrega"
									type="number"
									value={condPagoContraEntrega}
									onChange={(e) => setCondPagoContraEntrega(parseInt(e.target.value) || 0)}
									placeholder="Ingrese el porcentaje de pago contra entrega"
									required
								/>
							</div>
							<div>
								<Label htmlFor="deliveryTime">Plazo de Entrega (días)</Label>
								<Input
									id="deliveryTime"
									type="number"
									value={plazoDeEntrega}
									onChange={(e) => setplazoDeEntrega(parseInt(e.target.value) || 0)}
									placeholder="Ingrese el plazo de entrega en días"
									required
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Dialog open={materialesOpen} onOpenChange={setMaterialesOpen}>
					<DialogContent
						className="max-w-4xl"
						onClick={(e) => e.stopPropagation()}>
						<DialogHeader>
							<DialogTitle>Gestión de Materiales</DialogTitle>
						</DialogHeader>
						{/* @ts-expect-error Revisar este type despues */}
						<Materiales isDialog={true} onMaterialAdd={handleMaterialAdd} />
					</DialogContent>
				</Dialog>

				<Dialog open={manoObraOpen} onOpenChange={setManoObraOpen}>
				<DialogContent className="max-w-lg" onClick={(e) => e.stopPropagation()}>
					<DialogHeader>
					<DialogTitle>Agregar Mano de Obra</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
					<div>
						<Label htmlFor="nombreMaterial">Nombre del Material</Label>
						<Input
						id="nombreMaterial"
						value={manoObraTemp.nombreMaterial}
						onChange={(e) =>
							setManoObraTemp({
							...manoObraTemp,
							nombreMaterial: e.target.value,
							})
						}
						placeholder="Ejemplo: Pintura"
						required
						/>
					</div>
					<div>
						<Label htmlFor="areaTrabajarM2">Área a Trabajar (m²)</Label>
						<Input
						id="areaTrabajarM2"
						type="number"
						value={manoObraTemp.areaTrabajarM2}
						onChange={(e) =>
							setManoObraTemp({
							...manoObraTemp,
							areaTrabajarM2: parseFloat(e.target.value) || 0,
							})
						}
						placeholder="Ejemplo: 50"
						/>
					</div>
					<div>
						<Label htmlFor="rendimientoMaterialM2">
						Rendimiento del Material (m²/unidad)
						</Label>
						<Input
						id="rendimientoMaterialM2"
						type="number"
						value={manoObraTemp.rendimientoMaterialM2}
						onChange={(e) =>
							setManoObraTemp({
							...manoObraTemp,
							rendimientoMaterialM2: parseFloat(e.target.value) || 0,
							})
						}
						placeholder="Ejemplo: 25"
						/>
					</div>
					<div>
						<Label htmlFor="costoMaterialUnitario">Costo Material Unitario</Label>
						<Input
						id="costoMaterialUnitario"
						type="number"
						value={manoObraTemp.costoMaterialUnitario}
						onChange={(e) =>
							setManoObraTemp({
							...manoObraTemp,
							costoMaterialUnitario: parseFloat(e.target.value) || 0,
							})
						}
						placeholder="Ejemplo: 30000"
						/>
					</div>
					<div>
						<Label htmlFor="manoObraPorM2">Mano de Obra por m²</Label>
						<Input
						id="manoObraPorM2"
						type="number"
						value={manoObraTemp.manoObraPorM2}
						onChange={(e) =>
							setManoObraTemp({
							...manoObraTemp,
							manoObraPorM2: parseFloat(e.target.value) || 0,
							})
						}
						placeholder="Ejemplo: 5000"
						/>
					</div>
					<Button
						onClick={() => {
						setManoObras([...manoObras, manoObraTemp]); // Agrega la nueva entrada
						setManoObraOpen(false); // Cierra el modal
						setManoObraTemp({
							nombreMaterial: "",
							areaTrabajarM2: 0,
							rendimientoMaterialM2: 0,
							costoMaterialUnitario: 0,
							manoObraPorM2: 0,
						}); // Resetea los datos temporales
						}}
					>
						Agregar Mano de Obra
					</Button>
					</div>
				</DialogContent>
				</Dialog>

				<div className="flex gap-4">
					<Button type="submit" className="flex-1">
						<Send className="h-4 w-4 mr-2" />
						Enviar Cotización
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={generatePDF}
						disabled={
							condPagoAdelantado + condPagoContraEntrega !== 100 ||
							!quotationName ||
							!quotationDescription ||
							(materials.length === 0 && extraItems.length === 0)
						}
						className="flex-1">
						<FileDown className="h-4 w-4 mr-2" />
						Generar PDF
					</Button>
				</div>
			</form>
		</div>
	);
}
