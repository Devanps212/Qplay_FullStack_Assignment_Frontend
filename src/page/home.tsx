import { useState, useEffect, useCallback, useContext } from 'react'
import VideoCard from '../components/videoCard'
import Header from '../components/header'
import MediaPlayer from '../components/mediaPlayer'
import { TailSpin } from 'react-loader-spinner'
import VideoContext from '../context/videoContext'
import { Video } from '../types/interface'

const Home = () => {
  const { videos, fetchVideos } = useContext(VideoContext)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [firstVideo, setFirstVideo] = useState(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetched, setFetched] = useState(false)

  const fetchData = useCallback(async () => {
    if (fetched) return
    setLoading(true)
    await fetchVideos()
    setLoading(false)
    setFetched(true)
  }, [fetchVideos, fetched])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (videos.length > 0) {
      setSelectedVideo(videos[0])
    }
  }, [videos])

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setFirstVideo(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <div className='flex flex-col justify-center items-center relative'>
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50 h-screen">
            <TailSpin
              height="80"
              width="80"
              color="white"
              ariaLabel="loading"/>
          </div>
        )}

        {selectedVideo ? (
          <MediaPlayer videoData={selectedVideo} isFirstVideo={firstVideo} />
        ) : videos.length === 0 ? (
          <p className="text-5xl mt-10 text-center text-gray-500">No videos found</p>
        ) : (
          <p className="text-xl text-center text-gray-500">Loading video...</p>
        )}
        
        {videos.length > 0 && (
          <div className='mt-20'>
            <h1 className='text-6xl mb-9 belanosima text-center'>Uploaded Videos</h1>
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center'>
              {videos.map((video, index) => (
                <div key={index} className="cursor-pointer">
                  <VideoCard video={video} onClick={() => handleVideoClick(video)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
