import Hls from "hls.js"
import { useEffect, useRef, useState } from "react"
import { Video } from "../types/interface"

declare global {
  interface Navigator {
    connection?: NetworkInformation
  }

  interface NetworkInformation {
    effectiveType: string
    addEventListener(type: string, listener: EventListener): void
    removeEventListener(type: string, listener: EventListener): void
  }
}

const MediaPlayer = ({ videoData, isFirstVideo }: { videoData: Video; isFirstVideo: boolean }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [networkSpeed, setNetworkSpeed] = useState<string>("unknown")
  const [currentQuality, setCurrentQuality] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const hls = useRef<Hls | null>(null)

  useEffect(() => {
    if (navigator.connection) {
      const connection = navigator.connection
      setNetworkSpeed(connection.effectiveType)

      const handleConnectionChange = () => {
        setNetworkSpeed(connection.effectiveType)
      }

      connection.addEventListener("change", handleConnectionChange)

      return () => {
        connection.removeEventListener("change", handleConnectionChange)
      }
    }
  }, [])

  useEffect(() => {
    if (videoData?.formats?.length) {
      const selectedUrl = videoData.segments[0].segmentUrl
      setVideoUrl(selectedUrl)
    }
  }, [videoData, networkSpeed])

  const getQualityForNetworkSpeed = (networkSpeed: string) => {
    switch (networkSpeed) {
      case "4g":
      case "5g":
        return "1080p"
      case "3g":
        return "720p"
      case "2g":
      case "slow-2g":
        return "480p"
      default:
        return "480p"
    }
  }

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      hls.current = new Hls()

      hls.current.loadSource(videoUrl)
      hls.current.attachMedia(videoRef.current)

      const quality = getQualityForNetworkSpeed(networkSpeed)
      setCurrentQuality(quality)
      hls.current.startLevel = qualityLevels.indexOf(quality)

      hls.current.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        const quality = qualityLevels[data.level] || "Unknown"
        setCurrentQuality(quality)

        if (videoRef.current) {
          setCurrentTime(videoRef.current.currentTime)
        }
      })

      hls.current.on(Hls.Events.MANIFEST_LOADED, () => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime
        }
      })

      return () => {
        hls.current?.destroy()
      }
    }
  }, [videoUrl, networkSpeed, currentTime])

  const qualityLevels = ["240p", "480p", "720p", "1080p"]

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
              loop/>
            {isFirstVideo && <div className="absolute inset-0 bg-gray-900 w-full h-full opacity-50"></div>}
          </>
        ) : (
          <p className="text-white text-5xl m-10 text-center">No videos Found</p>
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
      {isFirstVideo && <div className="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-white to-transparent opacity-150"></div>}

      {!isFirstVideo &&  currentQuality && (
        <div className="absolute top-5 right-5 text-white font-bold text-lg bg-gray-600 bg-opacity-0 px-4 py-2 rounded-md">
          Current Quality: {currentQuality}
        </div>
      )}
    </div>
  )
}

export default MediaPlayer
