export type Collections = {
  users: TUser;
};

export type CollectionName = keyof Collections;

export type CollectionType<Name extends CollectionName> = Collections[Name];
