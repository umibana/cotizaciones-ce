"use client";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useAuthenticatedQuery } from "@/hooks/useAuth";

const ProjectDetailsPage = () => {
    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");

    // Fetch project data
    const {
        data: projectData,
        isLoading: isProjectLoading,
        error: projectError,
    } = useAuthenticatedQuery(
        ["project", projectId as string],
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/proyectos/${projectId}`,
        {
            enabled: !!projectId,
        }
    );
    console.log("Project Data", projectData);
    console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clientes/${projectData?.idCliente}`);

    // Fetch client data
    const {
        data: clientData,
        isLoading: isClientLoading,
        error: clientError,
    } = useAuthenticatedQuery(
        ["client", projectData?.idCliente],
        projectData?.idCliente
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/clientes/${projectData.idCliente}`
            : null,
        {
            enabled: !!projectData?.idCliente,
        }
    );

    const {
        data: nombreCreador,
        isLoading: isNameLoading,
        error: nameError,
    } = useAuthenticatedQuery(
        ["creador", projectData?.idUserBase],
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${projectData?.idUserBase}`,
    {
            enabled: !!projectData?.idUserBase,
        }
    );



    if (isProjectLoading || isClientLoading) return <p>Cargando...</p>;
    if (projectError || clientError) return <p>Error al cargar los datos.</p>;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            {/* Project Details */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Detalles del Proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre del Proyecto</Label>
                            <Input id="nombre" type="text" value={projectData?.nombre || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="direccion">Dirección</Label>
                            <Input id="direccion" type="text" value={projectData?.direccion || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Input id="descripcion" type="text" value={projectData?.descripcion || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Input id="estado" type="text" value={projectData?.estado || ""} readOnly />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Client Details */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Detalles del Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clienteNombre">Nombre</Label>
                            <Input id="clienteNombre" type="text" value={clientData?.nombre || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rut">RUT</Label>
                            <Input id="rut" type="text" value={clientData?.rut || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input id="telefono" type="text" value={clientData?.telefono || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="direccion">Dirección</Label>
                            <Input id="direccion" type="text" value={clientData?.direccion || ""} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="text" value={clientData?.email || ""} readOnly />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Autor de creacion de proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clienteNombre">Nombre</Label>
                            <Input id="clienteNombre" type="text" value={nombreCreador?.name || ""} readOnly/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clienteNombre">Rol</Label>
                            <Input id="clienteNombre" type="text" value={nombreCreador?.role || ""} readOnly/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectDetailsPage;
