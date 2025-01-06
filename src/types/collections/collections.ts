export type Collections = Record<string, AppWrite.Document>;

export type CollectionName = keyof Collections;

export type CollectionType<Name extends CollectionName> = Collections[Name];
