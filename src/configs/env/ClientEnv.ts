import { ClientEnvSchema } from "./schema";
import { getEnvironment } from "./utils";

const { currentEnv, isDevMode } = getEnvironment();

const clientEnv = ClientEnvSchema.parse({
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
  },
});

export default clientEnv;
