"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
}: BentoGridItemProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5",
        className,
      )}
    >
      {header && <div className="flex-1">{header}</div>}
      <div>
        <div className="mb-2 flex items-center gap-2">
          {icon}
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
