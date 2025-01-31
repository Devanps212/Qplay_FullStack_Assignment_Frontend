import { FaClock, FaPlayCircle } from "react-icons/fa";
import { Video } from "../types/interface";
import { formatDuration } from "../utils/formatDuration";

const VideoCard = ({ video, onClick }: { video: Video; onClick: () => void }) => {
  return (
    <div
      className="w-full max-w-xs sm:max-w-sm border border-gray-200 m-2 rounded-lg 
      transform transition-all ease hover:shadow-lg hover:scale-102 belanosima">
      <div className="flex flex-col gap-4 p-4">
        <div className="relative">
            <img
                src={video.thumbnail}
                alt="video-image"
                className="w-full h-48 object-cover rounded-md transform transition-all ease hover:scale-105"/>
            <button
                className="absolute inset-0 flex items-center justify-center text-5xl text-white opacity-90 
                transform transition-all duration-300 ease-out hover:text-red-400 hover:opacity-100 hover:scale-110
                active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={onClick}>
                <FaPlayCircle className="animate-pulse" />
            </button>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold truncate">{video.title}</h1>
          <h5 className="text-sm font-normal text-gray-700 flex items-center gap-1">
            <FaClock/>
            {formatDuration(video.segments[0].duration)}
          </h5>
        </div>

        <button
          className="w-full text-center border rounded-xl bg-gray-600 
          transform transition-all ease-in hover:bg-blue-500 hover:scale-101
          hover:shadow-md p-2 flex items-center justify-center gap-2 text-white
          font-bold active:scale-99 active:shadow-none outline-none"
          onClick={onClick}>
          <FaPlayCircle/> Watch Now
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
