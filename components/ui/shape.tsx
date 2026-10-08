import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

// با این ساختار، تمام پراپ‌های Image را دریافت می‌کنیم و مقادیر ضروری را Optional در نظر می‌گیریم
interface ShapeProps extends Partial<ImageProps> {
  containerClassName?: string;
  showConnector?: boolean;
}

const Shape = ({
  src = "/assets/img/shape-1.png",
  alt = "deco-shape",
  width = 100,
  height = 100,
  className,
  containerClassName,
  showConnector = true,
  ...props
}: ShapeProps) => {
  return (
    <div
      className={cn(
        showConnector &&
          "bg-foreground before:bg-foreground before:border-foreground after:bg-foreground after:border-foreground absolute top-0 h-full w-0.5 before:absolute before:top-0 before:left-1/2 before:h-7.5 before:w-7.5 before:-translate-x-1/2 before:-translate-y-full before:rounded-full before:border-2 before:shadow-[4px_4px_var(--hero-shape-shadow)] before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-7.5 after:w-7.5 after:-translate-x-1/2 after:translate-y-full after:rounded-full after:border-2 after:shadow-[4px_4px_var(--hero-shape-shadow)] after:content-[''] dark:bg-white dark:before:border-white dark:before:bg-white dark:after:border-white dark:after:bg-white",
        !showConnector && "absolute",
        containerClassName,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn("block object-cover dark:invert", className)}
        {...props}
      />
    </div>
  );
};

export default Shape;
