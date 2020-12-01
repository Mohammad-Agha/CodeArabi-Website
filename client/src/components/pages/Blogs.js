import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import '../Cards.css';
import CardItem from '../CardItem';

import './Blogs.css'

const Blogs = () => {
  const [offset, setOffset] = useState(0)
  const [blogs, setBlogs] = useState([])
  const [fetchBlogs, setFetchBlogs] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const perPage = 7
      const response = await fetch(`http://localhost:5000/api/blog?page=${offset + 1}&limit=${perPage}`)
      const data = await response.json()
      const response2 = await fetch(`http://localhost:5000/api/blog/featured/count`)
      const data2 = await response2.json()
      if (isMounted) {
        setBlogs(data.results)
        setPageCount(Math.ceil(data.total / perPage))
      }
    }
    run()
    return () => { isMounted = false }
  }, [offset, fetchBlogs])

  
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
     <div className='cards'>
      <h1 className='top'>المدونات</h1>
      <div className="form-group">
        <input className='search-input' type="text" onChange={searchBlog} placeholder="ابحس عن المدونات " />
      </div>
      <div className='cards__container'>
        <ul className='cards__items'>
          {blogs.map((data, key) => <CardItem key={key} data={data} />)}
        </ul>
      </div>
         <div align="center">   
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
      </div>
    </div>
  )
}

export default Blogs
