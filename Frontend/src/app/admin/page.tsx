"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toast, Toaster } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash, User, Pencil } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApiUser {
	idUser: number;
	username: string;
	email: string;
	name: string;
	rut: string;
	role: string;
}
interface MappedUser extends ApiUser {
	id: number;
}

interface User {
	username: string;
	email: string;
	name: string;
	rut: string;
	role: string;
	password: string;
}

const getUsers = async (): Promise<MappedUser[]> => {
	const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/all`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data: ApiUser[] = await response.json();

	return data.map((item) => ({
		id: item.idUser,
		...item,
	}));
};

const createUser = async (newUser: User) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/crear`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			}
		);

		if (!response.ok) {
			throw new Error("Error al crear usuario");
		}

		const data = await response.json();
		return { success: true, message: data };
	} catch (error) {
		console.error("Error al crear usuario:", error);
		return { success: false, error: (error as Error).message };
	}
};

const deleteUser = async (id: number) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
		{
			method: "DELETE",
		}
	);
	if (!response.ok) {
		throw new Error("Failed to delete user");
	}
};

const updateUser = async (
	id: number,
	userData: Omit<MappedUser, "id" | "idUser">
) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}
	);
	if (!response.ok) {
		throw new Error("Failed to update user");
	}
	return response.json();
};

