export type CollectionName = "contact_us" | "messages"; // add other tables name here
export type Collections = Record<string, AppWrite.Document>;

export type CollectionType<Name extends CollectionName> = Collections[Name];
