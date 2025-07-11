"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  ShieldCheck,
  Eye,
  AlertTriangle,
  Wifi,
  Battery,
  Play,
  Pause,
  Cpu,
  HardDrive,
  Activity,
  Zap,
  Scan,
  Target,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Camera,
  Smartphone,
  Router,
  Tv,
  Lock,
  Fingerprint,
  Radar,
  VolumeX,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import BottomNavigation from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"

const cameraFeeds = [
  {
    id: 1,
    name: "Front Driveway",
    location: "Exterior",
    image: "/camera1.png",
    status: "online",
    lastMotion: "2 min ago",
    resolution: "4K",
    nightVision: true,
  },
  {
    id: 2,
    name: "Living Room",
    location: "Interior",
    image: "/camera2.jpg",
    status: "online",
    lastMotion: "15 min ago",
    resolution: "1080p",
    nightVision: false,
  },
  {
    id: 3,
    name: "Office Space",
    location: "Interior",
    image: "/camera3.jpg",
    status: "online",
    lastMotion: "1 hour ago",
    resolution: "1080p",
    nightVision: true,
  },
]

// Connected devices for network topology
const connectedDevices = [
  { id: 1, name: "Front Camera", type: "camera", status: "online", signal: 95 },
  { id: 2, name: "Living Room Cam", type: "camera", status: "online", signal: 88 },
  { id: 3, name: "Office Camera", type: "camera", status: "online", signal: 92 },
  { id: 4, name: "Smart Lock", type: "lock", status: "online", signal: 78 },
  { id: 5, name: "Motion Sensor", type: "sensor", status: "online", signal: 85 },
  { id: 6, name: "Smart TV", type: "tv", status: "online", signal: 90 },
  { id: 7, name: "Mobile App", type: "phone", status: "online", signal: 100 },
  { id: 8, name: "Router", type: "router", status: "online", signal: 100 },
]

// Particle component for cool effects
const Particle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-400 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 2,
    }}
  />
)

