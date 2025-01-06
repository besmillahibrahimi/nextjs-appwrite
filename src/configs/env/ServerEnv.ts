import { ServerEnvSchema } from "./schema";
import { getEnvironment, validateEnvVars } from "./utils";

export const requiredEnvVars = [
  "NEXT_PUBLIC_APPWRITE_ENDPOINT",
  "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  "APPWRITE_DATABASE_ID",
] as const;

const { currentEnv, isDevMode, isDevelopment } = getEnvironment();

if (isDevelopment) {
  validateEnvVars(requiredEnvVars);
}

const serverEnv = ServerEnvSchema.parse({
  app: {
    env: currentEnv,
    isDevMode,
    assetUrl: process.env.NEXT_PUBLIC_ASSET_URL,
  },
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    apiKey: process.env.APPWRITE_API_KEY,
  },
});

export default serverEnv;
