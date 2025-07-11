"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Shield, Smartphone, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

      <div className="relative h-full flex flex-col justify-center px-6 py-8">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">SmartGuard</h1>
          <p className="text-gray-300 text-lg">Advanced Security System</p>
        </motion.div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 max-w-md mx-auto w-full"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* Tab Switcher */}
            <div className="flex bg-gray-800/50 rounded-2xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isLogin
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  !isLogin
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 rounded-2xl h-14 px-6 text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </motion.div>
              )}

              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 rounded-2xl h-14 px-6 text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
              />

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 rounded-2xl h-14 px-6 pr-14 text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Lock className="w-5 h-5 mr-2" />
                {isLogin ? "Sign In Securely" : "Create Account"}
              </Button>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-400">
                {isLogin ? "New to SmartGuard? " : "Already secured? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  {isLogin ? "Sign up now" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-12 mt-8"
        >
          <div className="text-center">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-3 mx-auto">
              <Shield className="w-7 h-7 text-blue-400" />
            </div>
            <p className="text-sm text-gray-300 font-medium">Bank-Level Security</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-3 mx-auto">
              <Smartphone className="w-7 h-7 text-cyan-400" />
            </div>
            <p className="text-sm text-gray-300 font-medium">Mobile Optimized</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
