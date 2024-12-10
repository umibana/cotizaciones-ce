"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useAuthenticatedQuery } from "@/hooks/useAuth";
import { MdiRenameBox } from '@/components/ui/rename-icon';
import { MdDriveFileRenameOutline } from "react-icons/md";
import Link from "next/link";

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
    condDePagoAdelantado: string;
    condDePagoContraEntrega: string;
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

    // Manejo de la carga y errores
    if (isLoading) return <div>Cargando cotización...</div>;
    if (error)
        return (
            <div className="text-red-500">
                {(error as Error).message}
            </div>
        );

    // Actualizar la métrica de utilidad
    const handleUtilidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUtilidadEmpresa(parseFloat(e.target.value));
    };

    
    const handleEnviarCotizacion = () => {

    };
    

    // Función para guardar la métrica de utilidad (implementar la lógica de guardado)
    /*
    const handleGuardarUtilidad = async () => {
        // ... Lógica para enviar la nueva utilidad al servidor
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/cotizaciones/${cotizacionId}/utilidad`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ utilidad: utilidadEmpresa }),
                }
            );

            if (response.ok) {
                alert("Utilidad actualizada correctamente");
            } else {
                alert("Error al actualizar la utilidad");
            }
        } catch (error) {
            console.error("Error al actualizar la utilidad:", error);
            alert("Error al actualizar la utilidad");
        }
    };
     */

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
                            <Link href={`/editar-validez?id=${cotizacionId}`}> {/* Enlace al icono */}
                                <MdDriveFileRenameOutline className="ml-2 cursor-pointer" /> {/* Icono con estilo */}
                            </Link>
                            <Input
                                id="validez"
                                type="number"
                                value={cotizacionData?.validezOferta || ""}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pagoAdelantado">
                                Condición Pago Adelantado (%)
                            </Label>
                            <Input
                                id="pagoAdelantado"
                                type="string"
                                value={cotizacionData?.condDePagoAdelantado || ""}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pagoContraEntrega">
                                Condición Pago Contra Entrega (%)
                            </Label>
                            <Input
                                id="pagoContraEntrega"
                                type="string"
                                value={cotizacionData?.condDePagoContraEntrega || ""}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plazoEntrega">Plazo Entrega (días)</Label>
                            <Input
                                id="plazoEntrega"
                                type="number"
                                value={cotizacionData?.plazoDeEntrega || ""}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="notas">Notas</Label>
                            <Input
                                id="notas"
                                type="text"
                                value={cotizacionData?.notas || ""}
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="validez">Precio total proyecto</Label>
                            <Input
                                id="precioTentativo"
                                type="number"
                                value={cotizacionData?.precioTentativo || ""}
                                readOnly
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Manos de Obra</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Lista de manos de obra hardcodeada */}
                    {[{nombre: "Instalación de piso", costo: 1000},
                        {nombre: "Pintura de paredes", costo: 500 },
                        { nombre: "Reparación de techo", costo: 1200 }]
                        .map((manoDeObra) => (
                            <div key={manoDeObra.nombre} className="mb-2">
                                {manoDeObra.nombre} - ${manoDeObra.costo}
                            </div>
                        ))}
                    {/* Calcular y mostrar el precio total */}
                    <div className="font-bold">
                        Total: $
                        {[{nombre: "Instalación de piso", costo: 1000},
                            {nombre: "Pintura de paredes", costo: 500 },
                            { nombre: "Reparación de techo", costo: 1200 }]
                            .reduce((acc, curr) => acc + curr.costo, 0)}
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Materiales</CardTitle>
                </CardHeader>
                <CardContent>
                    {/*{ Modificar la estructura por esto: cotizacionData?.materiales.map((material) => ( */}
                    {[{ nombre: "Cemento", cantidad: 10, precioUnitario: 50 },
                        { nombre: "Ladrillos", cantidad: 100, precioUnitario: 10 },
                        { nombre: "Pintura", cantidad: 5, precioUnitario: 20 }]
                        .map((material) => (
                        <div key={material.nombre} className="mb-2">
                            {material.nombre} - {material.cantidad} x ${material.precioUnitario}
                        </div>
                    ))}
                    {/* Calcular y mostrar el precio total */}
                    <div className="font-bold">
                        Total: $
                        {[{ nombre: "Cemento", cantidad: 10, precioUnitario: 50 },
                            { nombre: "Ladrillos", cantidad: 100, precioUnitario: 10 },
                            { nombre: "Pintura", cantidad: 5, precioUnitario: 20 }]
                            .reduce((acc, curr) => acc + (curr.cantidad * curr.precioUnitario), 0)}
                    </div>
                </CardContent>
            </Card>

            {cotizacionData?.itemExtra && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Item Extra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Mostrar el item extra */}
                        {cotizacionData.itemExtra.descripcion} - $
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
            <div>
                <Button
                    type="submit"
                    className="w-full"
                    onClick={handleEnviarCotizacion}>
                    Enviar cotizacion
                </Button>
            </div>
        </div>
    );
}