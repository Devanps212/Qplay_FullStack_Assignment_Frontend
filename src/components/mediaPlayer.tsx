import Hls from "hls.js"
import { useEffect, useRef, useState } from "react"
import { Formats, Video } from "../types/interface"

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }

  interface NetworkInformation {
    effectiveType: string;
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
  }
}

const MediaPlayer = ({ videoData, isFirstVideo }: { videoData: Video; isFirstVideo: boolean }) => {
  
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [networkSpeed, setNetworkSpeed] = useState<string>('unknown')
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (navigator.connection) {
      const connection = navigator.connection
      setNetworkSpeed(connection.effectiveType)

      const handleConnectionChange = () => {
        setNetworkSpeed(connection.effectiveType)
      }

      connection.addEventListener('change', handleConnectionChange)

      return () => {
        connection.removeEventListener('change', handleConnectionChange)
      }
    }
  }, [])

  useEffect(() => {
    if (videoData?.formats?.length) {
      const selectedUrl = getVideoUrlBasedOnNetwork(videoData.formats, networkSpeed)
      setVideoUrl(selectedUrl)
    }
  }, [videoData, networkSpeed])

  const getVideoUrlBasedOnNetwork = (formats: Formats[], networkSpeed: string) => {
    switch (networkSpeed) {
      case '4g':
      case 'wifi':
        return formats[3]?.fileUrl
      case '3g':
        return formats[1]?.fileUrl || formats[2]?.fileUrl
      case '2g':
      case 'slow-2g':
        return formats[0]?.fileUrl
      default:
        return formats[0]?.fileUrl
    }
  }

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      const hls = new Hls()

      hls.loadSource(videoUrl)
      hls.attachMedia(videoRef.current)

      hls.on(Hls.Events.FRAG_LOADED, () => {
        if (navigator.connection) {
          const connection = navigator.connection

          if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
            hls.startLevel = hls.levels.length - 1
          } else {
            hls.startLevel = 0
          }
        }
      })

      return () => {
        hls.destroy()
      }
    }
  }, [videoUrl, networkSpeed])

  return (
    <div className="w-full h-screen bg-black relative">
  <div className="w-full h-full flex justify-center items-center">
    {videoUrl ? (
      <>
        <video
          ref={videoRef}
          className="w-full h-full object-cover relative"
          controls={!isFirstVideo}
          autoPlay
          muted={isFirstVideo}
          loop
        />
        {isFirstVideo && <div className="absolute inset-0 bg-gray-900 w-full h-full opacity-50"></div>}
      </>
    ) : (
      <p className="text-white text-center">Loading video...</p>
    )}
  </div>

  {isFirstVideo && (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none">
      <h1 className="text-5xl text-white text-center font-extrabold mb-4 drop-shadow-lg">
        Welcome to
        <span className="block text-7xl text-yellow-400 tracking-wide mt-2 drop-shadow-lg">Q Play</span>
      </h1>
      <p className="text-xl text-gray-300 text-center font-medium drop-shadow-md">
        Your ultimate destination for seamless video playback.
      </p>
    </div>
  )}
   {
     isFirstVideo && <div className="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-white to-transparent opacity-150"></div>
   }
</div>

  )
}

export default MediaPlayer
