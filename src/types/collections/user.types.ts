import type { Models } from "appwrite";

export type TUser = Models.Document & {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};
