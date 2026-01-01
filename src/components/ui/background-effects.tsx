"use client";
import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      {/* Subtle gradient - no blocking overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full stroke-primary/10 [mask-image:radial-gradient(70%_70%_at_top_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="80"
            height="80"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 80V.5H80" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#grid-pattern)"
        />
      </svg>
      
      {/* Animated gradient beams */}
      <div className="absolute left-1/2 top-0 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48">
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-primary to-glow-secondary opacity-20"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
        />
      </div>
      <div className="absolute right-1/2 top-1/2 mr-24 transform-gpu overflow-hidden blur-3xl lg:mr-24 xl:mr-48">
        <div
          className="aspect-[801/1036] w-[40.0625rem] bg-gradient-to-tl from-glow-secondary to-glow-tertiary opacity-20"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
        />
      </div>
    </div>
  );
};

export const GridBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full bg-background",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_70%,transparent_110%)] -z-10"
      />
      {children}
    </div>
  );
};

export const DotBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full bg-background",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground)/0.15)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_70%,transparent_100%)] -z-10" />
      {children}
    </div>
  );
};

export const Aurora = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute -inset-[10px] opacity-50">
        <div
          className="absolute inset-0 animate-aurora bg-[length:200%_200%] blur-3xl"
          style={{
            backgroundImage: `
              linear-gradient(
                115deg,
                hsl(var(--glow-primary) / 0.5),
                hsl(var(--glow-secondary) / 0.3),
                hsl(var(--glow-tertiary) / 0.2),
                hsl(var(--glow-primary) / 0.4)
              )
            `,
          }}
        />
      </div>
    </div>
  );
};
