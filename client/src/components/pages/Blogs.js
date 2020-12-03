import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import CardItem from '../CardItem'
import './Blogs.css'

function Blogs() {

    const [offset, setOffset] = useState(0)
    const [blogs, setBlogs] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [search, setSearch] = useState('')
    const [fetchBlogs, setFetchBlogs] = useState(false)
    const [initialPage, setInitialPage] = useState(0)

    useEffect(() => {
        const run = async () => {
            const perPage = 6
            const response = await fetch(`http://localhost:5000/api/blog?page=${offset + 1}&limit=${perPage}`)
            const data = await response.json()
            setBlogs(data.results)
            setPageCount(Math.ceil(data.total / perPage))
        }
        run()
    }, [offset, fetchBlogs])

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
        setInitialPage(offset)
    }

    const handlePageClick = (e) => setOffset(e.selected)

    return (
        <div className='cards cards-blogs'>
            <h1>المدونات</h1>
            <div className="search-div">
                <label className="search-label">
                    <i className="fa fa-search search-icon icon-search" />
                    <input type="text" onChange={searchBlog} placeholder="إبحث عن مدونة" />
                </label>
            </div>
            <div className='cards__container'>
                <ul className='cards__items'>
                    {blogs.length === 0 && <h1>لم يتم العثور على مدونات</h1>}
                    {blogs.map((data, key) => <CardItem key={key} data={data} />)}
                </ul>
            </div>
            {search === '' ? <ReactPaginate
                previousLabel={"prev"}
                initialPage={initialPage}
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
