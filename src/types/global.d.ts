import type { Models } from "appwrite";

declare global {
  namespace AppWrite {
    type Document = Models.Document;
    type User = Models.User<Models.Preferences>;
  }
}
