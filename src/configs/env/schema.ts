import { z } from "zod";

export const ClientEnvSchema = z.object({
  app: z.object({
    env: z
      .enum(["development", "staging", "production"])
      .default("development"),
    isDevMode: z.boolean(),
    assetUrl: z.string().url(),
  }),
  appwrite: z.object({
    endpoint: z.string().url(),
    projectId: z.string(),
    databaseId: z.string().optional(),
  }),
});

export const ServerEnvSchema = ClientEnvSchema.extend({
  app: z.object({
    env: z
      .enum(["development", "staging", "production"])
      .default("development"),
    isDevMode: z.boolean(),
    assetUrl: z.string().url(),
  }),
  appwrite: z.object({
    endpoint: z.string().url(),
    projectId: z.string(),
    databaseId: z.string(),
  }),
});

export type ClientEnv = z.infer<typeof ClientEnvSchema>;
export type ServerEnv = z.infer<typeof ServerEnvSchema>;
