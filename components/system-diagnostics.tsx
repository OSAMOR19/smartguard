"use client"

import { motion } from "framer-motion"
import { Activity, Cpu, HardDrive, Wifi, Zap } from "lucide-react"

interface SystemDiagnosticsProps {
  metrics: {
    cpu: number
    memory: number
    network: number
    power: number
  }
}

export default function SystemDiagnostics({ metrics }: SystemDiagnosticsProps) {
  const diagnostics = [
    { icon: Cpu, label: "CPU Usage", value: metrics.cpu, unit: "%", color: "blue" },
    { icon: HardDrive, label: "Memory", value: metrics.memory, unit: "%", color: "purple" },
    { icon: Wifi, label: "Network", value: metrics.network, unit: "Mbps", color: "green" },
    { icon: Zap, label: "Power", value: metrics.power, unit: "W", color: "yellow" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {diagnostics.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <item.icon className={`w-6 h-6 text-${item.color}-400`} />
            <span className="text-white font-bold text-lg">
              {Math.round(item.value)}
              {item.unit}
            </span>
          </div>

          <div className="mb-2">
            <span className="text-gray-300 text-sm font-medium">{item.label}</span>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, item.value)}%` }}
              transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
            />
          </div>

          <div className="flex items-center mt-2">
            <Activity className={`w-3 h-3 text-${item.color}-400 mr-1`} />
            <span className="text-xs text-gray-400">
              {item.value > 80 ? "High" : item.value > 50 ? "Normal" : "Low"}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
