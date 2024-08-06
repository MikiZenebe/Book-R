import { AbilityBuilder, createMongoAbility } from "@casl/ability";

const defineAbilitiesFor = (user) => {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === "ADMIN") {
    can("manage", "all"); // Admin can manage all resources
  } else if (user.role === "OWNER") {
    can("read", "Book", { ownerId: user.id }); // Owners can read their own books
    can("create", "Book");
    can("update", "Book", { ownerId: user.id });
    can("delete", "Book", { ownerId: user.id });
  } else if (user.role === "RENTER") {
    can("read", "Book"); // Renters can read all books
    can("create", "Rental");
    can("read", "Rental", { userId: user.id }); // Renters can read their own rentals
    can("update", "Rental", { userId: user.id });
    can("delete", "Rental", { userId: user.id });
  }

  return build();
};

const abilities = (user) => defineAbilitiesFor(user);
// const abilities = {
//   ADMIN: defineAbilitiesFor("ADMIN"),
//   OWNER: defineAbilitiesFor("OWNER"),
//   RENTER: defineAbilitiesFor("RENTER"),
// };

export { abilities };
