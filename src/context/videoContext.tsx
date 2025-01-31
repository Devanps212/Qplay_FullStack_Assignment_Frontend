import React, { createContext, useCallback, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Video } from "../types/interface";
import { toast } from "react-toastify";
import configData from "../config/configData";

const VideoContext = createContext<{
  videos: Video[];
  fetchVideos: (id?: string) => Promise<void>;
}>({
  videos: [],
  fetchVideos: async () => {},
});

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<Video[]>([])

  const fetchVideos = useCallback(async() => {
    try {
      console.log(configData.getVideos)
      const response: AxiosResponse = await axios.get(configData.getVideos)
      console.log(response.data.video)
      setVideos(response.data.video)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data || "Error fetching video")
        } else {
          toast.error("Network error. Please check your connection.")
        }
      } else {
        toast.error("Unexpected error. Please try again.")
      }
    }
  }, [])

  return (
    <VideoContext.Provider value={{ videos, fetchVideos }}>
      {children}
    </VideoContext.Provider>
  )
}

export default VideoContext
