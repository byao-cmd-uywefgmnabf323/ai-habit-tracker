"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Bot } from "lucide-react"

const mainNav = [
  { href: "/today", title: "Today" },
  { href: "/habits", title: "Habits" },
  { href: "/analytics", title: "Analytics" },
  { href: "/coach", title: "AI Coach" },
  { href: "/settings", title: "Settings" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Bot className="h-8 w-8 text-primary" />
        <span className="hidden font-bold sm:inline-block font-heading text-2xl">
          HabitTracker
        </span>
      </Link>
      <nav className="flex items-center gap-2 text-lg font-medium">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80 px-4 py-2 rounded-full",
              pathname === item.href ? "text-foreground bg-muted" : "text-foreground/60"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
