import React, { useState } from 'react'
// using axios here
import axios from "axios"
import { useRouter } from 'next/navigation'

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const router = useRouter()
  // max file size of 70mb

  const MAX_FILE_SIZE = 70 * 1024 * 1024

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the maximum limit of 70MB.")
      return;
    }

    setIsUploading(true)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    formData.append("description", description)
    formData.append("originalSize", file.size.toString())

    try {
      const response = await axios.post("api/video-upload", formData)
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <div>VideoUpload</div>
  )
}

export default VideoUpload