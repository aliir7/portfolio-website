import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  retryLabel: string;
  homeLabel: string;
  onRetry: () => void;
  homeHref?: string;
};

/** Shared body of every error boundary (public site, admin, global). */
export default function ErrorState({ title, description, retryLabel, homeLabel, onRetry, homeHref = "/" }: Props) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
      <p className="text-muted-foreground max-w-md leading-7">{description}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onRetry}>{retryLabel}</Button>
        {/* Plain link on purpose: a full navigation resets a broken client state. */}
        <Button asChild variant="outline">
          <a href={homeHref}>{homeLabel}</a>
        </Button>
      </div>
    </main>
  );
}
