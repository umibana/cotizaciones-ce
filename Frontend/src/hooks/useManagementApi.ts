import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const getManagementToken = async () => {
    const response = await fetch('/api/auth/management-token');
    if (!response.ok) {
        throw new Error('Failed to get management token');
    }
    const data = await response.json();
    return data.access_token;
};

const AUTH0_ERROR_MESSAGES: Record<string, string> = {
    "The user already exists.": "El usuario ya existe en el sistema.",
    "Password is too weak": "La contraseña es demasiado débil.",
    "Password contains user information": "La contraseña no puede contener información del usuario.",
    // Add more mappings as needed
};

export const useManagementMutation = <TResponse, TInput = void>(
    url: string,
    method = 'POST'
) => {
    return useMutation({
        mutationFn: async (data: TInput) => {
            const token = await getManagementToken();
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: method !== 'DELETE' ? JSON.stringify(data) : undefined,
            });

            if (!response.ok) {
                const errorData = await response.json();

                if (errorData.message && AUTH0_ERROR_MESSAGES[errorData.message]) {
                    throw {
                        ...errorData,
                        message: AUTH0_ERROR_MESSAGES[errorData.message]
                    };
                }

                throw errorData;
            }

            return response.json() as Promise<TResponse>;
        },
        onError: (error: unknown) => {
            const errorMessage = (error as { message?: string }).message
                || (error as { error_description?: string }).error_description
                || (error as { error?: string }).error
                || 'Operation failed';
            toast.error(errorMessage);
        }
    });
};

export const useAssignRoleMutation = () => {
    return useMutation({
        mutationFn: async ({ userId, roles }: { userId: string; roles: string[] }) => {
            const token = await getManagementToken();
            const encodedUserId = encodeURIComponent(userId);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/users/${encodedUserId}/roles`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ roles })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                if (errorData.message && AUTH0_ERROR_MESSAGES[errorData.message]) {
                    throw {
                        ...errorData,
                        message: AUTH0_ERROR_MESSAGES[errorData.message]
                    };
                }

                throw errorData;
            }

            return response.json();
        },
        onError: (error: unknown) => {
            const errorMessage = (error as { message?: string }).message
                || (error as { error_description?: string }).error_description
                || (error as { error?: string }).error
                || 'Operation failed';
            toast.error(errorMessage);
        }
    });
};