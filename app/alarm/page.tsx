"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Phone, Shield, X, Volume2, Camera, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AlarmPage() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCallActive, setIsCallActive] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    // Auto-call after 10 seconds
    const callTimeout = setTimeout(() => {
      setIsCallActive(true)
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(callTimeout)
    }
  }, [])

  const handleDismissAlarm = () => {
    router.push("/dashboard")
  }

  const handleEmergencyCall = () => {
    setIsCallActive(true)
    // Simulate emergency call
    setTimeout(() => {
      alert("Emergency services have been contacted!")
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-red-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(127,29,29,0.9) 100%)",
              "radial-gradient(circle, rgba(127,29,29,0.9) 0%, rgba(239,68,68,0.8) 100%)",
            ],
          }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="w-full h-full"
        />
      </div>

      {/* Pulsing Alert Overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 bg-red-500/20"
      />

      <div className="relative h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-black/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">SECURITY BREACH</h1>
              <p className="text-red-300 text-sm">Intruder Detected</p>
            </div>
          </div>
          <button
            onClick={handleDismissAlarm}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Main Alert Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Alarm Icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="mb-8"
          >
            <div className="relative">
              <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center shadow-2xl">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 border-4 border-red-400 rounded-full"
              />
            </div>
          </motion.div>

          {/* Alert Message */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">INTRUDER ALERT</h2>
            <p className="text-red-200 text-xl mb-2">Motion detected in Living Room</p>
            <p className="text-red-300">Unauthorized access detected</p>
          </motion.div>

          {/* Timer */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-semibold">Alert Duration</span>
            </div>
            <div className="text-3xl font-mono font-bold text-white">
              {Math.floor(timeElapsed / 60)
                .toString()
                .padStart(2, "0")}
              :{(timeElapsed % 60).toString().padStart(2, "0")}
            </div>
          </div>

          {/* Camera Feed */}
          <div className="w-full max-w-sm mb-8">
            <div className="bg-black rounded-2xl overflow-hidden border-2 border-red-500">
              <div className="relative aspect-video">
                <img src="/camera2.jpg" alt="Live feed" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-red-500/20 border-2 border-red-500 animate-pulse" />
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  LIVE THREAT
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                  Living Room Camera
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-sm space-y-4">
            <Button
              onClick={handleEmergencyCall}
              className={`w-full h-16 text-lg font-bold rounded-2xl transition-all duration-300 ${
                isCallActive ? "bg-green-500 hover:bg-green-600 animate-pulse" : "bg-red-600 hover:bg-red-700"
              } text-white shadow-lg`}
            >
              <Phone className="w-6 h-6 mr-3" />
              {isCallActive ? "Calling Emergency..." : "Call Emergency Services"}
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-14 bg-black/30 border-white/30 text-white hover:bg-black/50 rounded-xl"
              >
                <Camera className="w-5 h-5 mr-2" />
                View All Cameras
              </Button>
              <Button
                variant="outline"
                className="h-14 bg-black/30 border-white/30 text-white hover:bg-black/50 rounded-xl"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                Sound Siren
              </Button>
            </div>

            <Button
              onClick={handleDismissAlarm}
              variant="ghost"
              className="w-full h-12 text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
            >
              Dismiss Alert (I'm Safe)
            </Button>
          </div>
        </div>

        {/* Bottom Warning */}
        <div className="p-6 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-2 text-red-300">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-semibold">
              {isCallActive ? "Emergency services contacted" : "Emergency services will be contacted in 10 seconds"}
            </span>
          </div>
        </div>
      </div>

      {/* Sound Effect Simulation */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
        className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold"
      >
        🚨 ALARM SOUNDING
      </motion.div>
    </div>
  )
}
