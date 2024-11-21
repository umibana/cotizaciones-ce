"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

// Convertir a .tsx cuando tengamos definido schema
/* eslint-disable @typescript-eslint/no-explicit-any */



// biome-ignore lint/suspicious/noExplicitAny: <explanation>

const UnassignedProjectList = ({ projects, onAssign }: any) => {

	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle>Proyectos sin asignar</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[200px] w-full rounded-md border p-4">
					{projects.map((project: any) => (
						<div
							key={project.idProyecto}
							className="mb-2 flex items-center justify-between rounded-lg bg-secondary p-2">
							<span>{project.nombre}</span>
							<div className="flex gap-2">
								<Link
									href={{
										pathname: "/asignacion",
										query: { id: project.idProyecto},
									}}>
									<Button size="sm">Asignar</Button>
								</Link>
								<Button size="sm" onClick={() => onAssign(project.id)}>
									<FaTrash />
								</Button>
							</div>
						</div>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const AssignedProjectList = ({ projects, onReview }: any) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Proyectos asignados</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[200px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.idProyecto}
						className="mb-2 flex items-center justify-between rounded-lg bg-secondary p-2">
						<span>{project.nombre}</span>
						<div className="flex items-center gap-2">
							<span className="font-medium">${project.price}</span>
							<Button
								size="sm"
								variant="outline"
								onClick={() => onReview(project.id)}>
								Revisar
							</Button>
						</div>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Proyectos() {
	const [projects, setProjects] = useState({ unassigned: [], assigned: [] });
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/proyectos/all");
				if (!response.ok) {
					throw new Error("Error fetching projects");
				}
				const data = await response.json();

				// Procesar los datos para dividirlos en asignados y no asignados
				const unassigned = data.filter((project: any) => project.estado === "Sin asignar");
				const assigned = data.filter((project: any) => project.estado !== "Sin asignar");

				// Actualizar el estado con los proyectos divididos
				setProjects({ unassigned, assigned });
				setIsLoading(false);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred");
				}
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);



	const handleAssign = (projectId: any) => {
		console.log(`Assigning project: ${projectId}`);
		// Implement your assign logic here
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleReview = (projectId: any) => {
		console.log(`Reviewing project: ${projectId}`);
		// Implement your review logic here
	};

	if (isLoading) return <div className="text-center p-4">Loading...</div>;
	if (error)
		return (
			<div className="text-center p-4 text-red-500">
				An error occurred: {error}
			</div>
		);

	return (
		<div className="container mx-auto p-4 space-y-4">
			<UnassignedProjectList
				projects={projects.unassigned}
				onAssign={handleAssign}
			/>
			<AssignedProjectList
				projects={projects.assigned}
				onReview={handleReview}
			/>
		</div>
	);
}
