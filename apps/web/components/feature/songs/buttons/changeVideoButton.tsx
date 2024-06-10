import { IconButton } from "@ui/components/icon-button";
import { Music } from "lucide-react";
import type { SongCardProps } from "../song-card";

export const ChangeVideoButton = ({}: SongCardProps) => {
  return (
    <IconButton className="w-full" icon={{ icon: Music }} variant={"secondary"}>
      Change video
    </IconButton>
  );
};
