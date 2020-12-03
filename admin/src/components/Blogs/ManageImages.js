import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import ManageImage from './ManageImage'
import './ManageImages.css'


const ManageImages = () => {
  const [offset, setOffset] = useState(0)
  const [images, setImages] = useState([])
  const [perPage, setPerPage] = useState(5)
  const [pageCount, setPageCount] = useState(1)
  const [fetchImages, setFetchImages] = useState(false)

  useEffect(() => {
    const run = async () => {
      const response = await fetch(`http://localhost:5000/api/image?page=${offset + 1}&limit=${perPage}`, {
        headers: {
          'Authentication': localStorage.getItem('token')
        }
      })
      const data = await response.json()
      setImages(data.results)
      setPageCount(Math.ceil(data.total / perPage))
    }
    run()
  }, [offset, fetchImages])

  const handlePageClick = (e) => setOffset(e.selected)

  const deleteImage = async e => {
    const newImages = images.filter(image => image.id !== parseInt(e.target.id))
    try {
      const response = await fetch(`http://localhost:5000/api/image/${e.target.id}`, {
        method: 'DELETE',
        headers: {
          'Authentication': localStorage.getItem('token')
        }
      })
      const data = await response.json()
      if (!data.success) {
        return
      }
      setFetchImages(!fetchImages)
      setImages(newImages)

    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="gallery-container">
        {images.map((image, index) => <ManageImage deleteImage={deleteImage} key={index} data={image} />)}
      </div>
      {images.length > 0 ? <div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div> : ''}

    </>
  )
}

export default ManageImages
