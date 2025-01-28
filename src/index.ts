import { Hono } from "hono";
import albumRouter from "./routes/album";
import tokenRouter from "./routes/token";
import { getToken } from "./utils/token";
import homepageRouter from "./routes/homepage";
import artistRouter from "./routes/artist";

const app = new Hono();

app.get("/", async (c) => {
  const token = await getToken();
  return c.json({ message: "Hellaaao,", token });
});

app.route("/artist", artistRouter);
app.route("/homepage", homepageRouter);
app.route("/token", tokenRouter);
app.route("/album", albumRouter);

export default {
  port: 8080,
  fetch: app.fetch,
};
