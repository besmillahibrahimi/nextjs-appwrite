"use server";

import { ID, databases } from "@/configs/appwrite/appwrite";
import type {
  CollectionName,
  CollectionType,
} from "@/types/collections/collections";

import type { Models } from "appwrite";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || "";

// Create Document
export async function createDocument<Name extends CollectionName>(
  collectionId: Name,
  data: Omit<CollectionType<Name>, keyof Models.Document>, // Exclude 'id' since it's auto-generated
): Promise<CrudResponse<CollectionType<Name>>> {
  const res: CrudResponse<CollectionType<Name>> = {};

  try {
    const response = await databases.createDocument<CollectionType<Name>>(
      DATABASE_ID,
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
    const response = await databases.listDocuments<CollectionType<Name>>(
      DATABASE_ID,
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
  try {
    const response = await databases.getDocument<CollectionType<Name>>(
      DATABASE_ID,
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
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
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
    await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
    res.success = true;
  } catch (error) {
    res.error = error as Error;
  }

  return res;
}
