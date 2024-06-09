"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { IsDesktopProvider, useIsDesktop } from "@/providers/isDesktopProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/dialog";
import {
  Drawer,
  DrawerClose,
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
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
  };
  children?: React.ReactNode;
  className?: string;
};
export const ResponsiveDialog = ({
  open,
  onOpenChange,
  trigger,
  header,
  children,
  className,
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const responsiveDialogOrDrawer = isDesktop ? (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={className}>
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
  ) : (
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

  return (
    <IsDesktopProvider value={isDesktop}>
      {responsiveDialogOrDrawer}
    </IsDesktopProvider>
  );
};

type ResponsiveDialogCloseProps = {
  children: React.ReactNode;
};
export const ResponsiveDialogClose = ({
  children,
}: ResponsiveDialogCloseProps) => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DialogClose asChild>{children}</DialogClose>;
  }

  return <DrawerClose asChild>{children}</DrawerClose>;
};
