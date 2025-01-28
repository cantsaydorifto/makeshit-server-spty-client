import { Hono } from "hono";
import { BASE_URL } from "../utils";
const artistRouter = new Hono();

artistRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const res = await fetch(`${BASE_URL}/artists/${id}`, {
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
    const artist = await res.json();
    return c.json(artist);
  } catch (err: any) {
    return c.json({
      message: err && err.message ? err.message : "Internal Server Error",
      status: err && err.status ? err.status : 400,
    });
  }
});

artistRouter.get("/:id/albums", async (c) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const res = await fetch(`${BASE_URL}/artists/${id}/albums`, {
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
  } catch (err: any) {
    return c.json({
      message: err && err.message ? err.message : "Internal Server Error",
      status: err && err.status ? err.status : 400,
    });
  }
});

artistRouter.get("/:id/top-tracks", async (c) => {
  try {
    const id = c.req.param("id");
    console.log(id);
    const res = await fetch(`${BASE_URL}/artists/${id}/top-tracks`, {
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
    const tracks = await res.json();
    return c.json(tracks);
  } catch (err: any) {
    return c.json({
      message: err && err.message ? err.message : "Internal Server Error",
      status: err && err.status ? err.status : 400,
    });
  }
});

export default artistRouter;
