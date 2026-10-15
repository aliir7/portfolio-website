export default function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} role="alert" className="text-destructive text-sm">
      {error}
    </p>
  );
}
