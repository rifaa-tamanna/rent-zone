import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db("rent-zone");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: false,
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const requestedRole = ctx.body?.role;

        const safeRole = requestedRole === "owner" ? "owner" : "customer";

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              role: safeRole,
            },
          },
        };
      }
    }),
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const requestBody = (
            ctx as typeof ctx & {
              body?: { role?: string };
            }
          ).body;

          const safeRole = requestBody?.role === "owner" ? "owner" : "customer";

          return {
            data: {
              ...user,
              role: safeRole,
            },
          };
        },
      },
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
