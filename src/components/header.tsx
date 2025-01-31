import { useEffect, useState } from "react";
import { FaViadeo } from "react-icons/fa6";
import Modal from "./modal";
import Sidebar from "./sidebar";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sidebar, setSidebar] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if(sidebar){
      document.body.style.overflow = "hidden"
    }else{
      document.body.style.overflow = "auto"
    }

    return()=>{
      document.body.style.overflow = "auto"
    }
  },[sidebar])

  return (
    <>
      <header className="w-full h-25 bg-gradient-to-r from-blue-500 to-purple-600 
        flex justify-between items-center shadow-lg px-10 relative z-44">
        <div className="text-center hidden md:block">
          <h1 className="text-white text-3xl font-extrabold tracking-wide">
            Welcome to <span className="text-yellow-300">QPlay</span>
          </h1>
          <p className="text-white mt-2 text-lg">
            Enjoy a seamless media experience
          </p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 
            rounded-full shadow-lg">
            <FaViadeo className="text-white text-3xl" />
        </div>
        <button
          onClick={handleModalOpen}
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 
            hover:bg-gradient-to-br focus:outline-none font-medium border border-gray-700 border-b-5
            rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transform transition-all duration-300 ease 
            active:scale-97 active:border-b-0 hidden md:block">
          Upload Video
        </button>
        <button 
        className="border-b-4 border-gray-700 md:hidden block bg-white p-3
        transform transition ease active:border-b-0 rounded-lg"
        onClick={()=>setSidebar(prev=>!prev)}>
          <FaBars/>
        </button>
      </header>

      {sidebar && (
          <div className="fixed inset-0 z-40 flex">
          <Sidebar openModal={handleModalOpen} />
          <div
            className="w-full h-full bg-transparent z-40 cursor-pointer"
            onClick={() => setSidebar(false)}></div>
        </div>
      )}
  
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  )
}

export default Header;
