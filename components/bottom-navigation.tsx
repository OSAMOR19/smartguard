"use client"

import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Activity, Plus, Settings } from "lucide-react"

interface BottomNavigationProps {
  currentPage: string
}

const navItems = [
  { id: "home", icon: Home, label: "Home", path: "/dashboard" },
  { id: "logs", icon: Activity, label: "Activity", path: "/logs" },
  { id: "setup", icon: Plus, label: "Add", path: "/setup" },
  { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
]

export default function BottomNavigation({ currentPage }: BottomNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-black/80 backdrop-blur-xl border-t border-gray-800">
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {navItems.map((item, index) => {
            const isActive = currentPage === item.id || pathname === item.path
            return (
              <motion.button
                key={item.id}
                onClick={() => router.push(item.path)}
                className="relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 min-w-[70px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-2xl border border-blue-400/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10 mb-1">
                  <item.icon
                    className={`w-6 h-6 transition-colors duration-300 ${isActive ? "text-blue-400" : "text-gray-400"}`}
                  />

                  {/* Active Indicator Dot */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    isActive ? "text-blue-400" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
