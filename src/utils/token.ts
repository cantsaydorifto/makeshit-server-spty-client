import supabase from "./subabase";

export async function generateToken(): Promise<string | null> {
  try {
    const CLIENT_ID = Bun.env.CLIENT_ID ?? "";
    const CLIENT_SECRET = Bun.env.CLIENT_SECRET ?? "";
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });
    const data = await res.json();
    // console.log("DATA: ", data);
    if (!res.ok) throw { status: res.status, message: data.error };
    return data;
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

export async function getToken(): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("spotfy-access")
      .select("*")
      .single();
    if (error || data.length === 0) {
      return null;
    }
    return data.token;
  } catch (err: any) {
    console.error(err);
    return null;
  }
}

// export async function refreshToken(): Promise<{
//   message: string;
//   token: string;
// } | null> {
//   try {
//     const token = "akopkdawepda";
//     const { data, error } = await supabase
//       .from("spotfy-access")
//       .insert({ token, isActive: true });
//     if (error) {
//       throw { status: 500, message: "Error creating token" };
//     }
//     return { message: "Token created", token };
//   } catch (err: any) {
//     return c.json({
//       message: err && err.message ? err.message : "Internal Server Error",
//       status: err && err.status ? err.status : 400,
//     });
//   }
// }