export default function Dashboard() {
  const [isArmed, setIsArmed] = useState(false)
  const [motionDetected, setMotionDetected] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [showBiometric, setShowBiometric] = useState(false)
  const [alarmSoundEnabled, setAlarmSoundEnabled] = useState(true)
  const [systemHealth, setSystemHealth] = useState({
    cpu: 23,
    memory: 67,
    network: 89,
    storage: 45,
  })
  const [threatLevel, setThreatLevel] = useState("LOW")
  const [zoom, setZoom] = useState(1)
  const [nightVision, setNightVision] = useState(false)
  const router = useRouter()
  const alarmAudioRef = useRef<HTMLAudioElement>(null)

  // Create alarm sound effect
  useEffect(() => {
    // Create audio context for alarm sound
    const createAlarmSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      const playAlarmSound = () => {
        if (!alarmSoundEnabled) return

        // Create oscillator for siren sound
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        // Siren frequency sweep
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.5)
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 1)

        // Volume envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)

        oscillator.type = "sawtooth"
        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 1)
      }

      return playAlarmSound
    }

    const playAlarm = createAlarmSound()

    if (motionDetected && threatLevel !== "LOW") {
      // Play alarm sound repeatedly
      const alarmInterval = setInterval(() => {
        playAlarm()
      }, 1000)

      // Stop alarm after 10 seconds or when motion is cleared
      const stopAlarmTimeout = setTimeout(() => {
        clearInterval(alarmInterval)
      }, 10000)

      return () => {
        clearInterval(alarmInterval)
        clearTimeout(stopAlarmTimeout)
      }
    }
  }, [motionDetected, threatLevel, alarmSoundEnabled])

  // Real-time system metrics simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth((prev) => ({
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 5)),
        storage: Math.max(30, Math.min(80, prev.storage + (Math.random() - 0.5) * 3)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Simulate motion detection and threat analysis
  useEffect(() => {
    const interval = setInterval(() => {
      if (isArmed && Math.random() > 0.85) {
        setMotionDetected(true)
        const newThreatLevel = Math.random() > 0.6 ? "HIGH" : "MEDIUM"
        setThreatLevel(newThreatLevel)
        
        // Immediately trigger alarm for HIGH threats
        if (newThreatLevel === "HIGH") {
          setTimeout(() => {
            router.push("/alarm")
          }, 2000) // Reduced delay for faster response
        }
      }
    }, 10000) // Increased interval to make it less frequent but more impactful

    return () => clearInterval(interval)
  }, [isArmed, router])

  const getThreatColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "from-red-500 to-pink-500"
      case "MEDIUM":
        return "from-yellow-500 to-orange-500"
      case "LOW":
        return "from-green-500 to-emerald-500"
      default:
        return "from-blue-500 to-cyan-500"
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "camera":
        return Camera
      case "lock":
        return Lock
      case "phone":
        return Smartphone
      case "router":
        return Router
      case "tv":
        return Tv
      default:
        return Activity
    }
  }

  const BiometricScanner = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => setShowBiometric(false)}
    >
      <div className="bg-gray-900/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
          className="w-32 h-32 mx-auto mb-6 relative"
        >
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full"></div>
          <div className="absolute inset-4 border-2 border-cyan-400 rounded-full"></div>
          <Fingerprint className="absolute inset-0 m-auto w-16 h-16 text-blue-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Biometric Authentication</h3>
        <p className="text-gray-400">Place finger on sensor</p>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="mt-4 text-blue-400 text-sm"
        >
          Scanning...
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>

      <div className="h-full flex flex-col relative z-10">
        {/* Enhanced Status Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              <span className="text-sm text-gray-300 font-medium">All Systems Online</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getThreatColor(threatLevel)}`}>
              {threatLevel} THREAT
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAlarmSoundEnabled(!alarmSoundEnabled)}
              className={`p-2 rounded-full transition-colors ${
                alarmSoundEnabled ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {alarmSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowBiometric(true)}
              className="p-2 bg-blue-500/20 rounded-full hover:bg-blue-500/30 transition-colors"
            >
              <Fingerprint className="w-4 h-4 text-blue-400" />
            </button>
            <div className="text-sm text-gray-400 font-mono">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Header */}
          <div className="px-6 py-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Security Command Center</h1>
              <p className="text-gray-400 text-lg">Advanced threat monitoring & control</p>
            </motion.div>

            {/* System Health Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              {[
                { icon: Cpu, label: "CPU", value: systemHealth.cpu, color: "blue" },
                { icon: HardDrive, label: "Memory", value: systemHealth.memory, color: "purple" },
                { icon: Wifi, label: "Network", value: systemHealth.network, color: "green" },
                { icon: Zap, label: "Storage", value: systemHealth.storage, color: "orange" },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      <span className="text-gray-300 font-medium">{metric.label}</span>
                    </div>
                    <span className="text-white font-bold">{Math.round(metric.value)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Security Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 mb-6 relative overflow-hidden"
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-full h-full"
                >
                  <Radar className="w-full h-full text-blue-500" />
                </motion.div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={isArmed ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className={`p-4 rounded-2xl ${isArmed ? "bg-green-500/20" : "bg-gray-500/20"}`}
                    >
                      {isArmed ? (
                        <ShieldCheck className="w-8 h-8 text-green-400" />
                      ) : (
                        <Shield className="w-8 h-8 text-gray-400" />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Security System</h3>
                      <p className="text-gray-400">{isArmed ? "Armed - AI Monitoring Active" : "Disarmed"}</p>
                    </div>
                  </div>
                  <Switch
                    checked={isArmed}
                    onCheckedChange={setIsArmed}
                    className="data-[state=checked]:bg-green-500 scale-125"
                  />
                </div>

                {isArmed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          className="w-3 h-3 bg-green-400 rounded-full"
                        />
                        <span className="text-green-400 font-semibold">AI threat detection active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">3 cameras • 12 sensors</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Enhanced Live Camera Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Live Intelligence Feed</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">AI Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-5 h-5 text-green-400" />
                    <Battery className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-black rounded-3xl overflow-hidden border border-gray-800 relative">
                <div className="relative aspect-video">
                  <img
                    src={cameraFeeds[selectedCamera].image || "/placeholder.svg"}
                    alt={cameraFeeds[selectedCamera].name}
                    className={`w-full h-full object-cover transition-all duration-300 ${nightVision ? "hue-rotate-90 contrast-125" : ""}`}
                    style={{ transform: `scale(${zoom})` }}
                  />

                  {/* Enhanced Live Indicator */}
                  <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm rounded-full px-4 py-2 border border-red-400/50">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="w-2 h-2 bg-white rounded-full"
                      />
                      <span className="text-white text-sm font-bold">LIVE • AI</span>
                    </div>
                  </div>

                  {/* Camera Info with Tech Details */}
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-3 border border-gray-600/50">
                    <p className="text-white font-semibold">{cameraFeeds[selectedCamera].name}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-300">
                      <span>{cameraFeeds[selectedCamera].location}</span>
                      <span>•</span>
                      <span>{cameraFeeds[selectedCamera].resolution}</span>
                      {cameraFeeds[selectedCamera].nightVision && (
                        <>
                          <span>•</span>
                          <span className="text-green-400">Night Vision</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Advanced Camera Controls */}
                  <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setZoom(Math.min(3, zoom + 0.5))}
                        className="bg-black/70 backdrop-blur-sm rounded-full p-3 hover:bg-black/90 transition-colors border border-gray-600/50"
                      >
                        <ZoomIn className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => setZoom(Math.max(1, zoom - 0.5))}
                        className="bg-black/70 backdrop-blur-sm rounded-full p-3 hover:bg-black/90 transition-colors border border-gray-600/50"
                      >
                        <ZoomOut className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setNightVision(!nightVision)}
                        className={`bg-black/70 backdrop-blur-sm rounded-full p-3 hover:bg-black/90 transition-colors border border-gray-600/50 ${nightVision ? "bg-green-500/20" : ""}`}
                      >
                        {nightVision ? (
                          <Sun className="w-4 h-4 text-green-400" />
                        ) : (
                          <Moon className="w-4 h-4 text-white" />
                        )}
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-black/70 backdrop-blur-sm rounded-full p-3 hover:bg-black/90 transition-colors border border-gray-600/50"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                  </div>

                  {/* Motion Detection Overlay with AI Analysis */}
                  {motionDetected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-red-500/20 border-4 border-red-500"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/90 text-white px-6 py-3 rounded-2xl font-bold text-lg border border-red-400"
                      >
                        <div className="flex items-center space-x-2">
                          <Scan className="w-5 h-5" />
                          <span>AI THREAT DETECTED</span>
                        </div>
                      </motion.div>

                      {/* AI Analysis Overlay */}
                      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-red-500/50">
                        <div className="text-red-400 text-sm font-bold mb-2">AI ANALYSIS</div>
                        <div className="space-y-1 text-xs text-white">
                          <div>• Human detected: 95% confidence</div>
                          <div>• Unauthorized access: HIGH</div>
                          <div>• Threat level: {threatLevel}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Camera Selector */}
                <div className="p-4 bg-gray-900/50 border-t border-gray-800">
                  <div className="flex space-x-3 overflow-x-auto">
                    {cameraFeeds.map((camera, index) => (
                      <button
                        key={camera.id}
                        onClick={() => setSelectedCamera(index)}
                        className={`flex-shrink-0 relative rounded-2xl overflow-hidden border-2 transition-all ${
                          selectedCamera === index
                            ? "border-blue-400 shadow-lg shadow-blue-400/25"
                            : "border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <img
                          src={camera.image || "/placeholder.svg"}
                          alt={camera.name}
                          className="w-20 h-14 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-2 h-2 rounded-full mb-1 ${camera.status === "online" ? "bg-green-400" : "bg-red-400"}`}
                            />
                            <span className="text-xs text-white font-medium">{camera.resolution}</span>
                          </div>
                        </div>
                        {camera.nightVision && (
                          <div className="absolute top-1 right-1 bg-green-500/80 rounded-full p-1">
                            <Moon className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Improved Network Topology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Connected Devices</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">{connectedDevices.length} devices online</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {connectedDevices.slice(0, 8).map((device, index) => {
                  const Icon = getDeviceIcon(device.type)
                  return (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-gray-900/50 rounded-2xl p-3 border border-gray-700/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium text-sm truncate">{device.name}</p>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${device.status === "online" ? "bg-green-400" : "bg-red-400"}`}
                            />
                            <span className="text-gray-400 text-xs">{device.signal}% signal</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Simple AI Monitoring Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                motionDetected 
                  ? "bg-red-500/10 border-red-500/30" 
                  : "bg-green-500/10 border-green-500/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={motionDetected ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {motionDetected ? (
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    ) : (
                      <Eye className="w-8 h-8 text-green-400" />
                    )}
                  </motion.div>
                  <div>
                    <p className={`font-bold text-lg ${motionDetected ? "text-red-400" : "text-green-400"}`}>
                      {motionDetected ? "AI Threat Detected!" : "All Clear - AI Monitoring"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {motionDetected ? "Immediate action required" : "All systems secure"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setMotionDetected(!motionDetected)}
                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-xl"
                  >
                    Test AI
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => router.push("/alarm")}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl"
                  >
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Trigger Alarm
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <BottomNavigation currentPage="home" />
      </div>

      {/* Biometric Scanner Modal */}
      <AnimatePresence>{showBiometric && <BiometricScanner />}</AnimatePresence>
    </div>
  )
}
