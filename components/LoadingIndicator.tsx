"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    handleStop() // In case the route has already loaded

    window.addEventListener("routeChangeStart", handleStart)
    window.addEventListener("routeChangeComplete", handleStop)
    window.addEventListener("routeChangeError", handleStop)

    return () => {
      window.removeEventListener("routeChangeStart", handleStart)
      window.removeEventListener("routeChangeComplete", handleStop)
      window.removeEventListener("routeChangeError", handleStop)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isLoading ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
  )
}

