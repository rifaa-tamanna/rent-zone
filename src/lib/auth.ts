// import { betterAuth } from "better-auth";
// import { createAuthMiddleware } from "better-auth/api";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
// const db = client.db("rent-zone");

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         required: false,
//         defaultValue: "customer",
//         input: false,
//       },
//     },
//   },

//   hooks: {
//     before: createAuthMiddleware(async (ctx) => {
//       if (ctx.path === "/sign-up/email") {
//         const requestedRole = ctx.body?.role;

//         const safeRole = requestedRole === "owner" ? "owner" : "customer";

//         return {
//           context: {
//             ...ctx,
//             body: {
//               ...ctx.body,
//               role: safeRole,
//             },
//           },
//         };
//       }
//     }),
//   },

//   databaseHooks: {
//     user: {
//       create: {
//         before: async (user, ctx) => {
//           const requestBody = (
//             ctx as typeof ctx & {
//               body?: { role?: string };
//             }
//           ).body;

//           const safeRole = requestBody?.role === "owner" ? "owner" : "customer";

//           return {
//             data: {
//               ...user,
//               role: safeRole,
//             },
//           };
//         },
//       },
//     },
//   },

//   database: mongodbAdapter(db, {
//     client,
//   }),
// });

import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);

const db = client.db("rent-zone");

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Allow only Customer and Owner during public signup.
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

      // Prevent users from changing their own role.
      if (ctx.path === "/update-user" && ctx.body) {
        const { role: _blockedRole, ...safeBody } = ctx.body;

        return {
          context: {
            ...ctx,
            body: safeBody,
          },
        };
      }
    }),
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const safeRole = user.role === "owner" ? "owner" : "customer";

          return {
            data: {
              ...user,
              role: safeRole,
            },
          };
        },
      },

      update: {
        before: async (user) => {
          if ("role" in user) {
            return false;
          }
        },
      },
    },
  },

  // JWT Plugin
  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          role: user.role ?? "customer",
        }),
      },
    }),
  ],

  database: mongodbAdapter(db, {
    client,
  }),
});
