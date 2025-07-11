"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Phone, Shield, X, Volume2, Camera, Clock, Zap, Siren, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AlarmPage() {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCallActive, setIsCallActive] = useState(false)
  const [alarmIntensity, setAlarmIntensity] = useState(1)
  const [isDismissing, setIsDismissing] = useState(false)
  const router = useRouter()
  
  // Audio refs for multiple alarm sounds
  const sirenAudioRef = useRef<HTMLAudioElement>(null)
  const beepAudioRef = useRef<HTMLAudioElement>(null)
  const pulseAudioRef = useRef<HTMLAudioElement>(null)

  // Create intense alarm sounds using Web Audio API
  useEffect(() => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    // Function to create siren sound
    const createSirenSound = () => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()
      
      oscillator.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      // Intense siren frequency sweep
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.3)
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.6)
      
      // Filter for more aggressive sound
      filter.type = "highpass"
      filter.frequency.setValueAtTime(400, audioContext.currentTime)
      
      // Volume envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6)
      
      oscillator.type = "sawtooth"
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.6)
    }
    
    // Function to create emergency beep
    const createEmergencyBeep = () => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2)
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.type = "square"
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
    
    // Function to create pulse sound
    const createPulseSound = () => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      
      oscillator.type = "triangle"
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    }

    // Play different alarm sounds in sequence for maximum intensity
    const playAlarmSequence = () => {
      createSirenSound()
      setTimeout(() => createEmergencyBeep(), 200)
      setTimeout(() => createPulseSound(), 400)
    }

    // Start continuous alarm
    const alarmInterval = setInterval(() => {
      playAlarmSequence()
    }, 800) // Play every 800ms for maximum intensity

    // Increase intensity over time
    const intensityInterval = setInterval(() => {
      setAlarmIntensity(prev => Math.min(prev + 0.1, 3))
    }, 5000)

    return () => {
      clearInterval(alarmInterval)
      clearInterval(intensityInterval)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    // Auto-call after 15 seconds (increased from 10)
    const callTimeout = setTimeout(() => {
      setIsCallActive(true)
    }, 15000)

    return () => {
      clearInterval(interval)
      clearTimeout(callTimeout)
    }
  }, [])

  const handleDismissAlarm = () => {
    setIsDismissing(true)
    // Add delay to prevent accidental dismissal
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  const handleEmergencyCall = () => {
    setIsCallActive(true)
    // Simulate emergency call
    setTimeout(() => {
      alert("🚨 EMERGENCY SERVICES CONTACTED! 🚨\n\nPolice have been notified of the security breach.\n\nStay safe and do not approach the intruder.")
    }, 2000)
  }

  const handleSoundSiren = () => {
    // Trigger additional siren sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Very loud siren
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(1500, audioContext.currentTime + 0.5)
    oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 1)
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.6, audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
    
    oscillator.type = "sawtooth"
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 1)
  }

  return (
    <div className="fixed inset-0 bg-red-900 overflow-hidden">
      {/* Intense Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle, rgba(239,68,68,0.9) 0%, rgba(127,29,29,1) 50%, rgba(0,0,0,0.8) 100%)",
              "radial-gradient(circle, rgba(127,29,29,1) 0%, rgba(239,68,68,0.9) 50%, rgba(0,0,0,0.8) 100%)",
            ],
          }}
          transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="w-full h-full"
        />
      </div>

      {/* Intense Pulsing Alert Overlay */}
      <motion.div
        animate={{ 
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute inset-0 bg-red-500/30"
      />

      {/* Emergency Flash Overlay */}
      <motion.div
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
        className="absolute inset-0 bg-white/20"
      />

      <div className="relative h-full flex flex-col">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 bg-black/40 backdrop-blur-sm border-b border-red-500/50">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            >
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </motion.div>
            <div>
              <motion.h1 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-2xl font-bold text-white"
              >
                🚨 SECURITY BREACH 🚨
              </motion.h1>
              <p className="text-red-300 text-sm font-semibold">INTRUDER DETECTED - IMMEDIATE ACTION REQUIRED</p>
            </div>
          </div>
          <motion.button
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            onClick={handleDismissAlarm}
            disabled={isDismissing}
            className="p-3 bg-red-600/50 rounded-full hover:bg-red-600/70 transition-colors border-2 border-red-400"
          >
            <X className="w-8 h-8 text-white" />
          </motion.button>
        </div>

        {/* Main Alert Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Enhanced Alarm Icon */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            className="mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 20px rgba(239,68,68,0.5)",
                    "0 0 40px rgba(239,68,68,0.8)",
                    "0 0 20px rgba(239,68,68,0.5)"
                  ]
                }}
                transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
                className="w-40 h-40 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl"
              >
                <Siren className="w-20 h-20 text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 border-4 border-red-400 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 border-2 border-red-300 rounded-full"
              />
            </div>
          </motion.div>

          {/* Enhanced Alert Message */}
          <motion.div
            animate={{ 
              y: [0, -8, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            className="text-center mb-8"
          >
            <motion.h2 
              animate={{ 
                color: ["#ffffff", "#ff4444", "#ffffff"],
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,68,68,0.8)",
                  "0 0 10px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-5xl font-black text-white mb-4 tracking-wider"
            >
              🚨 INTRUDER ALERT 🚨
            </motion.h2>
            <motion.p 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
              className="text-red-200 text-2xl mb-2 font-bold"
            >
              MOTION DETECTED IN LIVING ROOM
            </motion.p>
            <p className="text-red-300 text-lg font-semibold">UNAUTHORIZED ACCESS CONFIRMED</p>
          </motion.div>

          {/* Enhanced Timer */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 10px rgba(239,68,68,0.3)",
                "0 0 20px rgba(239,68,68,0.6)",
                "0 0 10px rgba(239,68,68,0.3)"
              ]
            }}
            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            className="bg-black/60 backdrop-blur-sm rounded-3xl p-6 mb-8 text-center border-2 border-red-500"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Clock className="w-6 h-6 text-red-400" />
              </motion.div>
              <span className="text-red-300 font-bold text-lg">ALERT DURATION</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-4xl font-mono font-black text-white"
            >
              {Math.floor(timeElapsed / 60)
                .toString()
                .padStart(2, "0")}
              :{(timeElapsed % 60).toString().padStart(2, "0")}
            </motion.div>
          </motion.div>

          {/* Enhanced Camera Feed */}
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 0 10px rgba(239,68,68,0.5)",
                "0 0 20px rgba(239,68,68,0.8)",
                "0 0 10px rgba(239,68,68,0.5)"
              ]
            }}
            transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            className="w-full max-w-sm mb-8"
          >
            <div className="bg-black rounded-3xl overflow-hidden border-4 border-red-500">
              <div className="relative aspect-video">
                <img src="/camera2.jpg" alt="Live feed" className="w-full h-full object-cover" />
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-red-500/30 border-4 border-red-500"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-black border-2 border-white"
                >
                  🚨 LIVE THREAT 🚨
                </motion.div>
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-xl text-sm border border-red-500">
                  <p className="font-bold">Living Room Camera</p>
                  <p className="text-red-300 text-xs">AI DETECTION: 98% CONFIDENCE</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <div className="w-full max-w-sm space-y-4">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Button
                onClick={handleEmergencyCall}
                className={`w-full h-20 text-xl font-black rounded-3xl transition-all duration-300 ${
                  isCallActive 
                    ? "bg-green-600 hover:bg-green-700 animate-pulse border-4 border-green-400" 
                    : "bg-red-600 hover:bg-red-700 border-4 border-red-400"
                } text-white shadow-2xl`}
              >
                <Phone className="w-8 h-8 mr-3" />
                {isCallActive ? "🚨 CALLING EMERGENCY... 🚨" : "🚨 CALL EMERGENCY SERVICES 🚨"}
              </Button>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Button
                  variant="outline"
                  className="h-16 bg-black/50 border-2 border-white/50 text-white hover:bg-black/70 rounded-2xl font-bold"
                >
                  <Camera className="w-6 h-6 mr-2" />
                  View All Cameras
                </Button>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Button
                  onClick={handleSoundSiren}
                  variant="outline"
                  className="h-16 bg-red-600/30 border-2 border-red-400 text-white hover:bg-red-600/50 rounded-2xl font-bold"
                >
                  <Volume2 className="w-6 h-6 mr-2" />
                  Sound Siren
                </Button>
              </motion.div>
            </div>

            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Button
                onClick={handleDismissAlarm}
                disabled={isDismissing}
                variant="ghost"
                className="w-full h-14 text-white/80 hover:text-white hover:bg-white/20 rounded-2xl font-bold border-2 border-white/30"
              >
                {isDismissing ? "Dismissing..." : "Dismiss Alert (I'm Safe)"}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Bottom Warning */}
        <motion.div
          animate={{ 
            backgroundColor: ["rgba(0,0,0,0.6)", "rgba(239,68,68,0.2)", "rgba(0,0,0,0.6)"]
          }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          className="p-6 backdrop-blur-sm border-t-2 border-red-500"
        >
          <div className="flex items-center justify-center space-x-3 text-red-300">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
            >
              <AlertTriangle className="w-6 h-6" />
            </motion.div>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-base font-bold"
            >
              {isCallActive 
                ? "🚨 EMERGENCY SERVICES CONTACTED - POLICE EN ROUTE 🚨" 
                : "🚨 EMERGENCY SERVICES WILL BE CONTACTED IN 15 SECONDS 🚨"
              }
            </motion.span>
          </div>
        </motion.div>
      </div>

      {/* Multiple Sound Effect Indicators */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY }}
        className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-black border-2 border-white"
      >
        🔊 ALARM SOUNDING 🔊
      </motion.div>
      
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.2, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
        className="fixed top-16 right-4 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-black border-2 border-white"
      >
        🚨 INTRUDER DETECTED 🚨
      </motion.div>

      {/* Intensity Indicator */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          backgroundColor: ["rgba(239,68,68,0.8)", "rgba(239,68,68,1)", "rgba(239,68,68,0.8)"]
        }}
        transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
        className="fixed bottom-20 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold border-2 border-white"
      >
        INTENSITY: {Math.round(alarmIntensity * 100)}%
      </motion.div>
    </div>
  )
}
