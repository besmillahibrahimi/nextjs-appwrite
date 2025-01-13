import { EnvSchema } from "./schema";
import { getEnvironment, validateEnvVars } from "./utils";

const { currentEnv, isDevMode, isDevelopment } = getEnvironment();

export const requiredEnvVars = [
  "NEXT_PUBLIC_APPWRITE_ENDPOINT",
  "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
  "APPWRITE_DATABASE_ID",
] as const;

if (isDevelopment) {
  validateEnvVars(requiredEnvVars);
}

const env = EnvSchema.parse({
  app: {
    env: currentEnv,
    isDevMode,
    assetUrl: process.env.NEXT_PUBLIC_ASSET_URL,
    address: process.env.NEXT_PUBLIC_SITE_ADDRESS,
  },
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    apiKey: process.env.APPWRITE_API_KEY,
  },
  auth: {
    authCookieName:
      process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ?? "auth_session_token",
  },
});

export default env;