export default function AdminDashboard() {
	const queryClient = useQueryClient();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newUser, setNewUser] = useState<User>({
		email: "",
		name: "",
		username: "",
		rut: "",
		role: "user",
		password: "",
	});

	const [userToDelete, setUserToDelete] = useState<number | null>(null);

	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
	const [userToUpdate, setUserToUpdate] = useState<MappedUser | null>(null);

	const { data: users, isLoading } = useQuery<MappedUser[], Error>({
		queryKey: ["users"],
		queryFn: async () => {
			const result = await getUsers();
			return result ?? [];
		},
	});

	const handleCreateUser = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newUser === undefined) return;
		try {
			await createUser(newUser);
			toast.success("User created successfully");
			setNewUser({
				email: "",
				name: "",
				username: "",
				rut: "",
				role: "user",
				password: "string",
			});
			setIsDialogOpen(false);
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				toast.error(error.message || "Failed to impersonate user");
			} else {
				toast.error("An unexpected error occurred");
			}
		}
	};

	const deleteMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			toast.success("User deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to delete user");
		},
	});
	const handleDeleteUser = (id: number) => {
		setUserToDelete(id);
		setIsDeleteDialogOpen(true);
	};
	const confirmDelete = () => {
		if (userToDelete) {
			deleteMutation.mutate(userToDelete);
			setIsDeleteDialogOpen(false);
		}
	};

	const updateMutation = useMutation({
		mutationFn: ({
			id,
			userData,
		}: {
			id: number;
			userData: Omit<MappedUser, "id" | "idUser">;
		}) => updateUser(id, userData),
		onSuccess: () => {
			toast.success("User updated successfully");
			queryClient.invalidateQueries({ queryKey: ["users"] });
			setIsUpdateDialogOpen(false);
		},
		onError: (error: Error) => {
			toast.error(error.message || "Failed to update user");
		},
	});

	const handleUpdateClick = (user: MappedUser) => {
		setUserToUpdate(user);
		setIsUpdateDialogOpen(true);
	};

	return (
		<div className="container mx-auto p-4 space-y-8">
			<Toaster richColors />
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Deletion</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<p>Esta seguro que desea borrar este usuario?</p>
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
			<Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Update User</DialogTitle>
					</DialogHeader>
					{userToUpdate && (
						<form
							onSubmit={(e) => {
								e.preventDefault();
								if (!userToUpdate) return;
								updateMutation.mutate({
									id: userToUpdate.id,
									userData: {
										username: userToUpdate.username,
										email: userToUpdate.email,
										name: userToUpdate.name,
										rut: userToUpdate.rut,
										role: userToUpdate.role,
									},
								});
							}}
							className="space-y-4">
							<div>
								<Label htmlFor="update-name">Name</Label>
								<Input
									id="update-name"
									value={userToUpdate.name}
									onChange={(e) =>
										setUserToUpdate({ ...userToUpdate, name: e.target.value })
									}
									required
								/>
							</div>

							<div>
								<Label htmlFor="update-username">Username</Label>
								<Input
									id="update-username"
									value={userToUpdate.username}
									onChange={(e) =>
										setUserToUpdate({
											...userToUpdate,
											username: e.target.value,
										})
									}
									required
								/>
							</div>

							<div>
								<Label htmlFor="update-email">Email</Label>
								<Input
									id="update-email"
									type="email"
									value={userToUpdate.email}
									onChange={(e) =>
										setUserToUpdate({ ...userToUpdate, email: e.target.value })
									}
									required
								/>
							</div>

							<div>
								<Label htmlFor="update-rut">RUT</Label>
								<Input
									id="update-rut"
									value={userToUpdate.rut}
									onChange={(e) =>
										setUserToUpdate({ ...userToUpdate, rut: e.target.value })
									}
									required
								/>
							</div>

							<div>
								<Label htmlFor="update-role">Role</Label>
								<Select
									value={userToUpdate.role}
									onValueChange={(value: "admin" | "user") =>
										setUserToUpdate({ ...userToUpdate, role: value })
									}>
									<SelectTrigger>
										<SelectValue placeholder="Select role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="admin">Admin</SelectItem>
										<SelectItem value="user">User</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="flex justify-end space-x-2">
								<Button
									variant="outline"
									onClick={() => setIsUpdateDialogOpen(false)}
									type="button">
									Cancel
								</Button>
								<Button type="submit" disabled={updateMutation.isPending}>
									{updateMutation.isPending ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										"Update User"
									)}
								</Button>
							</div>
						</form>
					)}
				</DialogContent>
			</Dialog>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-2xl">Admin Dashboard</CardTitle>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button>
								<Plus className="mr-2 h-4 w-4" /> Create User
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Create New User</DialogTitle>
							</DialogHeader>
							<form onSubmit={handleCreateUser} className="space-y-4">
								<div>
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										value={newUser.name}
										onChange={(e) =>
											setNewUser({ ...newUser, name: e.target.value })
										}
										required
									/>
								</div>

								<div>
									<Label htmlFor="username">Nombre de usuario</Label>
									<Input
										id="username"
										type="username"
										value={newUser.username}
										onChange={(e) =>
											setNewUser({ ...newUser, username: e.target.value })
										}
										required
									/>
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										value={newUser.email}
										onChange={(e) =>
											setNewUser({ ...newUser, email: e.target.value })
										}
										required
									/>
								</div>

								<div>
									<Label htmlFor="rut">RUT</Label>
									<Input
										id="rut"
										type="rut"
										value={newUser.rut}
										onChange={(e) =>
											setNewUser({ ...newUser, rut: e.target.value })
										}
										required
									/>
								</div>
								<div>
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										value={newUser.password}
										onChange={(e) =>
											setNewUser({ ...newUser, password: e.target.value })
										}
										required
									/>
								</div>
								<div>
									<Label htmlFor="role">Role</Label>
									<Select
										value={newUser.role}
										onValueChange={(value: "admin" | "user") =>
											setNewUser({ ...newUser, role: value as "user" })
										}>
										<SelectTrigger>
											<SelectValue placeholder="Select role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="user">User</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Creating...
										</>
									) : (
										"Create User"
									)}
								</Button>
							</form>
						</DialogContent>
					</Dialog>
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
									<TableHead>Name</TableHead>
									<TableHead>Role</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{users?.map((user) => (
									<TableRow key={user.id}>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.role || "user"}</TableCell>
										<TableCell>
											<div className="flex space-x-2">
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleUpdateClick(user)}
													disabled={updateMutation.isPending}>
													{updateMutation.isPending ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<Pencil className="h-4 w-4" />
													)}
												</Button>
												<Button
													variant="destructive"
													size="sm"
													onClick={() => handleDeleteUser(user.id)}
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
