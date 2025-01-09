import type { Models as AppwriteModels } from "appwrite";

declare global {
  namespace AppWrite {
    type Document = AppwriteModels.Document;
    type Models = AppwriteModels;
    type User = AppwriteModels.User<AppwriteModels.Preferences>;
  }
}
