const Sidebar = ({ openModal }: { openModal: () => void }) => {
    return (
      <aside className="w-1/2 h-screen p-4 flex items-center bg-gray-800">
        <ul className="flex flex-col justify-center items-center w-full">
          <li className="mb-8">
            <div className="text-center">
              <h1 className="text-white text-3xl font-extrabold tracking-wide">
                Welcome to <span className="text-yellow-300">QPlay</span>
              </h1>
              <p className="text-white mt-2 text-lg">
                Enjoy a seamless media experience
              </p>
            </div>
          </li>
          <li>
            <button
              onClick={openModal}
              aria-label="Upload Video"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 
                hover:bg-gradient-to-br focus:outline-none font-medium border-b-4 border-gray-700
                rounded-lg text-sm px-5 py-2.5 transform transition-all duration-300 ease-in-out 
                active:scale-95 active:border-b-0">
              Upload Video
            </button>
          </li>
        </ul>
      </aside>
    )
}
  
export default Sidebar;
  