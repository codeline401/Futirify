import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // we'll use ClerkId
  email: text("email").notNull().unique(),
  name: text("name"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  upsatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("desciption").notNull(),
  imageUrl: text("image_url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  upsatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// onDelete: "cascade" means that if you delete one user, it'll delete all products created by

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// relations : define how table connect to each other. This enable Drizzle's query API.
// to auto join related data when using  `with: {relationName: true}`

// Users relations : A user cans have many products and many comments
// `many()` means one user can have multiple related records

export const usersRelations = relations(users, ({ many }) => ({
  product: many(products), // One user >> many products
  comment: many(comments), // one user >> many comments
}));

// Products Relations: a product belongs to one user cans have many comments
export const productsRelations = relations(products, ({ one, many }) => ({
  comment: one(comments),
  // `fields` = the foreign key column in THIS table (products.userId)
  // `references:` = the primary key column  in the RELATED table (users.id)
  user: one(users, { fields: [products.userId], references: [users.id] }),
}));

// Comments Relations : a comment belong to one user and one product
export const commentsRelations = relations(comments, ({ one }) => ({
  // `commets.userIs` = the foriegn Key
  // `users.id` = the primary key
  user: one(users, { fields: [comments.userId], references: [users.id] }), // one comments >> one user
  product: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }), // one comments >> one product
}));

// Type inference
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
