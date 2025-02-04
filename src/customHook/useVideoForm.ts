import * as Yup from 'yup'
import { useFormik } from 'formik'
import { VideoForm } from '../types/videoForm'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'

const initialValues : VideoForm = {
    title: "",
    video: null
}

const validationSchema = Yup.object({
    title: Yup.string().required("Video title is required"),
    video: Yup.mixed()
    .required("Video file is required")
    .test("fileType", "Only mp4, avi, and mkv files are allowed", (value) => {
      const file = value as File | null
      return file ? ["video/mp4", "video/avi", "video/mkv"].includes(file.type) : true
    })
})

export const useVideoForm = (onClose: () => void) => {

  const [waitMessage, setWaitMessage] = useState("")

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("file", values.video as File)

      try {
        setWaitMessage("Please wait, it will take a few minutes...")

        const response: AxiosResponse = await axios("https://romantic-heart-production.up.railway.app/upload" , {
          method: "POST",
          data: formData
        })

        toast.success(response.data.message)
        formik.resetForm()
        onClose()
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error.message)
          if (error.response) {
            toast.error(error.response.data || "Error uploading video. Please try again.")
          } else {
            toast.error("Network error. Please check your connection.")
          }
        } else {
          toast.error("Unexpected error. Please try again.")
        }
        console.log(error)
      }
    }
  })

  return { formik, waitMessage }
}
