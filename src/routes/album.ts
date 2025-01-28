import { Hono } from "hono";
import { BASE_URL } from "../utils";

const albumRouter = new Hono();

albumRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  console.log(id);
  const res = await fetch(`${BASE_URL}/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${Bun.env.ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) {
    const errorJson = await res.json();
    const error = errorJson.error as { status: number; message: string };
    console.log(error);
    throw { message: error.message, status: error.status };
  }
  const albums = await res.json();
  return c.json(albums);
});

export default albumRouter;
