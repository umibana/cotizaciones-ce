import { Pool } from 'pg';
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"


export const auth = betterAuth({
    emailAndPassword: { enabled: true },
    plugins: [admin()],
    database: new Pool({
        connectionString: process.env.SUPABASE_CONNECTION_KEY
    })
})