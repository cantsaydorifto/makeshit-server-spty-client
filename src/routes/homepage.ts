import { Hono } from "hono";
import { BASE_URL } from "../utils/BASE_URL";
const homepageRouter = new Hono();

const SAAVN_API_URL = Bun.env.SAAVN_API_URL ?? "";

homepageRouter.get("/", async (c) => {
  try {
    const [newReleases, svnHomepageData] = await Promise.all([
      fetch(`${BASE_URL}/browse/new-releases?limit=50&country=US`, {
        headers: {
          Authorization: `Bearer ${Bun.env.ACCESS_TOKEN}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          const errorObject = (await res.json()) as {
            error: { status: number; message: string };
          };
          console.log({
            status: errorObject.error.status,
            message: errorObject.error.message,
          });
          return null;
          // throw {
          //   status: errorObject.error.status,
          //   message: errorObject.error.message,
          // };
        }
        return res.json() as Promise<ListOfNewReleasesResponse>;
      }),
      fetch(`${SAAVN_API_URL}/modules?language=english,spanish`).then((res) =>
        res.ok ? res.json() : null
      ),
    ]);
    return c.json({
      newReleases,
      svnData: {
        albums: svnHomepageData.data.albums,
        trendingSongs: svnHomepageData.data.trending.songs.map(
          (el: { primaryArtists: { name: string; id: string }[] }) => ({
            ...el,
            primaryArtists: el.primaryArtists[0].name,
            primaryArtistsId: el.primaryArtists[0].id,
          })
        ),
      },
    });
  } catch (err: any) {
    return c.json({
      message: err && err.message ? err.message : "Internal Server Error",
      status: err && err.status ? err.status : 400,
    });
  }
});

export default homepageRouter;
