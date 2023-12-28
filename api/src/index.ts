import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

const route = app
  .use(
    "/api/*",
    cors({
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://showichiro.github.io",
      ],
    })
  )
  .get("/api/sheets/:sheetId", async (c) => {
    const { DB } = c.env;
    const db = drizzle(DB, { schema });
    const result = await db.query.sheets.findFirst({
      where: eq(schema.sheets.id, Number(c.req.param("sheetId"))),
      with: { categories: { with: { counters: {} } } },
    });
    return c.json(result);
  })
  .post(
    "/api/sheets",
    zValidator(
      "json",
      z.object({
        id: z.number().optional(),
        name: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }
    ),
    async (c) => {
      const { DB } = c.env;
      const db = drizzle(DB, { schema });
      const body = c.req.valid("json");
      // update sheets
      if (body.id) {
        const sheet = await db
          .update(schema.sheets)
          .set({
            name: body.name,
            updated_at: new Date().toISOString(),
          })
          .where(eq(schema.sheets.id, body.id))
          .returning();
        return c.json({ ...sheet[0] });
      } else {
        // insert sheets
        const sheet = await db
          .insert(schema.sheets)
          .values({
            name: body.name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .returning();
        return c.json({ ...sheet[0] });
      }
    }
  )
  .post(
    "/api/sheets:bulk-insert",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        categories: z.array(
          z.object({
            name: z.string(),
            counters: z.array(
              z.object({
                name: z.string(),
                count: z.number(),
              })
            ),
          })
        ),
      }),
      (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }
    ),
    async (c) => {
      const { DB } = c.env;
      const db = drizzle(DB, { schema });
      const body = c.req.valid("json");
      const now = new Date().toISOString();
      const sheet = await db
        .insert(schema.sheets)
        .values({ name: body.name, created_at: now, updated_at: now })
        .returning();
      const categories = await db
        .insert(schema.categories)
        .values(
          body.categories.map((val) => ({
            sheet_id: sheet[0].id,
            name: val.name,
            created_at: now,
            updated_at: now,
          }))
        )
        .returning();
      for (let i = 0; i < body.categories.length; i++) {
        await db
          .insert(schema.counters)
          .values(
            body.categories[i].counters.map((val) => ({
              category_id: categories[i].id,
              name: val.name,
              count: val.count,
              created_at: now,
              updated_at: now,
            }))
          )
          .returning();
      }
      const result = await db.query.sheets.findFirst({
        where: eq(schema.sheets.id, sheet[0].id),
        with: { categories: { with: { counters: {} } } },
      });
      return c.json(result);
    }
  )
  .post(
    "/api/sheets/:sheetId/categories",
    zValidator(
      "json",
      z.object({
        id: z.number().optional(),
        name: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }
    ),
    async (c) => {
      const { DB } = c.env;
      const db = drizzle(DB, { schema });
      const body = c.req.valid("json");
      if (body.id) {
        // update categories
        const category = await db
          .update(schema.categories)
          .set({
            name: body.name,
            sheet_id: Number(c.req.param("sheetId")),
            updated_at: new Date().toISOString(),
          })
          .where(eq(schema.categories, body.id))
          .returning();
        return c.json(category);
      } else {
        const category = await db
          .insert(schema.categories)
          .values({
            name: body.name,
            sheet_id: Number(c.req.param("sheetId")),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .returning();
        return c.json(category);
      }
    }
  )
  .post(
    "/api/sheets/:sheetId/categories/:categoryId/counters",
    zValidator(
      "json",
      z.object({
        id: z.number().optional(),
        name: z.string(),
        count: z.number(),
      }),
      (result, c) => {
        if (!result.success) {
          return c.json(result.error, 400);
        }
      }
    ),
    async (c) => {
      const { DB } = c.env;
      const db = drizzle(DB, { schema });
      const body = c.req.valid("json");
      if (body.id) {
        const counter = await db
          .update(schema.counters)
          .set({
            name: body.name,
            category_id: Number(c.req.param("categoryId")),
            count: body.count,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          })
          .where(eq(schema.counters, body.id))
          .returning();
        return c.json(counter);
      } else {
        const counter = await db
          .insert(schema.counters)
          .values({
            name: body.name,
            category_id: Number(c.req.param("categoryId")),
            count: body.count,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .returning();
        return c.json(counter);
      }
    }
  )
  .delete("/api/sheets/:sheetId", async (c) => {
    const { DB } = c.env;
    const db = drizzle(DB, { schema });
    const result = await db
      .delete(schema.sheets)
      .where(eq(schema.sheets.id, Number(c.req.param("sheetId"))))
      .returning();
    return c.json(result);
  });

export type AppType = typeof route;

export default app;
