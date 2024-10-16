import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { toast } from "sonner";


export const client = createAuthClient({
    plugins: [
        adminClient(),
    ],
    fetchOptions: {
        onError(e) {
            if (e.error.status === 429) {
                toast.error("Too many requests. Please try again later.");
            }
        },
    },
});

export const {
    signUp,
    signIn,
    signOut,
    useSession,
    user,
} = client;