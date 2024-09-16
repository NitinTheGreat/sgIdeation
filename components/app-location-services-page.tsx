'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2, MapPin, AlertTriangle } from "lucide-react"

export function Page() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords)
        setLoading(false)
        sendLocationToBackend(position.coords)
      },
      () => {
        setError('Unable to retrieve your location')
        setLoading(false)
      }
    )
  }

  const sendLocationToBackend = async (coords: GeolocationCoordinates) => {
    // Dummy API call
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: coords.latitude, longitude: coords.longitude }),
      })
      if (!response.ok) throw new Error('Failed to send location to server')
      toast({
        title: "Location sent successfully",
        description: "Your current location has been securely transmitted.",
      })
    } catch (error) {
      console.error('Error sending location:', error)
      toast({
        title: "Error",
        description: "Failed to send location to server.",
        variant: "destructive",
      })
    }
  }

  const handleSOS = () => {
    if (location) {
      // In a real application, you would call an API to get the nearest hospital
      // For this example, we'll just open Google Maps with the current location
      window.open(`https://www.google.com/maps/search/hospital/@${location.latitude},${location.longitude},15z`, '_blank')
    } else {
      toast({
        title: "Location Required",
        description: "Please allow location access before using SOS.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Location Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center" role="alert">
              <AlertTriangle className="mr-2" />
              <p>{error}</p>
            </div>
          )}
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          ) : location ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center">
              <MapPin className="mr-2" />
              <p>
                Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
              </p>
            </div>
          ) : null}
          <Button onClick={getLocation} className="w-full bg-indigo-600 hover:bg-indigo-700">
            {loading ? 'Getting Location...' : 'Get My Location'}
          </Button>
          <Button onClick={handleSOS} className="w-full bg-red-600 hover:bg-red-700">
            SOS - Find Nearest Hospital
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}