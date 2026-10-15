export default function PageLoading({ label }: { label: string }) {
  return (
    <div role="status" aria-busy="true" className="flex min-h-[40vh] items-center justify-center">
      <span className="border-primary size-8 animate-spin rounded-full border-4 border-t-transparent" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
