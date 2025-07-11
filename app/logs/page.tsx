"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Eye, Camera, Clock, Filter, Search, Play, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BottomNavigation from "@/components/bottom-navigation"

const activityLogs = [
  {
    id: 1,
    type: "motion",
    title: "Motion Detected",
    location: "Front Driveway",
    time: "2 minutes ago",
    level: "high",
    thumbnail: "/camera1.png",
    duration: "00:15",
  },
  {
    id: 2,
    type: "motion",
    title: "Person Detected",
    location: "Living Room",
    time: "15 minutes ago",
    level: "high",
    thumbnail: "/camera2.jpg",
    duration: "01:23",
  },
  {
    id: 3,
    type: "motion",
    title: "Movement Detected",
    location: "Office Space",
    time: "1 hour ago",
    level: "medium",
    thumbnail: "/camera3.jpg",
    duration: "00:45",
  },
  {
    id: 4,
    type: "system",
    title: "System Armed",
    location: "Home Mode",
    time: "2 hours ago",
    level: "info",
    thumbnail: "/camera1.png",
    duration: "N/A",
  },
  {
    id: 5,
    type: "camera",
    title: "Camera Online",
    location: "All Cameras",
    time: "3 hours ago",
    level: "info",
    thumbnail: "/camera2.jpg",
    duration: "N/A",
  },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "high":
      return "from-red-500 to-pink-500"
    case "medium":
      return "from-yellow-500 to-orange-500"
    case "low":
      return "from-blue-500 to-cyan-500"
    case "info":
      return "from-green-500 to-emerald-500"
    default:
      return "from-gray-500 to-gray-600"
  }
}

const getIcon = (type: string) => {
  switch (type) {
    case "motion":
      return AlertTriangle
    case "camera":
      return Camera
    case "system":
      return Eye
    default:
      return Clock
  }
}

export default function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Status Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-medium">Activity Monitor</span>
          </div>
          <div className="text-sm text-gray-400">{filteredLogs.length} events</div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Header */}
          <div className="px-6 py-6">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">Activity Feed</h1>
              <p className="text-gray-400 text-lg">Recent security events</p>
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex space-x-3 mb-6"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/30 border-gray-700/50 text-white placeholder-gray-400 rounded-2xl h-14 pl-12 text-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <Button
                size="icon"
                className="h-14 w-14 bg-gray-800/30 border border-gray-700/50 hover:bg-gray-700/50 rounded-2xl"
              >
                <Filter className="w-5 h-5 text-gray-400" />
              </Button>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex space-x-2 mb-6 overflow-x-auto"
            >
              {["all", "motion", "camera", "system"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${
                    selectedFilter === filter
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-800/30 text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </motion.div>

            {/* Activity List */}
            <div className="space-y-4">
              {filteredLogs.map((log, index) => {
                const Icon = getIcon(log.type)
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-4 hover:bg-gray-700/30 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Thumbnail */}
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-16 bg-black rounded-2xl overflow-hidden">
                          <img
                            src={log.thumbnail || "/placeholder.svg"}
                            alt="Event thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div
                          className={`absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r ${getLevelColor(log.level)} rounded-full flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        {log.type === "motion" && (
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
                            {log.duration}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors text-lg">
                              {log.title}
                            </h3>
                            <p className="text-gray-400 text-sm">{log.location}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{log.time}</span>
                            <button className="p-1 hover:bg-gray-600/50 rounded-full transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        </div>

                        {/* Alert Level Indicator */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`h-2 w-20 bg-gradient-to-r ${getLevelColor(log.level)} rounded-full`}></div>
                            <span className="text-xs text-gray-500 capitalize font-medium">{log.level} priority</span>
                          </div>
                          {log.type === "motion" && (
                            <button className="flex items-center space-x-1 bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1 rounded-full transition-colors">
                              <Play className="w-3 h-3 text-blue-400" />
                              <span className="text-xs text-blue-400 font-medium">Play</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-2xl px-8 py-3"
              >
                Load More Events
              </Button>
            </motion.div>
          </div>
        </div>

        <BottomNavigation currentPage="logs" />
      </div>
    </div>
  )
}
