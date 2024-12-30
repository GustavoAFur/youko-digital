import { Skeleton } from "@/components/ui/skeleton";

const SkeletonComponent = () => {
  return ( 
    <div className="w-[150px] space-y-1">
          <Skeleton className="rounded-md w-[150px] h-[150px]" />
          <Skeleton className="rounded-md h-6 w-[150px]" />
          <Skeleton className="rounded-md h-4 w-[80px]" />
          <Skeleton className="rounded-md h-4 w-[80px]" />
      </div>
   );
}
 
export default SkeletonComponent;