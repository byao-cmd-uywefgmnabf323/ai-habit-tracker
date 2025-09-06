"use client";

import * as React from "react";

interface ProgressCircleProps {
  progress: number;
  className?: string;
}

export function ProgressCircle({ progress, className }: ProgressCircleProps) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
    >
      <circle
        className="text-muted/20"
        stroke="currentColor"
        strokeWidth="10"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
      />
      <circle
        className="text-primary transition-all duration-500 ease-out"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx="60"
        cy="60"
        transform="rotate(-90 60 60)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="font-heading text-2xl font-bold fill-current text-foreground"
      >
        {`${Math.round(progress)}%`}
      </text>
    </svg>
  );
}
