
// import { LandingPageComponent } from "@/components/landing-page";

// export default function Home() {
//   return (
//     <>
//       {/* <LandingPageComponent /> */}
//       </>
    
//   );
// }
'use client'

import { useEffect, useRef } from 'react'

export default function AutoRickroll() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Autoplay was prevented:", error)
      })
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <video 
        ref={videoRef}
        className="w-full max-w-3xl aspect-video"
        autoPlay 
        muted 
        loop 
        playsInline
      >
        <source src="https://ia800605.us.archive.org/7/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}