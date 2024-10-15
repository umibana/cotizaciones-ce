import { Pool } from 'pg';
import { betterAuth } from "better-auth";
import { username, admin } from "better-auth/plugins"


export const auth = betterAuth({
    emailAndPassword: { enabled: true },
    plugins: [username(), admin()],
    database: new Pool({
        connectionString: process.env.SUPABASE_CONNECTION_KEY
    })
})