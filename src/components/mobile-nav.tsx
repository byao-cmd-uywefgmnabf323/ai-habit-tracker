"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const mainNav = [
  { href: "/today", title: "Today" },
  { href: "/habits", title: "Habits" },
  { href: "/analytics", title: "Analytics" },
  { href: "/coach", title: "AI Coach" },
  { href: "/settings", title: "Settings" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}
        >
          <nav className="fixed top-16 left-0 right-0 z-50 grid gap-6 p-8">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "py-3 text-center text-2xl font-semibold transition-colors hover:text-foreground/80 rounded-full",
                  pathname === item.href ? "text-foreground bg-muted" : "text-foreground/60"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
