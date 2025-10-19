import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pickup: text("pickup").notNull(),
  dropoff: text("dropoff").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  taxiType: text("taxi_type", { enum: ["shared", "normal"] }).notNull(),
  fare: decimal("fare", { precision: 10, scale: 2 }).notNull(),
  status: text("status", { enum: ["upcoming", "completed", "cancelled"] }).notNull().default("upcoming"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
