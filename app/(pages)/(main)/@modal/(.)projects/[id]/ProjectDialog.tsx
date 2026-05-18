"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogStickyHeader,
  DialogTitle,
} from "@/components/Dialog";
import Project from "@/features/portfolio/Project";
import { ProjectType } from "@/types/Data";

export default function ProjectDialog({ project }: { project: ProjectType }) {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className="sm:max-w-2xl max-h-[90dvh] flex flex-col p-0 gap-0"
        showCloseButton={false}
      >
        <DialogStickyHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogStickyHeader>
        <div className="scrollbar overflow-y-auto flex-1 p-6">
          <Project data={project} hasTitle={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
