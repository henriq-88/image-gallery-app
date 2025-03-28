// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `image-management-compression_${name}`
);

export const images = createTable(
  "image",
  (d) => ({
    id: d
      .text()
      .$defaultFn(() => createId())
      .primaryKey(),
    name: d.text({ length: 256 }).notNull(),
    path: d.text({ length: 256 }).notNull().unique(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)]
);
