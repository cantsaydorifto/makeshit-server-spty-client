import { Hono } from "hono";
import { supabase } from "../utils";
import { generateToken } from "../utils/token";

const tokenRouter = new Hono();
tokenRouter.post("/", async (c) => {
  try {
    const token = await generateToken();
    return c.json({ token });
  } catch (err: any) {
    return c.json({
      message: err && err.message ? err.message : "Internal Server Error",
      status: err && err.status ? err.status : 400,
    });
  }
});
tokenRouter.get("/", async (c) => {
  try {
    const { data, error } = await supabase.from("spotfy-access").select("*");
    if (error) {
      throw { status: 500, message: "Error fetching token" };
    }
    if (data.length === 0) {
      throw { status: 404, message: "Token not found" };
    }
    return c.json(data);
  } catch (err: any) {
    return c.json({
      message: err && err.message ? err.message : "Internal Server Error",
      status: err && err.status ? err.status : 400,
    });
  }
});

export default tokenRouter;
