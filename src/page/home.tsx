import VideoCard from '../components/videoCard'
import Header from '../components/header'
import MediaPlayer from '../components/mediaPlayer'
import { useContext, useEffect, useState } from 'react'
import VideoContext from '../context/videoContext'
import { Video } from '../types/interface'

const Home = () => {
  const { videos, fetchVideos } = useContext(VideoContext)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [firstVideo, setFirstVideo] = useState(true)

  useEffect(() => {
    fetchVideos()
  }, [])

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
      <div className='flex flex-col justify-center items-center'>
        {selectedVideo ? (
          <MediaPlayer videoData={selectedVideo} isFirstVideo={firstVideo} />
        ) : (
          <p className="text-xl text-center text-gray-500">Loading video...</p>
        )}
        <div className='mt-20'>
          <h1 className='text-6xl mb-9 belanosima text-center'>Uploaded Videos</h1>
          <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center items-center'>
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                >
                  <VideoCard video={video} onClick={() => handleVideoClick(video)}/>
                </div>
              ))
            ) : (
              <p className="text-xl text-center text-gray-500">No videos found</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
