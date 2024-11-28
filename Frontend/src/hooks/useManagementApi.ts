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
                throw new Error('Operation failed');
            }

            return response.json() as Promise<TResponse>;
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
};