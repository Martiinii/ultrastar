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
  artist: string | undefined;
  title: string | undefined;
  year: string | undefined;
  language: string | undefined;
};

type Song = {
  id: number;
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
