"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface AnimatedSkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export default function AnimatedSkillBar({ 
  name, 
  level, 
  delay = 0 
}: AnimatedSkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="space-y-1.5 md:space-y-2">
        <div className="flex justify-between text-xs md:text-sm">
          <span>{name}</span>
          <span className="text-[var(--accent)]/60">{level}%</span>
        </div>
        <div className="h-1.5 md:h-2 bg-[var(--accent)]/10 rounded overflow-hidden">
          <div 
            className="h-full bg-[var(--accent)] rounded"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="space-y-1.5 md:space-y-2">
      <motion.div 
        className="flex justify-between text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay, duration: 0.3 }}
      >
        <span>{name}</span>
        <motion.span 
          className="text-[var(--accent)]/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.3 }}
        >
          {level}%
        </motion.span>
      </motion.div>
      <div className="h-1.5 md:h-2 bg-[var(--accent)]/10 rounded overflow-hidden">
        <motion.div 
          className="h-full bg-[var(--accent)] rounded"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ 
            delay: delay + 0.1, 
            duration: 0.8, 
            ease: "easeOut" 
          }}
        />
      </div>
    </div>
  );
}
