"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRoles } from "@/hooks/useRoles";

function App() {
	const { isAdmin, isMaestro, isAuthenticated } = useRoles();

	return (
		<div className="flex flex-auto align-middle flex-col justify-center items-center container mx-auto p-4 space-y-4">
			<h1 className="text-xl font-extrabold">Prueba de Vistas Casa Experto</h1>

			{isAdmin && <AdminView />}

			{isMaestro && <MaestroView />}

			{isAuthenticated && !isAdmin && !isMaestro && (
				<p>No tienes permisos para acceder a esta vista</p>
			)}
		</div>
	);
}

// Separate components for better organization
function AdminView() {
	return (
		<div className="text-center flex flex-col gap-2">
			<h1 className="text-xl font-bold">Vista Jefe</h1>
			<Button asChild>
				<Link href="/asignacion">Asignación</Link>
			</Button>
			<Button asChild>
				<Link href="/proyectos">Proyectos</Link>
			</Button>
			<Button asChild>
				<Link href="/materiales">Materiales</Link>
			</Button>
			<Button asChild>
				<Link href="/nuevo-proyecto">Nuevo Proyecto</Link>
			</Button>
			<Button asChild>
				<Link href="/admin">Administración</Link>
			</Button>
		</div>
	);
}

function MaestroView() {
	return (
		<div className="text-center">
			<h1 className="text-xl font-bold">Vista Maestro</h1>
			<Button asChild>
				<Link href="/cotizacion">Cotización</Link>
			</Button>
		</div>
	);
}

export default App;
