import type { Models as AppwriteModels } from "appwrite";

declare global {
  type Models = AppwriteModels;
  type Document = AppwriteModels.Document;
}
