
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("kindova");

export const auth = betterAuth({
    database: mongodbAdapter(db, { client, }),

    emailAndPassword: {
        enabled: true,
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"],
        },
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },

    user: {
        additionalFields: {
            phoneNumber: {
                type: "string",
                required: false,
            },
            location: {
                type: "string",
                required: false,
            },
            bio: {
                type: "string",
                required: false,
            },
        },
    },
    plugins: [
        jwt(),
    ],
});
