import { cn } from "@/lib/utils";

type WaveDividerProps = {
  className?: string;
  flip?: boolean;
};

export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none w-full overflow-hidden leading-none",
        flip && "rotate-180",
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-12 w-full sm:h-16 md:h-20"
      >
        <path
          fill="currentColor"
          className="text-background"
          d="M0,64 C240,120 480,0 720,48 C960,96 1200,24 1440,64 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
