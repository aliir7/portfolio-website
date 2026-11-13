import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Raw HTML in Markdown is not rendered (react-markdown default), so post bodies are safe.
// The page already has an <h1> (the post title), so headings start at <h2>.
const components: Components = {
  h1: ({ children }) => <h2 className="scroll-mt-28 pt-4 text-2xl font-bold sm:text-3xl">{children}</h2>,
  h2: ({ children }) => <h2 className="scroll-mt-28 pt-4 text-2xl font-bold sm:text-3xl">{children}</h2>,
  h3: ({ children }) => <h3 className="scroll-mt-28 pt-2 text-xl font-bold sm:text-2xl">{children}</h3>,
  h4: ({ children }) => <h4 className="text-lg font-bold">{children}</h4>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="text-primary underline underline-offset-4"
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="list-disc space-y-2 ps-6">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal space-y-2 ps-6">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="border-primary text-muted-foreground border-s-4 ps-4 italic">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <pre dir="ltr" className="bg-muted overflow-x-auto rounded-xl p-4 text-sm leading-6">
      {children}
    </pre>
  ),
  hr: () => <hr className="border-border" />,
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-border border px-3 py-2 text-start font-bold">{children}</th>,
  td: ({ children }) => <td className="border-border border px-3 py-2">{children}</td>,
  // eslint-disable-next-line @next/next/no-img-element -- post images come from arbitrary hosts
  img: ({ src, alt }) => <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" className="mx-auto rounded-xl" />,
};

/** Markdown (GFM) renderer for post bodies; the only place that knows the authoring format. */
export default function BlogContent({ content }: { content: string }) {
  return (
    <div className="space-y-6 text-base leading-8 sm:text-lg [&_:not(pre)>code]:bg-muted [&_:not(pre)>code]:rounded [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-[0.9em]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
