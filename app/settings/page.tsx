"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Phone,
  Moon,
  Wifi,
  Shield,
  Camera,
  User,
  HelpCircle,
  LogOut,
  ChevronRight,
  Smartphone,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import BottomNavigation from "@/components/bottom-navigation"

export default function Settings() {
  const [pushNotifications, setPushNotifications] = useState(true)
  const [callAlerts, setCallAlerts] = useState(false)
  const [nightMode, setNightMode] = useState(true)
  const [biometricAuth, setBiometricAuth] = useState(false)

  const settingsGroups = [
    {
      title: "Security Alerts",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          description: "Instant security alerts",
          type: "toggle",
          value: pushNotifications,
          onChange: setPushNotifications,
        },
        {
          icon: Phone,
          label: "Emergency Calls",
          description: "Auto-call emergency services",
          type: "toggle",
          value: callAlerts,
          onChange: setCallAlerts,
        },
        {
          icon: Smartphone,
          label: "Biometric Login",
          description: "Face ID / Touch ID authentication",
          type: "toggle",
          value: biometricAuth,
          onChange: setBiometricAuth,
        },
      ],
    },
    {
      title: "System Settings",
      items: [
        {
          icon: Moon,
          label: "Night Mode",
          description: "Enhanced security after dark",
          type: "toggle",
          value: nightMode,
          onChange: setNightMode,
        },
        {
          icon: Wifi,
          label: "Network Settings",
          description: "Wi-Fi and connectivity options",
          type: "navigation",
        },
        {
          icon: Shield,
          label: "Security Preferences",
          description: "Advanced security settings",
          type: "navigation",
        },
      ],
    },
    {
      title: "Devices",
      items: [
        {
          icon: Camera,
          label: "Camera Management",
          description: "3 cameras connected",
          type: "navigation",
          badge: "3",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Profile Settings",
          description: "Manage your account details",
          type: "navigation",
        },
        {
          icon: HelpCircle,
          label: "Help & Support",
          description: "Get help and contact support",
          type: "navigation",
        },
        {
          icon: LogOut,
          label: "Sign Out",
          description: "Sign out of your account",
          type: "action",
          danger: true,
        },
      ],
    },
  ]

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium">System Settings</span>
          </div>
          <div className="text-sm text-gray-400">v2.1.0</div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Header */}
          <div className="px-6 py-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
              <p className="text-gray-400 text-lg">Customize your security system</p>
            </motion.div>

            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">John Doe</h3>
                  <p className="text-gray-400">Premium Security Plan</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-green-400 text-sm font-medium">All systems operational</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>

            {/* Settings Groups */}
            <div className="space-y-8">
              {settingsGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + groupIndex * 0.1 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">{group.title}</h3>

                  <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden">
                    {group.items.map((item, itemIndex) => (
                      <div key={item.label}>
                        <div className="p-5 hover:bg-gray-700/30 transition-all duration-300 cursor-pointer group">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                item.danger
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-blue-400"
                              }`}
                            >
                              <item.icon className="w-6 h-6" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4
                                  className={`font-bold text-lg ${
                                    item.danger ? "text-red-400" : "text-white"
                                  } group-hover:text-blue-300 transition-colors`}
                                >
                                  {item.label}
                                </h4>
                                {item.badge && (
                                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-400">{item.description}</p>
                            </div>

                            {item.type === "toggle" && (
                              <Switch
                                checked={item.value}
                                onCheckedChange={item.onChange}
                                className="data-[state=checked]:bg-blue-500 scale-125"
                              />
                            )}

                            {(item.type === "navigation" || item.type === "action") && (
                              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                            )}
                          </div>
                        </div>

                        {itemIndex < group.items.length - 1 && <div className="h-px bg-gray-700/50 mx-5" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* App Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-12 pt-8 border-t border-gray-800"
            >
              <div className="space-y-2">
                <p className="text-gray-500 font-semibold">SmartGuard Security v2.1.0</p>
                <p className="text-gray-600 text-sm">© 2024 SmartGuard Technologies</p>
                <p className="text-gray-600 text-xs">Protected by military-grade encryption</p>
              </div>
            </motion.div>
          </div>
        </div>

        <BottomNavigation currentPage="settings" />
      </div>
    </div>
  )
}
