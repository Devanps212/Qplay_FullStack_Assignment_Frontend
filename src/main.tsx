import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { VideoProvider } from './context/videoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <VideoProvider>
      <App />
    </VideoProvider>
  </StrictMode>,
)
