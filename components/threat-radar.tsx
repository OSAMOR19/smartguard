"use client"

import { motion } from "framer-motion"

interface ThreatRadarProps {
  threats: Array<{
    id: string
    angle: number
    distance: number
    type: "motion" | "intrusion" | "anomaly"
    severity: "low" | "medium" | "high"
  }>
}

export default function ThreatRadar({ threats = [] }: ThreatRadarProps) {
  const getThreatColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Radar Background */}
      <div className="absolute inset-0 rounded-full border-2 border-green-500/30">
        <div className="absolute inset-4 rounded-full border border-green-500/20">
          <div className="absolute inset-4 rounded-full border border-green-500/10">
            <div className="absolute inset-4 rounded-full border border-green-500/5" />
          </div>
        </div>
      </div>

      {/* Radar Sweep */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-400 to-transparent origin-left -translate-y-0.5" />
      </motion.div>

      {/* Center Hub */}
      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-400 rounded-full -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute inset-0 bg-green-400/50 rounded-full"
        />
      </div>

      {/* Threat Indicators */}
      {threats.map((threat) => {
        const x = 50 + threat.distance * 40 * Math.cos(((threat.angle - 90) * Math.PI) / 180)
        const y = 50 + threat.distance * 40 * Math.sin(((threat.angle - 90) * Math.PI) / 180)

        return (
          <motion.div
            key={threat.id}
            className={`absolute w-3 h-3 rounded-full ${getThreatColor(threat.severity)} -translate-x-1/2 -translate-y-1/2`}
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: Math.random() }}
          >
            <div className={`w-full h-full bg-current rounded-full`} />
            <motion.div
              className={`absolute inset-0 border-2 border-current rounded-full`}
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        )
      })}

      {/* Grid Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-500/10 -translate-y-0.5" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-green-500/10 -translate-x-0.5" />
      </div>
    </div>
  )
}
