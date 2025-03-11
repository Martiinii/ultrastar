import { AspectRatio } from "@ui/components/aspect-ratio";
import { Badge } from "@ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@ui/components/card";
import Image from "next/image";
import type { SongsListDataProps } from "../songs-list/listData";
import { SongCardButton } from "./songCardButton";

export type SongCardProps = NonNullable<
  SongsListDataProps["data"]
>["songs"][number];
export const SongCard = (props: SongCardProps) => {
  const { id, artist, title, languages, year } = props;
  return (
    <Card className="w-[250px] flex flex-col">
      <div className="pb-4">
        <AspectRatio ratio={1} className="bg-muted rounded-t-lg relative">
          <Image
            src={`http://localhost:3001/api/songs/${id}/cover`}
            alt={`Album cover of ${artist} - ${title}`}
            fill
            sizes="300px"
            quality={100}
            className="object-cover rounded-t-lg"
          />
          <div className="absolute p-2 flex gap-2 flex-wrap bottom-0 w-full justify-end">
            {languages.split(",").map(
              (l) =>
                l && (
                  <Badge key={l} variant={"secondary"} className="capitalize">
                    {l}
                  </Badge>
                )
            )}
          </div>
        </AspectRatio>
      </div>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {artist} {year && `(${year})`}
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-center items-end flex-1">
        <SongCardButton {...props} />
      </CardFooter>
    </Card>
  );
};
