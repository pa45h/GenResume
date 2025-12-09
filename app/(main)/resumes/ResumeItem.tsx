"use client";

import ResumePreview from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeServerData } from "@/lib/types";
import { mapToResumeValues } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Copy, Download, MoreVertical, Printer, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteResume } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/LoadingButton";
import { useReactToPrint } from "react-to-print";
import { handleCopy } from "../editor/ShareResume";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });

  const wasUpdated = resume.updatedAt > resume.createdAt;

  return (
    <div className="group bg-secondary relative flex flex-col justify-between rounded-md border p-4 ring-white/50 transition-all duration-300 hover:shadow-md hover:ring">
      <Link
        href={`/editor?resumeId=${resume.id}`}
        className="inline-block w-full text-center"
      >
        <p className="line-clamp-1 font-bold">{resume.title || "Untitled"}</p>
        {resume.description && (
          <p className="line-clamp-2 font-light">{resume.description}</p>
        )}
        <p className="text-muted-foreground mt-1 text-xs">
          {wasUpdated
            ? `Updated on ${formatDate(resume.updatedAt, "MMM dd, yyyy h:mm a")}`
            : `Created on ${formatDate(resume.createdAt, "MMM dd, yyyy h:mm a")}`}
        </p>
      </Link>
      <Link
        href={`editor?resumeId=${resume.id}`}
        className="relative mt-2 inline-block w-full"
      >
        <ResumePreview
          resumeData={mapToResumeValues(resume)}
          contentRef={contentRef}
          className="overflow-hidden shadow transition-shadow duration-300 group-hover:shadow-lg"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white" />
      </Link>
      <MoreMenu resdumeId={resume.id} reactToPrintFn={reactToPrintFn} />
    </div>
  );
}

interface MoreMenuProps {
  resdumeId: string;
  reactToPrintFn: () => void;
}

function MoreMenu({ resdumeId, reactToPrintFn }: MoreMenuProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1 left-1 duration-300 hover:cursor-pointer"
          >
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <Trash2 className="text-destructive size-4" />
            <span className="text-destructive mt-0.5">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={reactToPrintFn}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <Download className="size-4 text-white" />
            <span className="mt-0.5">Download</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              handleCopy(resdumeId);
            }}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <Copy className="size-4 text-white" />
            <span className="mt-0.5">Copy Link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmModal
        resumeId={resdumeId}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  );
}

interface DeleteConfirmModalProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConfirmModal({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmModalProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
        toast.success("Resume deleted successfully.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete resume. Please try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Resume</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this resume? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingButton>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
