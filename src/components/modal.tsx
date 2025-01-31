import React from "react";
import { useVideoForm } from "../customHook/useVideoForm";
import { ModalProps } from "../types/videoForm";
import { Hourglass } from "react-loader-spinner";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  
  const { formik, waitMessage } = useVideoForm(onClose)
  if (!isOpen) return null

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 relative transition-all transform hover:scale-105">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Upload Your Video</h2>
        
        {formik.isSubmitting && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-40 rounded-xl">
            <div className="flex flex-col justify-center items-center">
              <Hourglass
                height="80"
                width="80"
                colors={['#306cce', '#72a1ed']}
                ariaLabel="hourglass-loading"
                visible={true}/>
              <p className="mt-4 text-center text-gray-600">{waitMessage || "Uploading your video, please wait..."}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="text-lg font-medium text-gray-700">Video Title</label>
            <input
              type="text"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="title"
              className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              placeholder="Enter video title"/>
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.title}</div>
            )}
          </div>

          <div>
            <label htmlFor="video" className="text-lg font-medium text-gray-700">Upload Video</label>
            <input
              type="file"
              id="video"
              className="border-2 border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              name="video"
              accept="video/mp4, video/avi, video/mkv"
              onChange={(e) => formik.setFieldValue("video", e.target.files?.[0])}
              onBlur={formik.handleBlur}/>
            {formik.touched.video && formik.errors.video && (
              <div className="text-red-500 text-sm mt-2">{formik.errors.video}</div>
            )}
          </div>

          {!formik.isSubmitting && (
            <div className="flex justify-between mt-6">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`${
                  formik.isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                } text-white px-6 py-3 rounded-lg font-semibold transition duration-300`}>
                {formik.isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300">
                Close
              </button>
            </div>
          )}
        </form>

        {formik.values.video && (
          <div className="p-3 mt-6 flex justify-center items-center border border-gray-300 rounded-lg">
            <video
              src={URL.createObjectURL(formik.values.video)}
              width={200}
              height={200}
              className="object-cover rounded-lg shadow-lg"
              controls/>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
