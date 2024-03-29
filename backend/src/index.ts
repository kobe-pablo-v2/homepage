import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { ArticleSchema } from "./db/schema";

type Env = {
	Bindings: {
		DB: D1Database;
	};
};

const app = new Hono<Env>();

app.use("*", cors());

app.get("/hello", (c) => {
	return c.text("Hello Hono!");
});

// 記事一覧を取得する
app.get("/articles", async (c) => {
	const db = drizzle(c.env.DB);
	const { page = 1, perPage = 6 } = c.req.query();

	const offset = (Number(page) - 1) * Number(perPage);
	const limit = Number(perPage);

	const result = await db
		.select({
			id: ArticleSchema.id,
			title: ArticleSchema.title,
			imageUrl: ArticleSchema.imageUrl,
			createdAt: ArticleSchema.createdAt,
		})
		.from(ArticleSchema)
		.offset(offset)
		.limit(limit)
		.all();

	console.log(result);
	return c.json(result);
});

// 記事の総数を取得する
app.get("/articles/count", async (c) => {
	const db = drizzle(c.env.DB);
	const result = await db.select({ total: count() }).from(ArticleSchema);
	console.log(result);
	return c.json({ total: result[0].total });
});

export default app;
