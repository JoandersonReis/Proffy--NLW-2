import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"

import cameraIcon from "../../assets/images/icons/camera.svg"

import "./styles.css"

interface DropZoneProps {
  onSelectedFile: (file: File) => void,
  onSelectedFileURL: (text: string) => void
}

const DropZone: React.FC<DropZoneProps> = ({ onSelectedFile, onSelectedFileURL }) => {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)

    onSelectedFile(file)
    onSelectedFileURL(fileUrl)
  }, [onSelectedFile])

  const { getRootProps, getInputProps } = useDropzone({onDrop, accept:"image/*"})

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      <img src={cameraIcon} alt="Upload de imagem" />
    </div>
  )
}

export default DropZone
