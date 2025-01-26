import { ClientEnvSchema } from "./schema";

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

export const clientEnv = ClientEnvSchema.parse({
  app: {
    env: currentEnv,
    isDevMode,
    assetUrl: process.env.NEXT_PUBLIC_ASSET_URL,
    address: process.env.NEXT_PUBLIC_SITE_ADDRESS,
    localeCookieName:
      process.env.NEXT_PUBLIC_LOCALE_COOKIE_NAME ?? "LOCALE_NEXT_COOKIE",
  },
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.APPWRITE_DATABASE_ID,
  },
  auth: {
    authCookieName:
      process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME ?? "auth_session_token",
  },
});
