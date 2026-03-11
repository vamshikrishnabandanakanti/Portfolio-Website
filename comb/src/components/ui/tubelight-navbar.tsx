"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    url: string
    icon: any // Using any to avoid strict LucideIcon type issues if versions differ
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

export function NavBar({ items, className }: NavBarProps) {
    const [activeTab, setActiveTab] = useState(items[0].name)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div
            className={cn(
                "fixed bottom-0 sm:top-8 left-1/2 -translate-x-1/2 z-[100] mb-10 sm:mb-0",
                className,
            )}
        >
            <div className="flex items-center gap-2 bg-white border border-black/5 backdrop-blur-2xl p-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name

                    return (
                        <a
                            key={item.name}
                            href={item.url}
                            onClick={() => setActiveTab(item.name)}
                            className={cn(
                                "relative cursor-pointer text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300 flex items-center justify-center",
                                "text-black/50 hover:text-black",
                                isActive && "bg-black/5 text-black",
                            )}
                        >
                            <span className="hidden md:inline whitespace-nowrap">{item.name}</span>
                            <span className="md:hidden">
                                <Icon size={20} strokeWidth={2.5} />
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 w-full bg-black/5 rounded-full -z-10"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-black rounded-full overflow-visible">
                                        <div className="absolute w-12 h-6 bg-black/30 rounded-full blur-xl -top-3 -left-1" />
                                        <div className="absolute w-8 h-4 bg-black/20 rounded-full blur-lg -top-2" />
                                    </div>
                                </motion.div>
                            )}
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
