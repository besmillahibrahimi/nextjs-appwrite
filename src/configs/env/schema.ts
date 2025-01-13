import { z } from "zod";

export const EnvSchema = z.object({
  auth: z.object({
    authCookieName: z.string(),
  }),
  app: z.object({
    env: z
      .enum(["development", "staging", "production"])
      .default("development"),
    isDevMode: z.boolean(),
    assetUrl: z.string().url(),
    address: z.string().url(),
  }),
  appwrite: z.object({
    endpoint: z.string().url(),
    projectId: z.string(),
    databaseId: z.string().optional(),
    apiKey: z.string(),
  }),
});

export type ClientEnv = z.infer<typeof EnvSchema>;
