import { useAuth0 } from "@auth0/auth0-react";

export function useRoles() {
    const { user, isAuthenticated } = useAuth0();
    const namespace = "https://api.cotizaciones-ce";
    const userRoles = user?.[`${namespace}/roles`] || [];

    return {
        roles: userRoles,
        isAdmin: userRoles.includes('admin'),
        isMaestro: userRoles.includes('maestro'),
        hasRole: (role: string) => userRoles.includes(role),
        isAuthenticated
    };
} 