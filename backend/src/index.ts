import { Hono } from "hono";
import { cors } from "hono/cors";

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

export default app;
