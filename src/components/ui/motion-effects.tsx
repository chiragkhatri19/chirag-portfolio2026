"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { useRef, memo, useMemo } from "react";

// Memoized spring config
const SPRING_CONFIG = { stiffness: 100, damping: 30, restDelta: 0.001 };

export const ParallaxScroll = memo(({
  children,
  className,
  baseVelocity = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  baseVelocity?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [100 * baseVelocity, -100 * baseVelocity]
  );
  const y = useSpring(yRaw, SPRING_CONFIG);

  return (
    <motion.div ref={ref} style={{ y }} className={cn("", className)}>
      {children}
    </motion.div>
  );
});

ParallaxScroll.displayName = 'ParallaxScroll';

export const FadeInWhenVisible = memo(({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Skip animation if user prefers reduced motion
  const animationProps = useMemo(() => ({
    initial: prefersReducedMotion ? {} : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: prefersReducedMotion 
      ? { duration: 0 } 
      : { duration: 0.5, delay, ease: "easeOut" as const },
  }), [delay, prefersReducedMotion]);
  return (
    <motion.div
      {...animationProps}
      className={className}
    >
      {children}
    </motion.div>
  );
});

FadeInWhenVisible.displayName = 'FadeInWhenVisible';

// Memoized stagger variants
const createStaggerVariants = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

export const StaggerChildren = memo(({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const variants = useMemo(() => createStaggerVariants(staggerDelay), [staggerDelay]);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
});

StaggerChildren.displayName = 'StaggerChildren';

// Memoized item variants
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const StaggerItem = memo(({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      variants={ITEM_VARIANTS}
      className={className}
    >
      {children}
    </motion.div>
  );
});

StaggerItem.displayName = 'StaggerItem';

// Memoized spring config for hover
const HOVER_SPRING = { type: "spring" as const, stiffness: 400, damping: 10 };

export const ScaleOnHover = memo(({
  children,
  className,
  scale = 1.02,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={HOVER_SPRING}
      className={className}
    >
      {children}
    </motion.div>
  );
});

ScaleOnHover.displayName = 'ScaleOnHover';
