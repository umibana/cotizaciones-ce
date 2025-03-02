"use client";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useManagementMutation,
	useAssignRoleMutation,
} from "@/hooks/useManagementApi";
import { useAuthenticatedMutation } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
interface Auth0User {
	user_id: string;
	email: string;
	name: string;
	password?: string;
	connection: string;
	app_metadata?: {
		role?: string;
	};
}

interface UserDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	user: Auth0User | null;
}

const ROLE_IDS = {
	"jefe de operaciones": "rol_YTqDFHgVtZ2a0Svz",
	maestro: "rol_nmfYemcUpYZoftAt",
	supervisor: "rol_kuL1hcMnbOaeHyR5",
};

export function UserDialog({ open, onOpenChange, user }: UserDialogProps) {
	const [formData, setFormData] = useState({
		email: user?.email || "",
		name: user?.name || "",
		password: "",
		connection: "Username-Password-Authentication",
		app_metadata: {
			role: user?.app_metadata?.role || "maestro",
		},
	});

	const [rut, setRut] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [passwordError, setPasswordError] = useState("");

	const createMutation = useManagementMutation<Auth0User, Partial<Auth0User>>(
		`${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users`
	);

	const updateMutation = useManagementMutation<Auth0User, Partial<Auth0User>>(
		`${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${user?.user_id}`,
		"PATCH"
	);

	const assignRoleMutation = useAssignRoleMutation();

	const secondEndpointMutation = useAuthenticatedMutation(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/crear`,
		"POST"
	);

	const validatePassword = (password: string) => {
		if (password.length < 8) {
			return "La contraseña debe tener al menos 8 caracteres";
		}
		if (!/[A-Z]/.test(password)) {
			return "La contraseña debe contener al menos una mayúscula";
		}
		return "";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user && validatePassword(formData.password)) {
			setPasswordError(validatePassword(formData.password));
			return;
		}

		try {
			if (user) {
				await updateMutation.mutateAsync({
					name: formData.name,
					app_metadata: formData.app_metadata,
				});
			} else {
				const newUser = await createMutation.mutateAsync(formData);
				await assignRoleMutation.mutateAsync({
					userId: newUser.user_id,
					roles: [ROLE_IDS[formData.app_metadata.role]],
				});
			}

			const secondEndpointData = {
				username: formData.email,
				email: formData.email,
				name: formData.name,
				rut: rut,
				role: formData.app_metadata.role,
			};

			await secondEndpointMutation.mutateAsync(
				secondEndpointData as unknown as void
			);
			toast.success("Usuario creado correctamente");

			onOpenChange(false);
		} catch (error) {
			toast.error(error.message as string);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{user ? "Editar usuario" : "Crear nuevo usuario"}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="email">Email</label>
						<Input
							id="email"
							type="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
							disabled={!!user}
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="name">Nombre</label>
						<Input
							id="name"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							required
						/>
					</div>
					{!user && (
						<div className="space-y-2">
							<label htmlFor="password">Contraseña</label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									value={formData.password}
									onChange={(e) => {
										const newPassword = e.target.value;
										setFormData({ ...formData, password: newPassword });
										setPasswordError(validatePassword(newPassword));
									}}
									required
									className={passwordError ? "border-red-500" : ""}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<EyeOff className="h-4 w-4" />
									) : (
										<Eye className="h-4 w-4" />
									)}
								</Button>
							</div>
							{passwordError && (
								<p className="text-sm text-red-500 mt-1">{passwordError}</p>
							)}
						</div>
					)}
					<div className="space-y-2">
						<label htmlFor="rut">RUT</label>
						<Input
							id="rut"
							value={rut}
							onChange={(e) => setRut(e.target.value)}
							required
							placeholder="Ingrese RUT"
							className="w-full"
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="role">Rol</label>
						<Select
							value={formData.app_metadata.role}
							onValueChange={(value) =>
								setFormData({
									...formData,
									app_metadata: { ...formData.app_metadata, role: value },
								})
							}>
							<SelectTrigger>
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="jefe de operaciones">
									Jefe de Operaciones
								</SelectItem>
								<SelectItem value="maestro">Maestro</SelectItem>
								<SelectItem value="supervisor">Supervisor</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex justify-end space-x-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}>
							Cancelar
						</Button>
						<Button type="submit">{user ? "Actualizar" : "Crear"}</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
