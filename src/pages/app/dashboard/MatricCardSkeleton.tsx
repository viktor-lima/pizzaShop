import { Skeleton } from "@/components/ui/skeleton";

interface MatricCardSkeletonProps {
  // adicione suas props aqui
}

export function MatricCardSkeleton(props: MatricCardSkeletonProps) {
  return (
    <>
    <Skeleton className="h-7 w-36 mt-1" />
    <Skeleton className="h-4 w-52" />
    </>
  );
}