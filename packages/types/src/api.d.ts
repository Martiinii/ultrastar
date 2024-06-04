type SongHeaderType =
  | "artist"
  | "title"
  | "mp3"
  | "creator"
  | "cover"
  | "background"
  | "year"
  | "language"
  | "bpm"
  | "gap"
  | "video"
  | "videogap";

type SongHeaders = Map<SongHeaderType, string>;

type Metadata = {
  artist: string | null | undefined;
  title: string | null | undefined;
  year: string | number | null | undefined;
  languages: string[] | null | undefined;
};

type Song = {
  apiId: number;
  artist: string;
  title: string;
  languages: string[];
};

type Page = {
  totalPages: number;
  songs: Song[];
};

type YoutubeLink = {
  createdAt: Date;
  link: string;
};

type SearchParams = { [key: string]: string | string[] } | undefined;
