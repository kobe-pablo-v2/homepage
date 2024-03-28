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
	const result = await db.select().from(ArticleSchema).all();
	console.log(result);
	return c.json(result);
});

export default app;
