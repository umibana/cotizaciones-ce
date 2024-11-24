"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Proyecto {
	id: number;
	nombre: string;
	direccion: string;
	estado: string;
}

const AssignedProjectList = ({ projects, onReview }: any) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Proyectos asignados a usted</CardTitle>
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

export default function ProyectosAsignados({ idUser }: { idUser: BigInteger }) {
	const [projects, setProjects] = useState<Proyecto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/proyectos/asignados/${idUser}`
				);
				if (!response.ok) {
					throw new Error("Error fetching projects");
				}
				const data = await response.json();
				setProjects(data);
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
	}, [idUser]);

	// const handleAssign = (projectId: any) => {
	// 	console.log(`Assigning project: ${projectId}`);
	// 	// Implement your assign logic here
	// };

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleReview = (projectId: string) => {
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
			<AssignedProjectList projects={projects} onReview={handleReview} />
		</div>
	);
}
