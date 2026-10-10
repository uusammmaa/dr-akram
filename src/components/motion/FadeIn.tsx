"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
};

const directionOffset = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, ...directionOffset[direction] }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}

type FadeInStaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function FadeInStagger({
  children,
  className,
  stagger = 0.1,
}: FadeInStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      variants={{
        hidden: {},
        visible: {
          transition: prefersReducedMotion
            ? { staggerChildren: 0 }
            : { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type FadeInItemProps = {
  children: ReactNode;
  className?: string;
};

export function FadeInItem({ children, className }: FadeInItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: prefersReducedMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
