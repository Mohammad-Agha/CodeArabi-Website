import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import BlogRow from './BlogRow'
import { Link } from 'react-router-dom'

import './Blogs.css'

const Blogs = () => {
  const [offset, setOffset] = useState(0)
  const [blogs, setBlogs] = useState([])
  const [fetchBlogs, setFetchBlogs] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [alert, setAlert] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const perPage = 7
      const response = await fetch(`http://localhost:5000/api/blog?page=${offset + 1}&limit=${perPage}`)
      const data = await response.json()
      if (isMounted) {
        setBlogs(data.results)
        setPageCount(Math.ceil(data.total / perPage))
      }
    }
    run()
    return () => { isMounted = false }
  }, [offset, fetchBlogs])

  const deleteBlogs = async id => {
    const newBlogs = blogs.filter(blog => blog.id !== id)
    const response = await fetch(`http://localhost:5000/api/blog/${id}`,
      {
        method: "DELETE",
        headers: {
          'Authentication': localStorage.getItem('token')
        }
      })
    const data = await response.json()
    console.log(data);
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 2000)
    setFetchBlogs(!fetchBlogs)
    setBlogs(newBlogs)
  }

  const handlePageClick = (e) => setOffset(e.selected)

  const searchBlog = async e => {
    let search = e.target.value.trim()
    setSearch(search)
    if (search !== '') {
      const response = await fetch(`http://localhost:5000/api/blog/search/${search}`)
      const data = await response.json()
      if (data.length === 0) {
        setBlogs([])
        return
      }
      setBlogs(data)
    }
    else {
      setFetchBlogs(!fetchBlogs)
    }
  }

  return (
    <div className="div-wrapper">
      <div className="component-div">
        <span className="component-name">Blogs</span>
      </div>
      <Link className="link-btn" to='/admin/blogs/add'>Add blog</Link>
      <div className="form-group">
        <input type="text" onChange={searchBlog} placeholder="Search for a blog by tag" />
      </div>
      {alert && <div className="show-alert">Blog Deleted</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tag</th>
            <th>Title</th>
            <th>Description</th>
            <th>Featured</th>
            <th>Created</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((data, index) => (
            <BlogRow key={index} data={data} deleteBlogs={deleteBlogs} />
          ))}
        </tbody>
      </table>
      {search === '' ? <ReactPaginate
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
      /> : ''}

    </div>
  )
}

export default Blogs
