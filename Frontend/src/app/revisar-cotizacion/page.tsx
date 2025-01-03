"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useAuthenticatedQuery } from "@/hooks/useAuth";
import { Plus } from "lucide-react";

// Interfaces para los datos de la cotización
interface ManoDeObra {
	// Define las propiedades de una mano de obra, por ejemplo:
	nombre: string;
	costo: number;
}

interface Material {
	// Define las propiedades de un material, por ejemplo:
	nombre: string;
	cantidad: number;
	precioUnitario: number;
}

interface ItemExtra {
	// Define las propiedades de un item extra, por ejemplo:
	descripcion: string;
	costo: number;
}

interface Cotizacion {
	validezOferta: number;
	condPagoAdelantado: string;
	condPagoContraEntrega: string;
	plazoDeEntrega: number;
	precioTentativo: number;
	notas: string;
	// manosDeObra: ManoDeObra[]; Se implementara cuando bryan tenga listo su HU
	// materiales: Material[]; Se implementara cuando bryan tenga listo su HU
	// itemExtra: ItemExtra | null;
	utilidadEmpresa: number; // Métrica de utilidad
}

export default function RevisarCotizacion() {
	const searchParams = useSearchParams();
	const cotizacionId = searchParams.get("id");

	// Estado para la métrica de utilidad
	const [utilidadEmpresa, setUtilidadEmpresa] = useState<number>(0);

	const [dialogValidez, setDialogValidez] = useState(false);
	const [nuevoValorValidez, setNuevoValorValidez] = useState<number | "">("");

	const [dialogPagoAdelantado, setDialogPagoAdelantado] = useState(false);
	const [nuevoPagoAdelantado, setNuevoPagoAdelantado] = useState<string | "">(
		""
	);

	// Estados iniciales
	const [nuevoPagoContraEntrega, setNuevoPagoContraEntrega] = useState<
		string | ""
	>("");
	const [nuevoPlazoEntrega, setNuevoPlazoEntrega] = useState<number | "">("");
	const [nuevasNotas, setNuevasNotas] = useState<string | "">("");
	const [nuevoPrecioTotal, setNuevoPrecioTotal] = useState<number | "">("");

	// Diálogos
	const [dialogPagoContraEntrega, setDialogPagoContraEntrega] = useState(false);
	const [dialogPlazoEntrega, setDialogPlazoEntrega] = useState(false);
	const [dialogNotas, setDialogNotas] = useState(false);
	const [dialogPrecioTotal, setDialogPrecioTotal] = useState(false);

	// Consulta autenticada para obtener los datos de la cotización
	const {
		data: cotizacionData,
		isLoading,
		error,
	} = useAuthenticatedQuery<Cotizacion>(
		["cotizacion", cotizacionId as string],
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/cotizaciones/proyecto/${cotizacionId}`,
		{
			enabled: !!cotizacionId,
		}
	);
	useEffect(() => {
		if (cotizacionData) {
			setNuevoValorValidez(cotizacionData.validezOferta || "");
			setNuevoPagoAdelantado(cotizacionData.condPagoAdelantado || "");
			setNuevoPagoContraEntrega(cotizacionData.condPagoContraEntrega || "");
			setNuevoPlazoEntrega(cotizacionData.plazoDeEntrega || "");
			setNuevasNotas(cotizacionData.notas || "");
			setNuevoPrecioTotal(cotizacionData.precioTentativo || "");
		}
	}, [cotizacionData]);
	console.log("Cotización Data:", cotizacionData);

	// Manejo de la carga y errores
	if (isLoading) return <div>Cargando cotización...</div>;
	if (error)
		return <div className="text-red-500">{(error as Error).message}</div>;

	// Actualizar la métrica de utilidad
	const handleUtilidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUtilidadEmpresa(parseFloat(e.target.value) || 0);
	};

	// Seccion de dialogos para la modificacion de atributos de la cotizacion

	// Función para abrir y cerrar el diálogo
	const abrirDialogo = () => setIsDialogOpen(true);
	const abrirDialogoPagoAdelantado = () => setIsDialogOpenPagoAdelantado(true);
	const cerrarDialogo = () => setIsDialogOpen(false);

	const cerrarDialogoPagoAdelantado = () =>
		setIsDialogOpenPagoAdelantado(false);

	// Manejo del cambio en el input del nuevo valor de validez
	const handleNuevoValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNuevoValorValidez(parseInt(e.target.value) || "");
	};

	const handleNuevoPagoAdelantado = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNuevoPagoAdelantado(e.target.value || "");
	};

	// Función para enviar el nuevo valor al backend
	// Función genérica para actualizar valores en el backend
	const actualizarValor = async (endpoint: string, body: any) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/cotizaciones/${cotizacionId}/${endpoint}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				}
			);

			if (response.ok) {
				alert("Valor actualizado correctamente");
			} else {
				alert("Error al actualizar el valor");
			}
		} catch (error) {
			console.error("Error al actualizar el valor:", error);
			alert("Error al actualizar el valor");
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-4xl">
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Detalles de la Cotización</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="validez">Validez Oferta (días)</Label>
							<Button size="sm" onClick={() => setDialogValidez(true)}>
								<Plus className="h-4 w-4" />
							</Button>
							<Input
								id="validez"
								type="number"
								value={cotizacionData?.validezOferta || ""}
								readOnly
							/>
						</div>

						{dialogValidez && (
							<Dialog
								title="Editar Validez Oferta"
								value={nuevoValorValidez}
								onChange={(e) =>
									setNuevoValorValidez(parseInt(e.target.value) || "")
								}
								onCancel={() => setDialogValidez(false)}
								onSave={() => {
									actualizarValor("validez-oferta", {
										validezOferta: nuevoValorValidez,
									});
									setDialogValidez(false);
								}}
							/>
						)}

						<div className="space-y-2">
							<Label htmlFor="pagoAdelantado">
								Condición Pago Adelantado (%)
							</Label>
							<Button size="sm" onClick={() => setDialogPagoAdelantado(true)}>
								<Plus className="h-4 w-4" />
							</Button>
							<Input
								id="pagoAdelantado"
								type="string"
								value={cotizacionData?.condPagoAdelantado || ""}
								readOnly
							/>
						</div>

						{dialogPagoAdelantado && (
							<Dialog
								title="Editar Condición Pago Adelantado"
								value={nuevoPagoAdelantado}
								onChange={(e) => setNuevoPagoAdelantado(e.target.value)}
								onCancel={() => setDialogPagoAdelantado(false)}
								onSave={() => {
									actualizarValor("pago-adelantado", {
										condPagoAdelantado: nuevoPagoAdelantado,
									});
									setDialogPagoAdelantado(false);
								}}
							/>
						)}

						<div className="space-y-2">
							<Label htmlFor="pagoContraEntrega">
								Condición Pago Contra Entrega (%)
							</Label>
							<Button
								size="sm"
								onClick={() => setDialogPagoContraEntrega(true)}>
								<Plus className="h-4 w-4" />
							</Button>
							<Input
								id="pagoContraEntrega"
								type="string"
								value={cotizacionData?.condPagoContraEntrega || ""}
								readOnly
							/>
						</div>

						{dialogPagoContraEntrega && (
							<Dialog
								title="Editar Condición Pago Contra Entrega"
								value={nuevoPagoContraEntrega}
								onChange={(e) => setNuevoPagoContraEntrega(e.target.value)}
								onCancel={() => setDialogPagoContraEntrega(false)}
								onSave={() => {
									actualizarValor("pago-contra-entrega", {
										condPagoContraEntrega: nuevoPagoContraEntrega,
									});
									setDialogPagoContraEntrega(false);
								}}
							/>
						)}

						{/* Plazo de Entrega */}
						<div className="space-y-2">
							<Label htmlFor="plazoEntrega">Plazo Entrega (días)</Label>
							<Button size="sm" onClick={() => setDialogPlazoEntrega(true)}>
								<Plus className="h-4 w-4" />
							</Button>
							<Input
								id="plazoEntrega"
								type="number"
								value={cotizacionData?.plazoDeEntrega || ""}
								readOnly
							/>
						</div>

						{dialogPlazoEntrega && (
							<Dialog
								title="Editar Plazo de Entrega"
								value={nuevoPlazoEntrega}
								onChange={(e) =>
									setNuevoPlazoEntrega(parseInt(e.target.value) || "")
								}
								onCancel={() => setDialogPlazoEntrega(false)}
								onSave={() => {
									actualizarValor("plazo-entrega", {
										plazoDeEntrega: nuevoPlazoEntrega,
									});
									setDialogPlazoEntrega(false);
								}}
							/>
						)}

						<div className="space-y-2">
							<Label htmlFor="notas">Notas</Label>
							<Button size="sm" onClick={() => setDialogNotas(true)}>
								<Plus className="h-4 w-4" />
							</Button>
							<Input
								id="notas"
								type="text"
								value={cotizacionData?.notas || ""}
								readOnly
							/>
						</div>

						{dialogNotas && (
							<Dialog
								title="Editar Notas"
								value={nuevasNotas}
								onChange={(e) => setNuevasNotas(e.target.value)}
								onCancel={() => setDialogNotas(false)}
								onSave={() => {
									actualizarValor("notas", { notas: nuevasNotas });
									setDialogNotas(false);
								}}
							/>
						)}

						<div className="space-y-2">
							<Label htmlFor="validez">Precio total proyecto</Label>
							<Button size="sm" onClick={() => setDialogPrecioTotal(true)}>
								<Plus className="h-4 w-4" />
							</Button>
							<Input
								id="precioTentativo"
								type="number"
								value={cotizacionData?.precioTentativo || ""}
								readOnly
							/>
						</div>

						{dialogPrecioTotal && (
							<Dialog
								title="Editar Precio Total"
								value={nuevoPrecioTotal}
								onChange={(e) =>
									setNuevoPrecioTotal(parseFloat(e.target.value) || "")
								}
								onCancel={() => setDialogPrecioTotal(false)}
								onSave={() => {
									actualizarValor("precio-total", {
										precioTentativo: nuevoPrecioTotal,
									});
									setDialogPrecioTotal(false);
								}}
							/>
						)}
					</div>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Manos de Obra</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Lista de manos de obra hardcodeada */}
					{[
						{ nombre: "Instalación de piso", costo: 1000 },
						{ nombre: "Pintura de paredes", costo: 500 },
						{ nombre: "Reparación de techo", costo: 1200 },
					].map((manoDeObra) => (
						<div key={manoDeObra.nombre} className="mb-2">
							{manoDeObra.nombre} - ${manoDeObra.costo}
						</div>
					))}
					{/* Calcular y mostrar el precio total */}
					<div className="font-bold">
						Total: $
						{[
							{ nombre: "Instalación de piso", costo: 1000 },
							{ nombre: "Pintura de paredes", costo: 500 },
							{ nombre: "Reparación de techo", costo: 1200 },
						].reduce((acc, curr) => acc + curr.costo, 0)}
					</div>
				</CardContent>
			</Card>

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Materiales</CardTitle>
				</CardHeader>
				<CardContent>
					{/*{ Modificar la estructura por esto: cotizacionData?.materiales.map((material) => ( */}
					{[
						{ nombre: "Cemento", cantidad: 10, precioUnitario: 50 },
						{ nombre: "Ladrillos", cantidad: 100, precioUnitario: 10 },
						{ nombre: "Pintura", cantidad: 5, precioUnitario: 20 },
					].map((material) => (
						<div key={material.nombre} className="mb-2">
							{material.nombre} - {material.cantidad} x $
							{material.precioUnitario}
						</div>
					))}
					{/* Calcular y mostrar el precio total */}
					<div className="font-bold">
						Total: $
						{[
							{ nombre: "Cemento", cantidad: 10, precioUnitario: 50 },
							{ nombre: "Ladrillos", cantidad: 100, precioUnitario: 10 },
							{ nombre: "Pintura", cantidad: 5, precioUnitario: 20 },
						].reduce(
							(acc, curr) => acc + curr.cantidad * curr.precioUnitario,
							0
						)}
					</div>
				</CardContent>
			</Card>

			{/* @ts-expect-error Mostrar el item extra */}
			{cotizacionData?.itemExtra && (
				<Card className="mb-8">
					<CardHeader>
						<CardTitle>Item Extra</CardTitle>
					</CardHeader>
					<CardContent>
						{/* @ts-expect-error Mostrar el item extra */}
						{cotizacionData.itemExtra.descripcion} - $
						{/* @ts-expect-error Mostrar el item extra */}
						{cotizacionData.itemExtra.costo}
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Utilidad Empresa</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						<Input
							type="number"
							value={utilidadEmpresa}
							onChange={handleUtilidadChange}
						/>
						{/* <Button onClick={handleGuardarUtilidad}>Guardar Utilidad</Button> */}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function Dialog({ title, value, onChange, onCancel, onSave }: any) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-96">
				<h3 className="text-xl font-semibold">{title}</h3>
				<div className="space-y-4 mt-4">
					<Input type="text" value={value} onChange={onChange} />
				</div>
				<div className="mt-4 flex justify-end">
					<Button onClick={onCancel} className="mr-2">
						Cancelar
					</Button>
					<Button onClick={onSave}>Guardar</Button>
				</div>
			</div>
		</div>
	);
}
