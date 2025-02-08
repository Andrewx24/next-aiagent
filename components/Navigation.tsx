"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Bot, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ModeToggle"

const links = [
  { name: "Home", href: "/", icon: Home },
  { name: "AI Agent", href: "/agent", icon: Bot },
  { name: "Chatbot", href: "/chatbot", icon: MessageSquare },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col justify-between w-64 p-4 bg-background border-r">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">AI Assistant</h1>
        <ul className="space-y-2">
          {links.map((link) => {
            const LinkIcon = link.icon
            const isActive = pathname === link.href
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors",
                    isActive
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                      : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  )}
                >
                  <LinkIcon className={cn("h-5 w-5", isActive && "text-blue-500")} />
                  <span>{link.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <ModeToggle />
    </nav>
  )
}

