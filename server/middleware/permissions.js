import { AbilityBuilder, createMongoAbility } from "@casl/ability";

const defineAbilitiesFor = (role) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (role === "ADMIN") {
    can("manage", "all"); // Admin can manage all resources
  } else if (role === "OWNER") {
    can("read", "Book", { ownerId: "user_id" }); // Owners can read their own books
    can("create", "Book");
    can("update", "Book", { ownerId: "user_id" });
    can("delete", "Book", { ownerId: "user_id" });
  }

  return build();
};

const abilities = {
  ADMIN: defineAbilitiesFor("ADMIN"),
  OWNER: defineAbilitiesFor("OWNER"),
  RENTER: defineAbilitiesFor("RENTER"),
};

export { abilities };
