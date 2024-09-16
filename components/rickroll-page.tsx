'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle } from "lucide-react"

export default function Component() {
  const [progress, setProgress] = useState(0)
  const [showError, setShowError] = useState(false)
  const [showRickroll, setShowRickroll] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          setTimeout(() => setShowError(true), 300) // Show error message sooner
          return 100
        }
        const diff = Math.random() * 20 + 10 // Increase the increment
        return Math.min(oldProgress + diff, 100)
      })
    }, 100) // Reduce interval to 100ms

    // Ensure the timer is cleared after 3 seconds
    const maxTimer = setTimeout(() => {
      clearInterval(timer)
      setProgress(100)
      setTimeout(() => setShowError(true), 300)
    }, 2700) // 2.7 seconds to allow for the error message delay

    return () => {
      clearInterval(timer)
      clearTimeout(maxTimer)
    }
  }, [])

  const handleFix = () => {
    setShowRickroll(true)
  }

  if (showRickroll) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-700" >Loading Website...</h1>
        <Progress value={progress} className="w-full mb-4" />
        {showError && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
            <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
            <span className="sr-only">Error</span>
            <div>
              <span className="font-medium">Loading Error!</span> Unable to access the website due to a client-side issue.
            </div>
          </div>
        )}
        {showError && (
          <Button onClick={handleFix} className="w-full">
            Fix and Continue
          </Button>
        )}
      </div>
    </div>
  )
}