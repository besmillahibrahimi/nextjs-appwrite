import isEmpty from "lodash-es/isEmpty";

export function validateEnvVars(requiredVars: readonly string[]) {
  const missingVars = requiredVars.filter((envVar) => !process.env[envVar]);

  if (!isEmpty(missingVars)) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n
          Please check your .env file and ensure all required variables are defined.`,
    );
  }
}

export function getEnvironment() {
  return {
    currentEnv: (process.env.APP_ENV || "development") as
      | "development"
      | "staging"
      | "production",
    isDevMode: process.env.APP_ENV === "development",
    isDevelopment: process.env.NODE_ENV !== "production",
  };
}
