import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
};

export function SectionHeading({
  label,
  title,
  description,
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">
        {label}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-brand sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
