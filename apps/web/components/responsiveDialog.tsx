"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/components/drawer";

type ResponsiveDialogProps = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  trigger: React.ReactNode;
  header?: {
    title: string;
    description?: string;
  };
  children?: React.ReactNode;
};
export const ResponsiveDialog = ({
  open,
  onOpenChange,
  trigger,
  header,
  children,
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          {header && (
            <DialogHeader>
              <DialogTitle>{header.title}</DialogTitle>
              {header.description && (
                <DialogDescription>{header.description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          {header && (
            <DrawerHeader>
              <DrawerTitle>{header.title}</DrawerTitle>
              {header.description && (
                <DrawerDescription>{header.description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}
          <div className="grid w-full gap-4 p-4">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
