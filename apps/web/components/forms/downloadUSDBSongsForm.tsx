"use client";

import { clientApi } from "@/lib/api";
import { Button } from "@ui/components/button";
import { Progress } from "@ui/components/progress";
import { useState } from "react";
import { toast } from "sonner";

export const DownloadUSDBSongsForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    setIsPending(true);

    const { error, data } = await clientApi.sync.download({ page: 1 }).post();

    if (error) {
      setIsPending(false);
      toast.error("An unknown error occured while downloading songs from USDB");
      return;
    }

    for await (const chunk of data) {
      setProgress(chunk.progress);
    }

    setProgress(0);
    setIsPending(false);
    toast.success("Songs have been downloaded!");
  };

  return (
    <div className="flex flex-col gap-2 w-60">
      <Button onClick={handleDownload} disabled={isPending}>
        Download {isPending && `${progress}%`}
      </Button>
      {isPending && <Progress className="w-60" value={progress} />}
    </div>
  );
};
