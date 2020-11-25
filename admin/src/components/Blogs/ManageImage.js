import React, { useState } from 'react'
import './ManageImage.css'

const ManageImage = ({ data, deleteImage }) => {
  const value = useState(data.path)[0]
  const copyPath = () => {
    navigator.clipboard.writeText(`http://localhost:5000/${value}`)
  }

  return (
    <div className="image-gallery">
      <img src={`http://localhost:5000/${data.path}`} alt="imageFromGallery" />
      <button id={data.path} className="input-upload" onClick={deleteImage}>Delete image</button>
      <button className="input-upload" onClick={copyPath}>Copy path</button>
    </div>
  )
}

export default ManageImage
