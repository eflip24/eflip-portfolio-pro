import { Skeleton } from "@/components/ui/skeleton";

const ProjectDetailSkeleton = () => (
  <section className="py-24">
    <div className="container mx-auto px-4 max-w-4xl space-y-6">
      <Skeleton className="h-4 w-32 rounded-sm" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-sm" />
        <Skeleton className="h-5 w-20 rounded-sm" />
      </div>
      <Skeleton className="h-12 w-3/4 rounded-sm" />
      <Skeleton className="aspect-video w-full rounded-sm" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full rounded-sm" />
        <Skeleton className="h-4 w-5/6 rounded-sm" />
        <Skeleton className="h-4 w-2/3 rounded-sm" />
      </div>
      <Skeleton className="h-10 w-48 rounded-sm" />
    </div>
  </section>
);

export default ProjectDetailSkeleton;
