"use client";
import { Account, Client, Databases, Functions, Storage } from "appwrite";
import clientEnv from "../env/client";

export { ID } from "appwrite";

export const client = new Client();
client
  .setEndpoint(clientEnv.appwrite.endpoint)
  .setProject(clientEnv.appwrite.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
