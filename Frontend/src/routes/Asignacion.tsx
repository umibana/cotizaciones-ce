import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Convertir a .tsx cuando tengamos definido schema
/* eslint-disable @typescript-eslint/no-explicit-any */

const initialProjects = {
	unassigned: [
		{ id: 1, name: "Project A" },
		{ id: 2, name: "Project B" },
		{ id: 3, name: "Project C" },
	],
	assigned: [
		{ id: 4, name: "Project D", price: 100 },
		{ id: 5, name: "Project E", price: 150 },
		{ id: 6, name: "Project F", price: 200 },
	],
};

const UnassignedProjectList = ({ projects, onAssign }: any) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Unassigned Projects</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[200px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.id}
						className="mb-2 flex items-center justify-between rounded-lg bg-secondary p-2">
						<span>{project.name}</span>
						<Button size="sm" onClick={() => onAssign(project.id)}>
							Assign
						</Button>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

const AssignedProjectList = ({ projects, onReview }: any) => (
	<Card className="flex-1">
		<CardHeader>
			<CardTitle>Assigned Projects</CardTitle>
		</CardHeader>
		<CardContent>
			<ScrollArea className="h-[200px] w-full rounded-md border p-4">
				{projects.map((project: any) => (
					<div
						key={project.id}
						className="mb-2 flex items-center justify-between rounded-lg bg-secondary p-2">
						<span>{project.name}</span>
						<div className="flex items-center gap-2">
							<span className="font-medium">${project.price}</span>
							<Button
								size="sm"
								variant="outline"
								onClick={() => onReview(project.id)}>
								Review
							</Button>
						</div>
					</div>
				))}
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Asignacion() {
	const [projects, setProjects] = useState(initialProjects);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Simulate API call
		const fetchProjects = async () => {
			try {
				// Replace this with your actual API call when you're ready
				await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
				setProjects(initialProjects);
				setIsLoading(false);
			} catch (err: any) {
				setError(err.message);
				setIsLoading(false);
			}
		};

		fetchProjects();
	}, []);

	const handleAssign = (projectId: any) => {
		console.log(`Assigning project: ${projectId}`);
		// Implement your assign logic here
	};

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
