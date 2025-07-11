"use client"

import { useEffect, useState } from 'react'
import { Shield, Wifi, WifiOff, Download, CheckCircle } from 'lucide-react'

export default function PWAStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)
  const [swStatus, setSwStatus] = useState<'active' | 'installing' | 'error' | 'none'>('none')

  useEffect(() => {
    // Check if app is installed
    const checkInstallation = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      setIsInstalled(isStandalone)
    }

    // Check online status
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    // Check service worker status
    const checkServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.getRegistration()
          if (registration) {
            setSwStatus(registration.active ? 'active' : 'installing')
          } else {
            setSwStatus('none')
          }
        } catch (error) {
          setSwStatus('error')
        }
      }
    }

    // Initial checks
    checkInstallation()
    checkOnlineStatus()
    checkServiceWorker()

    // Event listeners
    window.addEventListener('online', checkOnlineStatus)
    window.addEventListener('offline', checkOnlineStatus)
    window.addEventListener('appinstalled', checkInstallation)

    // Service worker events
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', checkServiceWorker)
    }

    return () => {
      window.removeEventListener('online', checkOnlineStatus)
      window.removeEventListener('offline', checkOnlineStatus)
      window.removeEventListener('appinstalled', checkInstallation)
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', checkServiceWorker)
      }
    }
  }, [])

  if (!isInstalled) {
    return null // Don't show status if not installed
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
        <div className="flex items-center space-x-3">
          {/* Online Status */}
          <div className="flex items-center space-x-1">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-400" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-400" />
            )}
            <span className="text-xs text-gray-300">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Service Worker Status */}
          <div className="flex items-center space-x-1">
            {swStatus === 'active' && (
              <>
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-300">PWA Active</span>
              </>
            )}
            {swStatus === 'installing' && (
              <>
                <Download className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-xs text-gray-300">Installing...</span>
              </>
            )}
            {swStatus === 'error' && (
              <>
                <Shield className="w-4 h-4 text-red-400" />
                <span className="text-xs text-gray-300">PWA Error</span>
              </>
            )}
          </div>

          {/* Installation Status */}
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs text-gray-300">Installed</span>
          </div>
        </div>
      </div>
    </div>
  )
} 