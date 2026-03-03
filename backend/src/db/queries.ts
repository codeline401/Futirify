import { db } from "./index";
import { eq } from "drizzle-orm";
import {
  users,
  products,
  comments,
  type NewUser,
  type NewProduct,
  type NewComment,
} from "./schema";

// USERS QUERIES
// create user
export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const [user] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return user;
};

//upsert => create or update
export const upsertUser = async (data: NewUser) => {
  return await db.insert(users).values(data).onConflictDoUpdate({
    target: users.id, // colonne unique uo PK
    set: data,
  });
};

// PRODUCTS QUERIES

export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();
  return product;
};

export const getAllProducts = async () => {
  return db.query.products.findMany({
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)], // desc means : you'll see the latest product first
    // the sqaure brackets are required because drizzel ORM's orderBy expects array, even for a single column
  });
};

export const getProductById = async (id: string) => {
  return await db.query.products
    .findFirst({
      where: eq(products.id, id),
      with: {
        user: true,
        comments: {
          with: { user: true },
        },
      },
    })
    .then((product) => {
      if (product?.comments && Array.isArray(product.comments)) {
        product.comments.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );
      }
      return product;
    });
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const [product] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return product;
};

export const upsertProduct = async (data: NewProduct) => {
  return await db.insert(products).values(data).onConflictDoUpdate({
    target: products.id,
    set: data,
  });
};

export const getProductByUserId = async (userId: string) => {
  return await db.query.products.findMany({
    where: eq(products.userId, userId),
    with: {
      user: true,
    },
    orderBy: (products, { desc }) => [desc(products.createdAt)],
  });
};

export const deleteProduct = async (id: string) => {
  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  return product;
};

// COMMENTS QUERIES
export const createComments = async (data: NewComment) => {
  const [comment] = await db.insert(comments).values(data).returning();
  return comment;
};

export const deleteComments = async (id: string) => {
  const [comment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();
  return comment;
};

export const getCommentById = async (id: string) => {
  return db.query.comments.findMany({
    where: eq(comments.id, id),
    with: { user: true },
    orderBy: (comments, { desc }) => [desc(comments.createdAt)],
  });
};
