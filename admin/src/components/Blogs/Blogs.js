import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Blog from './Blog'

import './Blogs.css'

const Blogs = () => {
  const [offset, setOffset] = useState(0)
  const [blogs, setBlogs] = useState([])
  const [perPage, setPerPage] = useState(5)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    const run = async () => {
      const response = await fetch(`http://localhost:5000/api/blog?page=${offset + 1}&limit=${perPage}`)
      const data = await response.json()
      setBlogs(data.results)
      setPageCount(Math.ceil(data.total / perPage))
    }
    run()
  }, [offset])

  const deleteBlogs = id => {
    const newBlogs = blogs.filter(blog => blog.id !== id)
    setBlogs(newBlogs)
  }

  const updateBlogs = id => {
    console.log(id);
  }

  const handlePageClick = (e) => setOffset(e.selected)

  return (
    <div>
      {blogs.map((data, index) => (
        <Blog key={index} data={data} deleteBlogs={deleteBlogs} updateBlogs={updateBlogs} />
      ))}
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
    </div>
  )
}

export default Blogs
