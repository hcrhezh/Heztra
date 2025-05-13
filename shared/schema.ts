import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Portfolio table
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  technologies: text("technologies").array().notNull(),
  projectUrl: text("project_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Apps table
export const apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: text("price"),
  priceLabel: text("price_label").notNull(),
  description: text("description").notNull(),
  rating: integer("rating").notNull(),
  reviews: integer("reviews").notNull(),
  imageUrl: text("image_url").notNull(),
  isPaid: boolean("is_paid").notNull(),
  features: text("features").array(),
  screenshots: text("screenshots").array(),
  developer: text("developer"),
  releaseDate: text("release_date"),
  version: text("version"),
  size: text("size"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Users table (required from the original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  createdAt: true,
});

export const insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true,
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;

export type App = typeof apps.$inferSelect;
export type InsertApp = z.infer<typeof insertAppSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
