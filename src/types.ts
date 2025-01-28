interface MultipleCategoriesResponse {
  categories: PagingObject<CategoryObject>;
}
interface CategoryObject {
  href: string;
  icons: ImageObject[];
  id: string;
  name: string;
}
interface ImageObject {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}
interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
interface CategoryPlaylistsResponse {
  playlists: PagingObject<PlaylistObjectSimplified>;
}
interface PlaylistObjectSimplified extends PlaylistBaseObject {
  tracks: {
    href: string;
    total: number;
  };
}
interface PlaylistBaseObject extends ContextObject {
  collaborative: boolean;
  description: string | null;
  id: string;
  images: ImageObject[];
  name: string;
  owner: UserObjectPublic;
  public: boolean | null;
  snapshot_id: string;
  type: "playlist";
}
interface ContextObject {
  type: "artist" | "playlist" | "album" | "show" | "episode";
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
}
interface UserObjectPublic {
  display_name?: string | undefined;
  external_urls: {
    spotify: string;
  };
  followers?:
    | {
        href: null;
        total: number;
      }
    | undefined;
  href: string;
  id: string;
  images?: ImageObject[] | undefined;
  type: "user";
  uri: string;
}
interface ListOfNewReleasesResponse {
  message?: string | undefined;
  albums: PagingObject<AlbumObjectSimplified>;
}
interface ListOfFeaturedPlaylistsResponse {
  message?: string | undefined;
  playlists: PagingObject<PlaylistObjectSimplified>;
}
interface ArtistObjectSimplified extends ContextObject {
  name: string;
  id: string;
  type: "artist";
}
interface AlbumObjectSimplified extends ContextObject {
  album_group?: "album" | "single" | "compilation" | "appears_on" | undefined;
  album_type: "album" | "single" | "compilation";
  artists: ArtistObjectSimplified[];
  available_markets?: string[] | undefined;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions?:
    | {
        reason: string;
      }
    | undefined;
  type: "album";
  total_tracks: number;
}
interface SaavnHomepagePlaylistData {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  type: string;
  image: SaavnAlbumImage[];
  url: string;
  songCount: string;
  firstname: string;
  followerCount: string;
  lastUpdated: string;
  explicitContent: string;
}
interface SaavnAlbumImage {
  quality: string;
  link: string;
}
interface SaavnHomepageALbumData {
  id: string;
  name: string;
  year: string;
  type: string;
  playCount: number;
  language: string;
  explicitContent: string;
  url: string;
  primaryArtists: SaavnHomepageArtist[];
  artists: SaavnHomepageArtist[];
  image: SaavnAlbumImage[];
}
interface SaavnHomepageArtist {
  id: string;
  name: string;
  url: string;
  type: string;
  role: string;
  image: SaavnAlbumImage[];
}
interface SaavnSong {
  id: string;
  name: string;
  album: {
    id: string;
    name: string;
    url: string;
  };
  year: string;
  releaseDate: string;
  duration: number;
  label: string;
  primaryArtists: string;
  primaryArtistsId: string;
  featuredArtists: string;
  featuredArtistsId: string;
  explicitContent: number;
  playCount: string;
  language: string;
  hasLyrics: string;
  url: string;
  copyright: string;
  image: SaavnAlbumImage[];
  downloadUrl: SaavnDownloadUrl[];
}
interface SaavnDownloadUrl {
  quality: string;
  link: string;
}
