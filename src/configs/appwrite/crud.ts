"use server";

import { createClient } from "@/configs/appwrite/server";
import type {
  CollectionName,
  CollectionType,
} from "@/types/collections/collections";

import type { Models } from "appwrite";
import { ID } from "node-appwrite";
import { serverEnv } from "../env/server";

// Create Document
export async function createDocument<Name extends CollectionName>(
  collectionId: Name,
  data: Omit<CollectionType<Name>, keyof Models.Document>, // Exclude 'id' since it's auto-generated
): Promise<CrudResponse<CollectionType<Name>>> {
  const res: CrudResponse<CollectionType<Name>> = {};
  const client = await createClient();
  try {
    const response = await client.database.createDocument<CollectionType<Name>>(
      serverEnv.appwrite.databaseId,
      collectionId,
      ID.unique(),
      data,
    );
    res.data = response;
  } catch (error) {
    res.error = error as Error;
  }

  return res;
}

// Read Documents
export async function readDocuments<Name extends CollectionName>(
  collectionId: Name,
  queries: string[] = [],
): Promise<ReadResponse<CollectionType<Name>[]>> {
  const res: ReadResponse<CollectionType<Name>[]> = {};
  try {
    const client = await createClient();
    const response = await client.database.listDocuments<CollectionType<Name>>(
      serverEnv.appwrite.databaseId,
      collectionId,
      queries,
    );
    res.data = response.documents;
    res.total = response.total;
  } catch (error) {
    res.error = error as Error;
  }

  return res;
}

// Read Single Document
export async function readDocument<Name extends CollectionName>(
  collectionId: Name,
  documentId: string,
): Promise<CrudResponse<CollectionType<Name>>> {
  const res: CrudResponse<CollectionType<Name>> = {};
  const client = await createClient();
  try {
    const response = await client.database.getDocument<CollectionType<Name>>(
      serverEnv.appwrite.databaseId,
      collectionId,
      documentId,
    );
    res.data = response;
  } catch (error) {
    res.error = error as Error;
  }

  return res;
}

// Update Document
export async function updateDocument<Name extends CollectionName>(
  collectionId: Name,
  documentId: string,
  data: Partial<Omit<CollectionType<Name>, keyof Models.Document>>, // Allow partial updates
): Promise<CrudResponse<CollectionType<Name>>> {
  const res: CrudResponse<CollectionType<Name>> = {};
  const client = await createClient();
  try {
    const response = await client.database.updateDocument(
      serverEnv.appwrite.databaseId,
      collectionId,
      documentId,
      data,
    );
    res.data = response;
  } catch (error) {
    res.error = error as Error;
  }

  return res;
}

// Delete Document
export async function deleteDocument<Name extends CollectionName>(
  collectionId: Name,
  documentId: string,
): Promise<DeleteResponse> {
  const res: DeleteResponse = {};
  try {
    const client = await createClient();
    await client.database.deleteDocument(
      serverEnv.appwrite.databaseId,
      collectionId,
      documentId,
    );
    res.success = true;
  } catch (error) {
    res.error = error as Error;
  }

  return res;
}
