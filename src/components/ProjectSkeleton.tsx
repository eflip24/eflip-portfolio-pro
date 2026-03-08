import { Skeleton } from "@/components/ui/skeleton";

const ProjectSkeleton = () => (
  <div className="bg-card border border-border overflow-hidden">
    <Skeleton className="aspect-video w-full rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-4 w-16 rounded-sm" />
      <Skeleton className="h-5 w-3/4 rounded-sm" />
      <Skeleton className="h-4 w-full rounded-sm" />
      <Skeleton className="h-4 w-2/3 rounded-sm" />
    </div>
  </div>
);

export default ProjectSkeleton;
