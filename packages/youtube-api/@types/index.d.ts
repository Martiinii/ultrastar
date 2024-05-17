type YoutubeVideo = {
  id: string;
  url: string;
  title: string;
  description: null;
  duration: number;
  channel_id: string;
  channel: string;
  channel_url: string;
  thumbnails: YoutubeThumbnail[];
  view_count: number;
  channel_is_verified: boolean;
};

type YoutubeThumbnail = {
  url: string;
  height: number;
  width: number;
};
