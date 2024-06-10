import { AspectRatio } from "@ui/components/aspect-ratio";
import { Card, CardContent, CardFooter } from "@ui/components/card";
import { Skeleton } from "@ui/components/skeleton";

export const SongCardSkeleton = () => {
  return (
    <Card className="w-[250px] flex flex-col">
      <div className="pb-4">
        <AspectRatio ratio={1} className="bg-muted rounded-t-lg" />
      </div>
      <CardContent className="space-y-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-4 w-20" />
      </CardContent>
      <CardFooter className="justify-center items-end flex-1">
        <Skeleton className="h-10 w-[200px]" />
      </CardFooter>
    </Card>
  );
};
