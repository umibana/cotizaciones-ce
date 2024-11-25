import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useAuth = () => {
    const {
        isAuthenticated,
        isLoading,
        user,
        loginWithRedirect,
        logout,
        getAccessTokenSilently,
    } = useAuth0();

    return {
        isAuthenticated,
        isLoading,
        user,
        loginWithRedirect,
        logout,
        getAccessTokenSilently,
    };
};

// Hook for authenticated queries
export const useAuthenticatedQuery = <T>(
    queryKey: string[],
    url: string,
    options = {}
) => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    return useQuery({
        queryKey,
        queryFn: async () => {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE
                }
            });

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json() as Promise<T>;
        },
        enabled: isAuthenticated, // Only run the query if the user is authenticated
        ...options,
    });
};

// Hook for authenticated mutations
export const useAuthenticatedMutation = <TResponse, TInput = void>(
    url: string,
    method = 'POST'
) => {
    const { getAccessTokenSilently } = useAuth0();

    return useMutation<TResponse, Error, TInput>({
        mutationFn: async (data) => {
            const token = await getAccessTokenSilently({
                authorizationParams: {
                    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                }
            });

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json() as Promise<TResponse>;
        },
    });
};