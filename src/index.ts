import { Hono } from "hono";
import albumRouter from "./routes/album";
import tokenRouter from "./routes/token";
import homepageRouter from "./routes/homepage";
import artistRouter from "./routes/artist";

const app = new Hono();

app.get("/", async (c) => c.json({ message: "Hellaaao" }));

app.route("/artist", artistRouter);
app.route("/homepage", homepageRouter);
app.route("/token", tokenRouter);
app.route("/album", albumRouter);

export default {
  port: 8080,
  fetch: app.fetch,
};
