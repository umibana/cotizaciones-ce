"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useManagementMutation } from "@/hooks/useManagementApi";
import { Loader2, Plus, Trash, Pencil, Eye, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { UserDialog } from "./UserDialog";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { useRoles } from "@/hooks/useRoles";

interface Auth0User {
	user_id: string;
	email: string;
	name: string;
	nickname?: string;
	connection: string;
	app_metadata?: {
		role?: string;
	};
}

interface UserDetails {
	userId: string;
	roles: string[];
	isLoading: boolean;
}

const getManagementToken = async () => {
	const response = await fetch("/api/auth/management-token");
	if (!response.ok) throw new Error("Failed to get management token");
	const data = await response.json();
	return data.access_token;
};

const getUsers = async (): Promise<Auth0User[]> => {
	const token = await getManagementToken();
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	if (!response.ok) throw new Error("Failed to fetch users");
	return response.json();
};

export default function AdminDashboard() {
	const queryClient = useQueryClient();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<Auth0User | null>(null);
	const [userToEdit, setUserToEdit] = useState<Auth0User | null>(null);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const { isAdmin, isAuthenticated } = useRoles();

	const { data: users, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
		enabled: isAuthenticated && isAdmin,
	});

	const deleteMutation = useManagementMutation<void, void>(
		`${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userToDelete?.user_id}`,
		"DELETE"
	);

	if (!isAuthenticated || !isAdmin) {
		return <div>Acceso denegado</div>;
	}

	const handleDeleteUser = (user: Auth0User) => {
		setUserToDelete(user);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = async () => {
		if (!userToDelete) return;

		try {
			await deleteMutation.mutateAsync();
			toast.success("Usuario eliminado correctamente");
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setIsDeleteDialogOpen(false);
		} catch (error) {
			toast.error(`Failed to delete user: ${error.message}`);
		}
	};

	const fetchUserDetails = async (userId: string) => {
		setUserDetails({ userId, roles: [], isLoading: true });
		try {
			const token = await getManagementToken();
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!response.ok) throw new Error("Failed to fetch user roles");
			const rolesData = await response.json();
			const roles = rolesData.map((role: { name: string }) => role.name);
			setUserDetails({ userId, roles, isLoading: false });
		} catch (error) {
			toast.error(error.message);
			setUserDetails(null);
		}
	};

	return (
		<div className="container mx-auto p-4 space-y-8">
			<Toaster richColors />

			{/* Delete Confirmation Dialog */}
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<p>Are you sure you want to delete this user?</p>
						<div className="flex justify-end space-x-2">
							<Button
								variant="outline"
								onClick={() => setIsDeleteDialogOpen(false)}>
								Cancel
							</Button>
							<Button
								variant="destructive"
								onClick={confirmDelete}
								disabled={deleteMutation.isPending}>
								{deleteMutation.isPending ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									"Delete"
								)}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			{/* Create/Edit User Dialog */}
			<UserDialog
				open={isDialogOpen}
				onOpenChange={(open) => {
					setIsDialogOpen(open);
					if (!open) setUserToEdit(null);
				}}
				user={userToEdit}
			/>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-2xl">Gestión de usuarios</CardTitle>
					<Button onClick={() => setIsDialogOpen(true)}>
						<Plus className="mr-2 h-4 w-4" /> Crear usuario
					</Button>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="flex justify-center items-center h-64">
							<Loader2 className="h-8 w-8 animate-spin" />
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Email</TableHead>
									<TableHead>Nombre</TableHead>
									<TableHead>Rol</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users?.map((user) => (
									<TableRow key={user.user_id}>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>
											{userDetails?.userId === user.user_id ? (
												<div className="flex items-center gap-2">
													{userDetails.isLoading ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<>
															<span>
																{userDetails.roles.join(", ") || "No roles"}
															</span>
															<Button
																variant="ghost"
																size="sm"
																onClick={() => setUserDetails(null)}>
																<X className="h-4 w-4" />
															</Button>
														</>
													)}
												</div>
											) : (
												<Button
													variant="ghost"
													size="sm"
													onClick={() => fetchUserDetails(user.user_id)}>
													<Eye className="h-4 w-4 mr-2" />
													Ver detalles
												</Button>
											)}
										</TableCell>
										<TableCell>
											<div className="flex space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => {
														setUserToEdit(user);
														setIsDialogOpen(true);
													}}>
													<Pencil className="h-4 w-4" />
												</Button>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => handleDeleteUser(user)}
													disabled={deleteMutation.isPending}>
													{deleteMutation.isPending ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<Trash className="h-4 w-4" />
													)}
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
