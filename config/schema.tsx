
import { integer, pgTable, varchar,date, json, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer().notNull().default(5),
});

export const ProjectTable = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar().notNull(),
  projectName:varchar(),
  theme:varchar(),
  userInput: varchar().notNull(),
  device: varchar({ length: 1024 }).notNull(),
  createdOn: date().defaultNow(),
  config: json(),
  projectVisualDescription:text(),
  userId:varchar().references(() => usersTable.email).notNull(),
  screenshot:text()
});

export const ScreenConfigTable=pgTable('screenConfig',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar().references(()=>ProjectTable.projectId),
  screenId:varchar(),
  screenName:varchar(),
  purpose:varchar(),
  screenDescription:varchar(),
  code:text()
})