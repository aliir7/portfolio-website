import { Spinner } from "@/components/ui/spinner";

export default function PageLoading({ label }: { label: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner aria-label={label} className="text-primary size-10" />
    </div>
  );
}
