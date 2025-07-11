"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QrCode, Wifi, Camera, ChevronLeft, ChevronRight, Check, Smartphone, Router, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BottomNavigation from "@/components/bottom-navigation"

const steps = [
  {
    id: 1,
    title: "Scan Device QR Code",
    description: "Point your camera at the device QR code",
    icon: QrCode,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Connect to Wi-Fi",
    description: "Enter your network credentials",
    icon: Wifi,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Test Camera Feed",
    description: "Verify camera is working properly",
    icon: Camera,
    color: "from-green-500 to-emerald-500",
  },
]

export default function CameraSetup() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wifiName, setWifiName] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      nextStep()
    }, 3000)
  }

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      nextStep()
    }, 4000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <div className="relative mx-auto w-72 h-72">
              <div className="w-full h-full bg-gray-800/30 rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-600">
                {isScanning ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl"
                  >
                    <Scan className="w-16 h-16 text-white" />
                  </motion.div>
                ) : (
                  <QrCode className="w-32 h-32 text-gray-500" />
                )}
              </div>

              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 border-4 border-blue-400 rounded-3xl"
                >
                  <motion.div
                    animate={{ y: [0, 260, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.5, ease: "linear" }}
                    className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  />
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3 text-blue-400">
                <Smartphone className="w-6 h-6" />
                <span className="text-lg font-medium">Position camera over QR code</span>
              </div>

              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full h-16 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50"
              >
                {isScanning ? "Scanning Device..." : "Start QR Scan"}
              </Button>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-2xl">
                <Router className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Network Configuration</h3>
              <p className="text-gray-400">Connect your device to Wi-Fi</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-3">Network Name (SSID)</label>
                <Input
                  type="text"
                  placeholder="Enter Wi-Fi network name"
                  value={wifiName}
                  onChange={(e) => setWifiName(e.target.value)}
                  className="bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 rounded-2xl h-14 px-6 text-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-3">Password</label>
                <Input
                  type="password"
                  placeholder="Enter Wi-Fi password"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  className="bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 rounded-2xl h-14 px-6 text-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                />
              </div>

              <Button
                onClick={handleConnect}
                disabled={isConnecting || !wifiName || !wifiPassword}
                className="w-full h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50"
              >
                {isConnecting ? "Connecting to Network..." : "Connect Device"}
              </Button>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8"
          >
            <div>
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-2xl">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Setup Complete!</h3>
              <p className="text-gray-400 text-lg">Your new camera is ready to use</p>
            </div>

            <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6">
              <div className="relative bg-black rounded-2xl aspect-video mb-4 overflow-hidden">
                <img src="/camera3.jpg" alt="New camera feed" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-bold">LIVE</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-xl">
                  <p className="font-semibold">New Security Camera</p>
                  <p className="text-sm text-gray-300">Office Space</p>
                </div>
              </div>
              <p className="text-green-400 font-semibold">✓ Camera feed is working perfectly</p>
            </div>

            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300"
            >
              Go to Security Dashboard
            </Button>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium">Device Setup</span>
          </div>
          <div className="text-sm text-gray-400">
            Step {currentStep} of {steps.length}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="px-6 py-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Add New Camera</h1>
              <p className="text-gray-400 text-lg">Follow the steps to set up your device</p>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        currentStep >= step.id
                          ? `bg-gradient-to-r ${step.color} text-white shadow-lg shadow-blue-500/25`
                          : "bg-gray-800/50 text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-20 h-1 mx-3 rounded-full transition-all duration-300 ${
                          currentStep > step.id ? "bg-gradient-to-r from-blue-500 to-cyan-400" : "bg-gray-700"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{steps[currentStep - 1]?.title}</h2>
                <p className="text-gray-400">{steps[currentStep - 1]?.description}</p>
              </div>
            </motion.div>

            {/* Step Content */}
            <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 mb-8">
              <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
            </div>

            {/* Navigation */}
            {currentStep < 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between"
              >
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="ghost"
                  className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-2xl disabled:opacity-50 px-6 py-3"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>

                <Button
                  onClick={nextStep}
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-2xl px-6 py-3"
                >
                  Skip Step
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <BottomNavigation currentPage="setup" />
      </div>
    </div>
  )
}
