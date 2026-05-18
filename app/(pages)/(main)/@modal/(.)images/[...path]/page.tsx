"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Dialog as DialogPrimitive } from "radix-ui";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTitle,
} from "@/components/Dialog";

export default function Page({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = use(params);
  const router = useRouter();
  const src = `/api/images/${path.join("/")}`;

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 outline-none">
          <DialogTitle className="sr-only">{path.at(-1)}</DialogTitle>
          <img
            src={src}
            alt={path.at(-1) ?? ""}
            style={{ maxWidth: "90dvw", maxHeight: "90dvh" }}
          />
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
