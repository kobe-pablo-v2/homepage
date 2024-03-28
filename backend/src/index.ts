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

app.post('/contact', async (c) => {
	const formData = await c.req.json();
	await fetch("https://hooks.slack.com/services/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", {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
		text: `名前: ${formData.name}\nメール: ${formData.email}\nメッセージ: ${formData.message}`,
	  }),
	});
  
	return c.json({ message: 'Success' });
  });

export default app;
